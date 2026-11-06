import orb from '../assets/about-magical-orb.png'
import { Star } from './Marks'

export default function Approach({ onStory }) {
  return (
    <section className="approach" id="about" aria-labelledby="about-title">
      <Star className="spark spark-e" />
      <Star className="spark spark-f" />
      <Star className="spark spark-g" />
      <div className="wrap approach-grid">
        <div className="approach-visual">
          <img
            src={orb}
            alt="A hand reaching toward a glowing moon resting on a stack of old books"
          />
        </div>
        <div className="approach-copy">
          <p className="section-kicker">Our approach</p>
          <h2 id="about-title" className="nav-target" tabIndex={-1}>
            Part strategy. Part creativity.
            <br /> A touch of magic.
          </h2>
          <p>
            We believe the best digital experiences come from a balance of logic and imagination.
            We take the time to understand your goals, craft thoughtful solutions, and build with
            care — because your vision deserves more than a cookie-cutter approach.
          </p>
          <button className="btn btn-line" type="button" aria-haspopup="dialog" onClick={onStory}>
            Our Story <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
