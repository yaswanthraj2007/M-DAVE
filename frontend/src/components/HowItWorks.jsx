import './HowItWorks.css'

function ImagePlaceholder({ label }) {
  return <div className="hiw__placeholder">{label}</div>
}

export default function HowItWorks({ id, eyebrow, title, intro, steps, imageSide = 'right', imageLabel }) {
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

  const image = <ImagePlaceholder label={imageLabel} />

  return (
    <section id={id} className="hiw">
      <div className={`hiw__grid hiw__grid--image-${imageSide}`}>
        {imageSide === 'right' ? <>{text}{image}</> : <>{image}{text}</>}
      </div>
    </section>
  )
}