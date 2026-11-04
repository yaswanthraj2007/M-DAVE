import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import './HowItWorks.css'

function ImagePlaceholder({ label }) {
  return <div className="hiw__placeholder">{label}</div>
}

export default function HowItWorks({
  id,
  eyebrow,
  title,
  intro,
  steps,
  imageSide = 'right',
  image,
  imageAlt = '',
  imageLabel,
}) {
  const text = (
    <div>
      <p className="hiw__eyebrow">{eyebrow}</p>
      <h2 className="hiw__title">{title}</h2>
      <p className="hiw__intro">{intro}</p>
      <ol className="hiw__steps">
        {steps.map((s, i) => (
          <li key={s.title} className="hiw__step">
            <span className="hiw__step-num">{i + 1}</span>
            <div>
              <h3 className="hiw__step-title">{s.title}</h3>
              <p className="hiw__step-desc">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )

  // Real image in a 3D tilt card when one is passed in, otherwise the dashed placeholder
  const visual = image ? (
    <CardContainer containerClassName="py-0" className="w-full">
      <CardBody className="group/card h-auto w-full rounded-2xl border border-white/10 bg-zinc-900/60 p-3 transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(224,38,43,0.45)]">
        <CardItem translateZ={50} className="w-full">
          <img className="hiw__image" src={image} alt={imageAlt} loading="lazy" decoding="async" />
        </CardItem>
      </CardBody>
    </CardContainer>
  ) : (
    <ImagePlaceholder label={imageLabel} />
  )

  return (
    <section id={id} className="hiw">
      <div className={`hiw__grid hiw__grid--image-${imageSide}`}>
        {imageSide === 'right' ? <>{text}{visual}</> : <>{visual}{text}</>}
      </div>
    </section>
  )
}