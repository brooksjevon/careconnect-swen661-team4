export const PageTitle=({title,subtitle,action})=><div className="page-heading"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>
export const Card=({children,className=''})=><div className={`card ${className}`}>{children}</div>
export const Badge=({children,tone='blue'})=><span className={`badge ${tone}`}>{children}</span>
export const Button=({children,tone='outline',...props})=><button className={`button ${tone}`} {...props}>{children}</button>
export const SectionLabel=({children})=><div className="section-label">{children}</div>
