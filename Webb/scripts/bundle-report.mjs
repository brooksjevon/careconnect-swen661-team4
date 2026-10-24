#!/usr/bin/env node
/**
 * Bundle size report for the production build (zero dependencies).
 *
 *   npm run analyze            → vite build + this report
 *   node scripts/bundle-report.mjs [distDir]
 *
 * - Sizes every JS/CSS/image file: raw, gzip and brotli (what browsers download).
 * - Splits the first page load (files referenced by dist/index.html) from code that
 *   loads later (route pages and lazy components).
 * - Checks size budgets and exits with code 1 if any is exceeded.
 * - Writes dist/bundle-report.json for tracking sizes over time.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { extname, join, relative } from "node:path"
import { brotliCompressSync, constants, gzipSync } from "node:zlib"

/** Budgets in bytes, measured gzipped (images: raw, they are already compressed). */
const BUDGETS = {
  initialJs: 150 * 1024, // all JS needed to render the first page
  initialCss: 15 * 1024,
  lazyChunk: 15 * 1024, // any single route / lazy component chunk
  images: 60 * 1024, // all images in the build
}

const dist = process.argv[2] ?? "dist"
if (!existsSync(join(dist, "index.html"))) {
  console.error(`No ${dist}/index.html found. Run "npm run build" first (or "npm run analyze").`)
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const sizeOf = (path) => {
  const buf = readFileSync(path)
  return {
    raw: buf.length,
    gzip: gzipSync(buf, { level: 9 }).length,
    brotli: brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
  }
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`
const pad = (s, n) => String(s).padEnd(n)
const padL = (s, n) => String(s).padStart(n)

// Files the browser requests for the first page: script, modulepreload and stylesheet tags.
const html = readFileSync(join(dist, "index.html"), "utf8")
const initial = new Set(
  [...html.matchAll(/(?:src|href)="\/?([^"]+\.(?:js|css))"/g)].map((m) => join(dist, m[1])),
)

const files = walk(dist)
const code = files.filter((f) => [".js", ".css"].includes(extname(f))).map((f) => ({ file: f, ...sizeOf(f) }))
const images = files.filter((f) => /\.(svg|png|webp|jpe?g|avif|gif)$/i.test(f)).map((f) => ({ file: f, raw: statSync(f).size }))

const label = (f) => relative(dist, f).replace(/\\/g, "/")
const kind = (f) => {
  const name = label(f).split("/").pop()
  if (name === "service-worker.js") return "service worker"
  if (name.startsWith("vendor-")) return "library"
  if (initial.has(f)) return "app (initial)"
  if (/Page-/.test(name)) return "route page"
  return "shared / lazy"
}

const rows = code.sort((a, b) => b.gzip - a.gzip)
const sum = (list, key) => list.reduce((total, row) => total + row[key], 0)

console.log("\nCareConnect bundle report\n")
console.log(`${pad("File", 44)}${pad("Type", 16)}${padL("Raw", 10)}${padL("Gzip", 10)}${padL("Brotli", 10)}  Loaded`)
console.log("-".repeat(98))
for (const row of rows) {
  console.log(
    `${pad(label(row.file), 44)}${pad(kind(row.file), 16)}${padL(kb(row.raw), 10)}${padL(kb(row.gzip), 10)}${padL(kb(row.brotli), 10)}  ${initial.has(row.file) ? "first load" : kind(row.file) === "service worker" ? "background" : "on demand"}`,
  )
}

const initialJs = rows.filter((r) => initial.has(r.file) && r.file.endsWith(".js"))
const initialCss = rows.filter((r) => initial.has(r.file) && r.file.endsWith(".css"))
const lazy = rows.filter((r) => !initial.has(r.file) && r.file.endsWith(".js") && kind(r.file) !== "service worker")
const largestLazy = lazy[0]
const imageTotal = sum(images, "raw")

console.log("\nSummary (gzip)")
console.log(`  First load JS   ${kb(sum(initialJs, "gzip"))}  (${initialJs.length} files)`)
console.log(`  First load CSS  ${kb(sum(initialCss, "gzip"))}`)
console.log(`  On-demand JS    ${kb(sum(lazy, "gzip"))}  (${lazy.length} chunks, largest ${largestLazy ? `${label(largestLazy.file)} ${kb(largestLazy.gzip)}` : "–"})`)
console.log(`  Images          ${kb(imageTotal)}  (${images.length} files: ${[...new Set(images.map((i) => extname(i.file).slice(1)))].join(", ")})`)

const checks = [
  ["First load JS", sum(initialJs, "gzip"), BUDGETS.initialJs],
  ["First load CSS", sum(initialCss, "gzip"), BUDGETS.initialCss],
  ["Largest on-demand chunk", largestLazy?.gzip ?? 0, BUDGETS.lazyChunk],
  ["All images", imageTotal, BUDGETS.images],
]
const empty = rows.filter((r) => r.raw < 50 && r.file.endsWith(".js"))

console.log("\nBudgets")
let failed = false
for (const [name, actual, budget] of checks) {
  const ok = actual <= budget
  failed ||= !ok
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${pad(name, 26)}${padL(kb(actual), 10)} / ${kb(budget)}`)
}
if (empty.length) {
  failed = true
  console.log(`  FAIL  Empty chunks: ${empty.map((r) => label(r.file)).join(", ")}`)
}

writeFileSync(
  join(dist, "bundle-report.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      budgets: BUDGETS,
      firstLoad: { jsGzip: sum(initialJs, "gzip"), cssGzip: sum(initialCss, "gzip") },
      files: rows.map((r) => ({ file: label(r.file), type: kind(r.file), firstLoad: initial.has(r.file), raw: r.raw, gzip: r.gzip, brotli: r.brotli })),
      images: images.map((i) => ({ file: label(i.file), raw: i.raw })),
    },
    null,
    2,
  ),
)
console.log(`\nWrote ${dist}/bundle-report.json${failed ? "\n\nOne or more budgets failed." : ""}\n`)
process.exit(failed ? 1 : 0)
