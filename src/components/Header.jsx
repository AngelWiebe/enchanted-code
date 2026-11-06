import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'

const links = [
  { id: 'top', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Our Work' },
]

export default function Header({ onNavigate, onContact, inert }) {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('top')
  const [open, setOpen] = useState(false)
  const pinned = useRef(null)
  const toggleRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ids = ['top', 'services', 'about', 'work']

    const update = () => {
      setSolid(window.scrollY > 24)

      if (pinned.current) {
        const settled = pinned.current === 'top'
          ? window.scrollY < 4
          : Math.abs((document.getElementById(pinned.current)?.getBoundingClientRect().top ?? 0) - 88) < 48
        if (!settled) {
          setActive(pinned.current)
          return
        }
        pinned.current = null
      }

      const line = window.scrollY + 160
      let current = 'top'
      for (const id of ids) {
        const section = document.getElementById(id)
        if (!section) continue
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = id
      }
      setActive(current)
    }

    update()
    const release = () => {
      pinned.current = null
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchmove', release, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchmove', release)
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const first = headerRef.current?.querySelector('#site-nav a, #site-nav button')
    first?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function navigate(id) {
    setOpen(false)
    pinned.current = id
    setActive(id)
    onNavigate(id)
  }

  function onHeaderBlur(event) {
    if (!open) return
    const next = event.relatedTarget
    if (next && !event.currentTarget.contains(next)) setOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className={solid ? 'site-header is-solid' : 'site-header'}
      onBlur={onHeaderBlur}
      inert={inert}
    >
      <a className="logo-btn" href="#top" onClick={(event) => { event.preventDefault(); navigate('top') }} aria-label="Enchanted Code, home">
        <img src={logo} alt="" />
      </a>

      <button
        ref={toggleRef}
        type="button"
        className={open ? 'menu-toggle is-open' : 'menu-toggle'}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <div className={open ? 'header-actions is-open' : 'header-actions'} id="site-nav">
        <nav aria-label="Primary">
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  className={active === link.id ? 'nav-link is-active' : 'nav-link'}
                  href={`#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    navigate(link.id)
                  }}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="btn btn-line" type="button" aria-haspopup="dialog" onClick={onContact}>
          Get in Touch
        </button>
      </div>
    </header>
  )
}
