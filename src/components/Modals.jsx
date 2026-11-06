import { useEffect, useId, useRef, useState } from 'react'
import { previews } from './Marks'

function focusable(node) {
  if (!node) return []
  return [...node.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter((element) => element.getAttribute('aria-hidden') !== 'true' && element.getClientRects().length > 0)
}

let scrollLocks = 0
let lockedScrollY = 0
let savedScrollStyles = null

function lockPageScroll() {
  const root = document.documentElement
  const { body } = document
  if (scrollLocks === 0) {
    lockedScrollY = window.scrollY
    const gutter = Math.max(0, window.innerWidth - root.clientWidth)
    savedScrollStyles = {
      overflow: root.style.overflow,
      scrollBehavior: root.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    }
    root.style.setProperty('--scroll-lock-gutter', `${gutter}px`)
    root.classList.add('is-scroll-locked')
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${lockedScrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
  }
  scrollLocks += 1
  return () => {
    scrollLocks = Math.max(0, scrollLocks - 1)
    if (scrollLocks > 0 || !savedScrollStyles) return
    const previous = savedScrollStyles
    savedScrollStyles = null
    root.classList.remove('is-scroll-locked')
    root.style.removeProperty('--scroll-lock-gutter')
    root.style.overflow = previous.overflow
    body.style.overflow = previous.bodyOverflow
    body.style.position = previous.bodyPosition
    body.style.top = previous.bodyTop
    body.style.left = previous.bodyLeft
    body.style.right = previous.bodyRight
    body.style.width = previous.bodyWidth
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, lockedScrollY)
    root.style.scrollBehavior = previous.scrollBehavior
  }
}

function syncVisualViewport() {
  const viewport = window.visualViewport
  if (!viewport) return
  const root = document.documentElement
  root.style.setProperty('--vv-top', `${viewport.offsetTop}px`)
  root.style.setProperty('--vv-height', `${viewport.height}px`)
}

let viewportLocks = 0

function bindVisualViewport() {
  const viewport = window.visualViewport
  if (viewportLocks === 0) {
    syncVisualViewport()
    viewport?.addEventListener('resize', syncVisualViewport)
    viewport?.addEventListener('scroll', syncVisualViewport)
  }
  viewportLocks += 1
  return () => {
    viewportLocks = Math.max(0, viewportLocks - 1)
    if (viewportLocks > 0) return
    viewport?.removeEventListener('resize', syncVisualViewport)
    viewport?.removeEventListener('scroll', syncVisualViewport)
    const root = document.documentElement
    root.style.removeProperty('--vv-top')
    root.style.removeProperty('--vv-height')
  }
}

function useModal(onClose, restoreRef) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const unlockScroll = lockPageScroll()
    const unbindViewport = bindVisualViewport()
    const previouslyFocused = restoreRef?.current instanceof HTMLElement
      ? restoreRef.current
      : document.activeElement
    const node = dialogRef.current
    const preferred = node?.querySelector('[data-autofocus]')
    if (preferred) preferred.focus()
    else node?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !node) return
      const current = focusable(node)
      if (!current.length) {
        event.preventDefault()
        node.focus()
        return
      }
      const first = current[0]
      const last = current[current.length - 1]
      const inside = node.contains(document.activeElement)
      if (!inside) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      unbindViewport()
      unlockScroll()
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose, restoreRef])

  return dialogRef
}

function Shell({ title, kicker, onClose, restoreRef, children, wide = false, document = false }) {
  const dialogRef = useModal(onClose, restoreRef)
  const titleId = useId()
  const className = ['modal', wide && 'is-wide', document && 'is-document'].filter(Boolean).join(' ')
  const body = (
    <>
      {kicker && <p className="section-kicker">{kicker}</p>}
      <h2 id={titleId}>{title}</h2>
      {children}
    </>
  )

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
          <span aria-hidden="true">×</span>
        </button>
        {document ? <div className="modal-scroll">{body}</div> : body}
      </div>
    </div>
  )
}

export function ContactModal({ onClose, restoreRef }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const statusRef = useRef(null)
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const nameErrorId = useId()
  const emailErrorId = useId()
  const messageErrorId = useId()
  const messageHintId = useId()

  useEffect(() => {
    if (sent) statusRef.current?.focus()
  }, [sent])

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email.'
    }
    if (values.message.trim().length < 10) {
      next.message = 'Please write at least 10 characters about your project.'
    }
    setErrors(next)
    if (next.name) nameRef.current?.focus()
    else if (next.email) emailRef.current?.focus()
    else if (next.message) messageRef.current?.focus()
    else setSent(true)
  }

  return (
    <Shell title={sent ? 'Message received.' : 'Tell us about your idea.'} kicker="Get in touch" onClose={onClose} restoreRef={restoreRef}>
      {sent ? (
        <div ref={statusRef} className="thanks" role="status" tabIndex={-1}>
          <p>
            Thank you, {values.name.trim().split(' ')[0]}. We read every note, and we’ll write back
            about what you’re building.
          </p>
          <button className="btn btn-gold" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor={nameId}>Name</label>
            <input
              ref={nameRef}
              id={nameId}
              name="name"
              value={values.name}
              onChange={update}
              autoComplete="name"
              aria-required="true"
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? nameErrorId : undefined}
              data-autofocus
            />
            {errors.name && <p id={nameErrorId} className="field-error" role="alert">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor={emailId}>Email</label>
            <input
              ref={emailRef}
              id={emailId}
              name="email"
              type="email"
              value={values.email}
              onChange={update}
              autoComplete="email"
              aria-required="true"
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? emailErrorId : undefined}
            />
            {errors.email && <p id={emailErrorId} className="field-error" role="alert">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor={messageId}>Project</label>
            <p id={messageHintId} className="field-hint">At least 10 characters.</p>
            <textarea
              ref={messageRef}
              id={messageId}
              name="message"
              rows="5"
              value={values.message}
              onChange={update}
              aria-required="true"
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? `${messageHintId} ${messageErrorId}` : messageHintId}
            />
            {errors.message && (
              <p id={messageErrorId} className="field-error" role="alert">{errors.message}</p>
            )}
          </div>
          <button className="btn btn-gold" type="submit">
            Send message <span aria-hidden="true">→</span>
          </button>
        </form>
      )}
    </Shell>
  )
}

export function StoryModal({ onClose, restoreRef }) {
  return (
    <Shell title="A studio for imaginative work." kicker="Our story" onClose={onClose} restoreRef={restoreRef}>
      <div className="story">
        <p>
          Enchanted Code started with a simple belief: a website should feel like the brand it
          represents. Not a template with the colors swapped, and not a spectacle that forgets the
          person trying to find their way.
        </p>
        <p>
          We partner with small businesses and thoughtful teams. Strategy, design, and code stay in
          one conversation, from the first spark through launch and the quiet improvements that
          come after. That is the magic we mean — care, craft, and a little wonder.
        </p>
      </div>
    </Shell>
  )
}

export function PrivacyModal({ onClose, restoreRef }) {
  return (
    <Shell title="Privacy Policy" kicker="Legal" onClose={onClose} restoreRef={restoreRef} document>
      <div className="policy">
        <p className="policy-date">Effective November 5, 2026</p>

        <section>
          <h3>1. Introduction</h3>
          <p>
            Welcome to Enchanted Code, a brand operated by 2734539 Alberta Ltd., based in Alberta, Canada.
          </p>
          <p>
            We respect your privacy and are committed to protecting any personal information you share with us.
            This Privacy Policy explains how we collect, use, disclose, and protect information when you visit
            our website or contact us.
          </p>
        </section>

        <section>
          <h3>2. Information We Collect</h3>
          <p>
            Our website does not require visitors to create accounts or provide personal information to browse
            its content.
          </p>
          <p>We may collect personal information when you voluntarily contact us by email, including:</p>
          <ul>
            <li>Your name and email address</li>
            <li>Your company or organization name, if provided</li>
            <li>Information about your project or inquiry</li>
            <li>Any additional information you choose to share</li>
          </ul>
          <p>
            Our website is hosted using GitHub Pages. GitHub may automatically process technical information,
            such as IP addresses and browser information, to operate, maintain, and secure its hosting services.
          </p>
        </section>

        <section>
          <h3>3. How We Use Your Information</h3>
          <p>We use information you voluntarily provide to:</p>
          <ul>
            <li>Respond to questions and inquiries</li>
            <li>Discuss potential projects and services</li>
            <li>Prepare proposals and estimates</li>
            <li>Communicate about ongoing business relationships</li>
            <li>Meet applicable legal and regulatory obligations</li>
          </ul>
          <p>We do not sell your personal information.</p>
        </section>

        <section>
          <h3>4. Cookies and Tracking Technologies</h3>
          <p>
            Enchanted Code does not intentionally use advertising cookies, analytics trackers, or third-party
            marketing tools.
          </p>
          <p>
            Our hosting provider or other third-party services may process technical information necessary to
            deliver and secure the website.
          </p>
          <p>
            If we introduce analytics, cookies, or other tracking technologies in the future, we will update
            this Privacy Policy accordingly.
          </p>
        </section>

        <section>
          <h3>5. Information Sharing</h3>
          <p>We do not sell, rent, or trade your personal information.</p>
          <p>
            We may share information with service providers where reasonably necessary to operate our business,
            or where disclosure is required or permitted by law.
          </p>
          <p>Some service providers may process or store information outside Alberta or Canada.</p>
        </section>

        <section>
          <h3>6. Data Security</h3>
          <p>
            We take reasonable measures to protect personal information against unauthorized access, disclosure,
            alteration, or loss.
          </p>
          <p>However, no method of electronic communication or storage is completely secure.</p>
        </section>

        <section>
          <h3>7. Data Retention</h3>
          <p>
            We retain personal information only as long as reasonably necessary for the purposes described in
            this policy, including fulfilling business obligations and complying with applicable legal
            requirements.
          </p>
          <p>
            When information is no longer required, we take reasonable steps to securely delete or anonymize it.
          </p>
        </section>

        <section>
          <h3>8. Your Privacy Rights</h3>
          <p>
            Subject to applicable laws, you may request access to personal information we hold about you or ask
            us to correct inaccurate information.
          </p>
          <p>You may also contact us with questions or concerns about how your information is handled.</p>
          <p>We will respond to privacy requests in accordance with applicable privacy legislation.</p>
        </section>

        <section>
          <h3>9. Third-Party Websites</h3>
          <p>
            Our website may contain links to external websites, including project demonstrations, GitHub
            repositories, or other third-party services.
          </p>
          <p>
            We are not responsible for the privacy practices or content of those websites. We encourage visitors
            to review their respective privacy policies.
          </p>
        </section>

        <section>
          <h3>10. Children’s Privacy</h3>
          <p>
            Our website is intended for general business and professional audiences. We do not knowingly solicit
            personal information from children.
          </p>
        </section>

        <section>
          <h3>11. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy periodically to reflect changes to our website, business practices,
            or legal obligations.
          </p>
          <p>Any updates will be published on this page with a revised effective date.</p>
        </section>

        <section>
          <h3>12. Contact Us</h3>
          <p>
            For questions, concerns, or requests regarding this Privacy Policy, please contact:
          </p>
          <p className="policy-contact">
            <strong>Enchanted Code</strong>
            <br />
            Operated by 2734539 Alberta Ltd.
            <br />
            Alberta, Canada
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:angel.wiebe.91@gmail.com">angel.wiebe.91@gmail.com</a>
          </p>
        </section>
      </div>
    </Shell>
  )
}

export function ProjectModal({ project, onClose, restoreRef }) {
  const Preview = previews[project.id]
  return (
    <Shell title={project.name} kicker="Featured work" onClose={onClose} restoreRef={restoreRef} wide>
      <div className="project-modal">
        <Preview />
        <p className="project-tags">{project.tags}</p>
        <p>{project.summary}</p>
      </div>
    </Shell>
  )
}
