import { services } from '../data'
import { Star } from './Marks'

export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <Star className="spark spark-a" />
      <Star className="spark spark-b" />
      <Star className="spark spark-c" />
      <Star className="spark spark-d" />
      <div className="wrap">
        <div className="services-head">
          <p className="section-kicker">What we do</p>
          <h2 id="services-title" className="nav-target" tabIndex={-1}>Websites with a little more wonder.</h2>
          <p>
            We design and develop custom websites, web applications, and digital experiences that
            are as strategic as they are beautiful — helping purposeful brands grow online.
          </p>
        </div>
        <ul className="services-grid">
          {services.map((service) => (
            <li key={service.title} className="service">
              <img src={service.icon} alt="" />
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
