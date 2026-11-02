import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Compliance from './components/Compliance'
import './App.css'

const generationSteps = [
  { title: 'Upload & confirm consent', desc: 'Provide a source face and a target body image, and confirm you have the face owner\'s permission.' },
  { title: 'Promptless identity transfer', desc: 'InsightFace and ONNX transfer the identity embedding onto the target. No text prompts needed.' },
  { title: 'Face restoration', desc: 'CodeFormer / GFPGAN sharpen and clean the swapped face region.' },
  { title: 'Compliance stamping', desc: 'A visible watermark and a C2PA cryptographic signature are applied before delivery.' },
]

const detectionSteps = [
  { title: 'Submit image & caption', desc: 'Upload the media and, optionally, the text that accompanies it.' },
  { title: 'Visual forensics (CV branch)', desc: 'EfficientNet plus FFT analysis find blending boundaries and frequency artifacts.' },
  { title: 'Semantic check (NLP branch)', desc: 'A text encoder evaluates whether the caption and image context align.' },
  { title: 'Cross-attention fusion', desc: 'Both signals merge into a Real vs. Synthetic confidence score from 0.0 to 1.0.' },
]

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks
          id="generate" eyebrow="Generation" imageSide="right" imageLabel="Generation visual"
          title="How Generation Works"
          intro="A privacy-first pipeline that turns two photos into a watermarked, signed result."
          steps={generationSteps}
        />
        <HowItWorks
          id="detect" eyebrow="Detection" imageSide="left" imageLabel="Detection visual"
          title="How Detection Works"
          intro="Two analysis branches, one fused verdict on whether media is authentic."
          steps={detectionSteps}
        />
        <Compliance />
      </main>
      <footer className="footer">© 2026 M-DAVE. All rights reserved.</footer>
    </>
  )
}