import Brand from '../components/Brand'
export default function AuthLayout({children}) {
 return <div className="auth-layout"><section className="auth-art"><Brand light/><div><h1>Your daily companion<br/>for calm, confident care.</h1><p>For people who need a little help remembering, and the people who care for them.</p></div><div className="trust">✓ Your information is private<br/>✓ Never gives medical advice<br/>✓ Free to use</div></section><section className="auth-content" role="main">{children}</section></div>
}
