import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import { Button } from '../../components/UI'
export default function SignIn(){const nav=useNavigate();return <AuthLayout><div className="auth-form"><h1>Welcome back</h1><p>Sign in to your CareConnect account.</p><label htmlFor="signin-email">Email address *</label><input id="signin-email" placeholder="you@example.com"/><label htmlFor="signin-password">Password *</label><input id="signin-password" type="password" defaultValue="password"/><small>Any password works — this is a demonstration app.</small><Button tone="primary" onClick={()=>nav('/choose-role')}>Sign in</Button><hr/><p className="center">Don't have an account? <Link to="/signup">Sign up for free</Link></p></div></AuthLayout>}
