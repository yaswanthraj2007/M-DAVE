import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Lock, Fingerprint, FileCheck2 } from 'lucide-react'
import GoogleIcon from '../components/GoogleIcon'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: axios.post('/api/auth/login', { email, password })
    console.log('login', { email })
  }

  return (
    <div className="auth">
      {/* Left: brand panel */}
      <aside className="auth__brand">
        <div className="auth__brand-content">
          <Link to="/" className="auth__logo">
            <ShieldCheck /> M-DAVE
          </Link>
          <p className="auth__tagline">
            Generate Responsibly.<br />
            <span>Detect with Confidence.</span>
          </p>
          <ul className="auth__points">
            <li><FileCheck2 /> Watermarked, C2PA-signed output</li>
            <li><Lock /> In-memory processing, purged after inference</li>
            <li><Fingerprint /> Hash-only, auditable verification logs</li>
          </ul>
        </div>
      </aside>

      {/* Right: form */}
      <main className="auth__panel">
        <div className="auth__card">
          <Link to="/" className="auth__logo auth__logo--mobile">
            <ShieldCheck /> M-DAVE
          </Link>

          <h1 className="auth__title">Sign in</h1>
          <p className="auth__subtitle">Welcome back! Please sign in to continue.</p>

          <button type="button" className="auth__google">
            <GoogleIcon /> Continue with Google
          </button>

          <div className="auth__divider"><span>or</span></div>

          <form onSubmit={handleSubmit}>
            <label className="auth__label" htmlFor="email">Email address</label>
            <input
              id="email" type="email" className="auth__input"
              placeholder="hello@app.com" required
              value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <label className="auth__label" htmlFor="password">Password</label>
            <input
              id="password" type="password" className="auth__input"
              placeholder="Enter your password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn--primary auth__submit">Continue</button>
          </form>

          <p className="auth__switch">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p className="auth__footer">© M-DAVE · Privacy · Terms</p>
        </div>
      </main>
    </div>
  )
}