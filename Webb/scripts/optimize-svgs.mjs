#!/usr/bin/env node
/**
 * Minifies the SVG icons in public/ in place (zero dependencies).
 * - rounds path/coordinate numbers to 3 decimals (keeps tiny "dot" segments such as the calendar day markers)
 * - removes comments, editor metadata and redundant attributes
 * - collapses whitespace
 * Usage: node scripts/optimize-svgs.mjs [--check]   (--check = report only, write nothing)
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { gzipSync } from "node:zlib"

const DIRS = ["public", "public/assets"]
const check = process.argv.includes("--check")

const roundNumbers = (value) =>
  value.replace(/-?\d*\.\d+(?:e-?\d+)?/gi, (n) => {
    const r = Number(Number(n).toFixed(3))
    return (Object.is(r, -0) ? 0 : r).toString().replace(/^(-?)0\./, "$1.")
  })

function minify(svg) {
  return svg
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s(style="display: block;")/g, "")
    .replace(/\s(d|points|viewBox|transform|x|y|x1|y1|x2|y2|cx|cy|r|rx|ry|width|height|stroke-width)="([^"]*)"/g, (_, attr, v) => ` ${attr}="${roundNumbers(v)}"`)
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim()
}

let before = 0, after = 0, gzBefore = 0, gzAfter = 0
for (const dir of DIRS) {
  for (const name of readdirSync(dir).filter((f) => f.endsWith(".svg"))) {
    const file = join(dir, name)
    if (!statSync(file).isFile()) continue
    const original = readFileSync(file, "utf8")
    const optimized = minify(original) + "\n"
    before += original.length; after += optimized.length
    gzBefore += gzipSync(original).length; gzAfter += gzipSync(optimized).length
    if (!check && optimized !== original) writeFileSync(file, optimized)
  }
}
const pct = (a, b) => `${Math.round((1 - b / a) * 100)}%`
console.log(`SVG icons: ${before} → ${after} bytes (-${pct(before, after)}), gzipped ${gzBefore} → ${gzAfter} (-${pct(gzBefore, gzAfter)})${check ? " [check only]" : ""}`)
