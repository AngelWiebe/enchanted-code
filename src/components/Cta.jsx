export default function Cta({ onContact, onPrivacy }) {
  return (
    <footer className="cta" aria-labelledby="cta-title">
      <div className="cta-inner">
        <p className="section-kicker">Ready to get started?</p>
        <h2 id="cta-title">Let’s Build Something Amazing.</h2>
        <button className="btn btn-gold" type="button" aria-haspopup="dialog" onClick={onContact}>
          Get in Touch <span aria-hidden="true">→</span>
        </button>
        <p className="legal">
          © 2026 Enchanted Code. All rights reserved.
          <br />
          A brand of 2734539 Alberta Ltd. · Alberta, Canada
          <br />
          <button type="button" className="legal-link" aria-haspopup="dialog" onClick={onPrivacy}>
            Privacy Policy
          </button>
        </p>
      </div>
    </footer>
  )
}
