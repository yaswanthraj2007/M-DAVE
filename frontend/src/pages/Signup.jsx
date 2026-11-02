import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Lock, Fingerprint, FileCheck2 } from 'lucide-react'
import GoogleIcon from '../components/GoogleIcon'
import './Login.css'
import './Signup.css'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: false })

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: axios.post('/api/auth/signup', form)
    console.log('signup', { name: form.name, email: form.email })
  }

  return (
    <div className="auth">
      <aside className="auth__brand">
        <div className="auth__brand-content">
          <Link to="/" className="auth__logo">
            <ShieldCheck /> M-DAVE
          </Link>
          <p className="auth__tagline">
            Create your account.<br />
            <span>Verify what&apos;s real.</span>
          </p>
          <ul className="auth__points">
            <li><FileCheck2 /> Watermarked, C2PA-signed output</li>
            <li><Lock /> In-memory processing, purged after inference</li>
            <li><Fingerprint /> Hash-only, auditable verification logs</li>
          </ul>
        </div>
      </aside>

      <main className="auth__panel">
        <div className="auth__card">
          <Link to="/" className="auth__logo auth__logo--mobile">
            <ShieldCheck /> M-DAVE
          </Link>

          <h1 className="auth__title">Create account</h1>
          <p className="auth__subtitle">Sign up to start generating and detecting.</p>

          <button type="button" className="auth__google">
            <GoogleIcon /> Continue with Google
          </button>

          <div className="auth__divider"><span>or</span></div>

          <form onSubmit={handleSubmit}>
            <label className="auth__label" htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" className="auth__input"
              placeholder="Your name" required value={form.name} onChange={update} />

            <label className="auth__label" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" className="auth__input"
              placeholder="hello@app.com" required value={form.email} onChange={update} />

            <label className="auth__label" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="auth__input"
              placeholder="At least 8 characters" minLength={8} required
              value={form.password} onChange={update} />

            <label className="signup__consent">
              <input type="checkbox" name="agree" required checked={form.agree} onChange={update} />
              <span>
                I agree to the Terms and confirm I will only upload faces
                I have permission to use.
              </span>
            </label>

            <button type="submit" className="btn btn--primary auth__submit">Create account</button>
          </form>

          <p className="auth__switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <p className="auth__footer">© M-DAVE · Privacy · Terms</p>
        </div>
      </main>
    </div>
  )
}