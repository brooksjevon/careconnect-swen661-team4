type PageHeadingProps = {
  title: string
  subtitle: string
}

export function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <div className="page-heading">
      <p className="eyebrow">Tuesday, 24 September · 10:32 am</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
