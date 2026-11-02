import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow" />
      <div className="hero__content">
        <span className="hero__badge">
          Multimodal Deepfake Analysis &amp; Verification Engine
        </span>
        <h1 className="hero__title">
          Generate Responsibly.<br />
          <span>Detect with Confidence.</span>
        </h1>
        <p className="hero__text">
          M-DAVE creates watermarked, cryptographically signed synthetic media and verifies
          whether any image is real or synthetic, all with privacy-first, in-memory processing.
        </p>
        <div className="hero__actions">
          <a href="#generate" className="btn btn--primary btn--lg">Try Generation</a>
          <a href="#detect" className="btn btn--outline btn--lg">Run Detection</a>
        </div>
      </div>
    </section>
  )
}