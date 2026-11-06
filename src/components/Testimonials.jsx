import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../data'
import { Botanical } from './Marks'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const quoteRef = useRef(null)
  const firstRender = useRef(true)
  const item = testimonials[index]

  function step(direction) {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const quote = quoteRef.current
    if (!quote || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    quote.style.animation = 'none'
    void quote.offsetWidth
    quote.style.animation = ''
  }, [index])

  function onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
  }

  return (
    <section className="testimonials" aria-roledescription="carousel" aria-labelledby="kind-words-title" onKeyDown={onKeyDown}>
      <Botanical className="botanical botanical-left" />
      <Botanical className="botanical botanical-right" />
      <div className="carousel">
        <h2 className="section-kicker" id="kind-words-title">Kind words</h2>
        <div className="quote-wrap">
          <button className="arrow arrow-prev" type="button" onClick={() => step(-1)} aria-label="Previous testimonial">
            <span aria-hidden="true">‹</span>
          </button>
          <blockquote ref={quoteRef} className="quote" aria-live="polite" aria-atomic="true">
            <p>“{item.quote}”</p>
            <footer>— {item.name}</footer>
            <p className="sr-only">Testimonial {index + 1} of {testimonials.length}</p>
          </blockquote>
          <button className="arrow arrow-next" type="button" onClick={() => step(1)} aria-label="Next testimonial">
            <span aria-hidden="true">›</span>
          </button>
        </div>
        <p className="quote-count" aria-hidden="true">{index + 1} of {testimonials.length}</p>
        <div className="dots" role="group" aria-label="Choose a testimonial">
          {testimonials.map((entry, dotIndex) => (
            <button
              key={entry.name}
              className="dot"
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-current={dotIndex === index ? 'true' : undefined}
              aria-label={`Show testimonial from ${entry.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
