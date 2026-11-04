import './Hero.css'
import TechText from './TechText'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow" />
      <div className="hero__content">

        {/* Interactive M-DAVE heading */}
        <div className="w-full h-32 md:h-64 relative mb-4">
          <TechText
            text="M-DAVE"
            accentColor="#ef4444"
            clickKick={true}
            color="#d3d3d3"
            dashGap={2}
            dashLength={4}
            fontSize={120}
            fontWeight={700}
            guides={false}
            intro="assemble"
            introDuration={2}
            specks={15}
            reveal="letter"
          />
        </div>

        {/* Descriptive paragraph */}
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-2">
          Generate responsibly. Detect with confidence.
        </p>

        {/* CTA buttons */}
        <div className="hero__actions">
          <a href="#generate" className="btn btn--primary btn--lg">Try Generation</a>
          <a href="#detect" className="btn btn--outline btn--lg">Run Detection</a>
        </div>

      </div>
    </section>
  )
}
