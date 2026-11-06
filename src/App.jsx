import { useCallback, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Approach from './components/Approach'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import Cta from './components/Cta'
import { ContactModal, PrivacyModal, ProjectModal, StoryModal } from './components/Modals'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [storyOpen, setStoryOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [project, setProject] = useState(null)
  const restoreRef = useRef(null)
  const modalOpen = contactOpen || storyOpen || privacyOpen || Boolean(project)

  const openContact = useCallback((event) => {
    restoreRef.current = event.currentTarget
    setContactOpen(true)
  }, [])
  const openStory = useCallback((event) => {
    restoreRef.current = event.currentTarget
    setStoryOpen(true)
  }, [])
  const openPrivacy = useCallback((event) => {
    restoreRef.current = event.currentTarget
    setPrivacyOpen(true)
  }, [])
  const openProject = useCallback((nextProject, event) => {
    restoreRef.current = event.currentTarget
    setProject(nextProject)
  }, [])
  const closeContact = useCallback(() => setContactOpen(false), [])
  const closeStory = useCallback(() => setStoryOpen(false), [])
  const closePrivacy = useCallback(() => setPrivacyOpen(false), [])
  const closeProject = useCallback(() => setProject(null), [])

  const navigate = useCallback((target) => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    if (target === 'top') window.scrollTo({ top: 0, behavior })
    else document.getElementById(target)?.scrollIntoView({ behavior })
    document.getElementById(`${target}-title`)?.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <a
        className="skip-link"
        href="#top-title"
        inert={modalOpen || undefined}
        onClick={(event) => { event.preventDefault(); navigate('top') }}
      >
        Skip to main content
      </a>
      <Header inert={modalOpen || undefined} onNavigate={navigate} onContact={openContact} />
      <main id="main" inert={modalOpen || undefined}>
        <Hero onContact={openContact} />
        <Services />
        <Approach onStory={openStory} />
        <Work onOpen={openProject} />
        <Testimonials />
        <Cta onContact={openContact} onPrivacy={openPrivacy} />
      </main>
      {contactOpen && <ContactModal onClose={closeContact} restoreRef={restoreRef} />}
      {storyOpen && <StoryModal onClose={closeStory} restoreRef={restoreRef} />}
      {privacyOpen && <PrivacyModal onClose={closePrivacy} restoreRef={restoreRef} />}
      {project && <ProjectModal project={project} onClose={closeProject} restoreRef={restoreRef} />}
    </>
  )
}
