import { projects } from '../data'
import { previews } from './Marks'

export default function Work({ onOpen }) {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="work-head">
          <div>
            <p className="section-kicker">Featured work</p>
            <h2 id="work-title" className="nav-target" tabIndex={-1}>Real Businesses. Enchanted Results.</h2>
          </div>
        </div>
        <ul className="work-grid">
          {projects.map((project) => {
            const Preview = previews[project.id]
            return (
              <li key={project.id}>
                <button
                  className="work-card"
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(event) => onOpen(project, event)}
                >
                  <Preview />
                  <h3>{project.name}</h3>
                  <p>{project.tags}</p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
