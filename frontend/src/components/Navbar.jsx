import { useState } from 'react'
import { Menu, X, ShieldCheck } from 'lucide-react'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Generate', href: '#generate' },
  { label: 'Detect', href: '#detect' },
  { label: 'Compliance', href: '#compliance' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <a href="#home" className="navbar__logo">
          <ShieldCheck /> M-DAVE
        </a>

        <ul className="navbar__links">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a href="/login" className="btn btn--outline">Login</a>
          <a href="/signup" className="btn btn--primary">Sign Up</a>
        </div>

        <button className="navbar__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="navbar__mobile">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li className="navbar__mobile-actions">
            <a href="/login" className="btn btn--outline">Login</a>
            <a href="/signup" className="btn btn--primary">Sign Up</a>
          </li>
        </ul>
      )}
    </header>
  )
}