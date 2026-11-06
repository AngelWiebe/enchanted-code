export default function Hero({ onContact }) {
  return (
    <section className="hero" id="top" aria-labelledby="top-title">
      <div className="hero-inner">
        <p className="hero-kicker">Ideas. Crafted. Magical Results.</p>
        <h1 id="top-title" className="nav-target" tabIndex={-1}>Enchanted Code</h1>
        <p className="hero-lede">
          Beautiful, functional digital experiences
          <br /> for a more imaginative world.
        </p>
        <p className="hero-copy">
          We’re a web design and development studio that blends strategy, creativity, and clean
          code to bring your ideas to life.
        </p>
        <button className="btn btn-gold" type="button" aria-haspopup="dialog" onClick={onContact}>
          Let’s Create Something Magical <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
