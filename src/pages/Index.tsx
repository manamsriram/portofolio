import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Timeline } from '@/components/Timeline'
import { Certifications } from '@/components/Certifications'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { SectionReveal } from '@/components/SectionReveal'

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Timeline /></SectionReveal>
        <SectionReveal><Certifications /></SectionReveal>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
      </main>
    </div>
  )
}

