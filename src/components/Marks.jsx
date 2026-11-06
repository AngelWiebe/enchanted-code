export function Star({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0l1.6 8.8L22 12l-8.4 3.2L12 24l-1.6-8.8L2 12l8.4-3.2z"
      />
    </svg>
  )
}

export function Botanical({ className }) {
  return (
    <svg className={className} viewBox="0 0 220 320" fill="none" aria-hidden="true">
      <path
        d="M118 310c2-70-18-110-8-168 8-46-10-78-36-112"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M112 250c-36-8-62-2-84 22 28-2 48 10 58 28"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M114 214c-42-18-70-14-96 6 34 2 58 16 74 38"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M116 176c-28-28-40-58-28-92 22 28 28 54 24 88"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M120 168c22-30 52-42 90-36-28 18-46 36-58 68"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M118 128c18-24 46-34 82-28-26 16-42 32-50 58"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M108 92c-8-28 4-52 28-74-4 30-8 48-22 66"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M78 248c-16 8-28 22-32 38"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M150 150c14 6 24 18 28 32"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}

function MockBar({ dark = false, links }) {
  return (
    <div className={dark ? 'mock-bar is-dark' : 'mock-bar'}>
      <span className="mock-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {links.map((link) => (
        <span key={link}>{link}</span>
      ))}
    </div>
  )
}

export function WillowPreview() {
  return (
    <div className="mock mock-willow" aria-hidden="true">
      <MockBar links={['Home', 'About', 'Journal', 'Shop']} />
      <div className="willow-stage">
        <svg className="willow-plant" viewBox="0 0 120 160" aria-hidden="true">
          <path
            d="M62 150c1-28-6-48-2-74 4-22-6-40-22-58"
            fill="none"
            stroke="#5d7348"
            strokeWidth="1.4"
          />
          <ellipse cx="46" cy="78" rx="16" ry="7" transform="rotate(-40 46 78)" fill="#7d9a62" />
          <ellipse cx="38" cy="98" rx="18" ry="7" transform="rotate(-18 38 98)" fill="#6e8b56" />
          <ellipse cx="74" cy="70" rx="16" ry="6.5" transform="rotate(32 74 70)" fill="#8aa86c" />
          <ellipse cx="78" cy="96" rx="18" ry="7" transform="rotate(16 78 96)" fill="#6d8a52" />
          <ellipse cx="58" cy="48" rx="14" ry="6" transform="rotate(-50 58 48)" fill="#9aaa6e" />
          <ellipse cx="70" cy="40" rx="12" ry="5" transform="rotate(20 70 40)" fill="#7f9a5c" />
          <circle cx="86" cy="34" r="3" fill="#c4a15a" />
          <circle cx="28" cy="64" r="2" fill="#c4a15a" />
        </svg>
        <div className="willow-copy">
          <p>Botanical goods</p>
          <strong>Willow &amp; Pine</strong>
          <em>Let’s grow</em>
        </div>
      </div>
    </div>
  )
}

export function SummitPreview() {
  return (
    <div className="mock mock-summit" aria-hidden="true">
      <MockBar dark links={['About', 'Programs', 'Journal']} />
      <div className="summit-stage">
        <div className="summit-moon" />
        <p className="summit-kicker">Summit Wellbeing</p>
        <strong>A Calmer, Stronger You</strong>
        <svg className="summit-peaks" viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,150 0,78 70,36 130,92 190,18 260,84 330,40 400,96 400,150" fill="#314864" />
          <polygon points="0,150 30,110 100,132 170,70 250,128 320,86 400,120 400,150" fill="#1c2c44" />
          <polygon points="168,74 190,22 214,74" fill="#e8eef4" opacity="0.85" />
        </svg>
      </div>
    </div>
  )
}

export function WhiskPreview() {
  return (
    <div className="mock mock-whisk" aria-hidden="true">
      <MockBar links={['Menu', 'Our Story', 'Order']} />
      <div className="whisk-stage">
        <div className="whisk-copy">
          <p>The Golden Whisk</p>
          <strong>Good Things Rise Here</strong>
        </div>
        <svg className="whisk-loaf" viewBox="0 0 160 130" aria-hidden="true">
          <ellipse cx="80" cy="108" rx="52" ry="8" fill="#e7d3b0" />
          <path d="M28 86c0-28 22-48 52-48s52 20 52 48c0 10-8 16-52 16S28 96 28 86z" fill="#e2b06a" />
          <path d="M36 84c2-22 18-38 44-38 22 0 38 12 44 32-14-8-30-10-44-6-16 4-32 6-44 12z" fill="#f0cb8c" />
          <path d="M80 52c0 18-2 28-2 40" stroke="#a56b38" strokeWidth="1.6" fill="none" />
          <path d="M64 60c6 8 10 18 8 30" stroke="#a56b38" strokeWidth="1.4" fill="none" />
          <path d="M96 60c-6 8-10 18-8 30" stroke="#a56b38" strokeWidth="1.4" fill="none" />
          <path d="M52 78c4 6 8 12 6 20" stroke="#b57c42" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
    </div>
  )
}

export const previews = {
  willow: WillowPreview,
  summit: SummitPreview,
  whisk: WhiskPreview,
}
