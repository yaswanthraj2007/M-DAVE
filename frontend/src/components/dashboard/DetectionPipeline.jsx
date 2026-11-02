import { useRef } from "react";
import { ImageIcon, FileText, ScanSearch, ShieldAlert } from "lucide-react";
import { AnimatedBeam } from "../ui/animated-beam";
import PipelineNode from "./PipelineNode";
import PipelineCard from "./PipelineCard";

export default function DetectionPipeline() {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const textRef = useRef(null);
  const fusionCoreRef = useRef(null);
  const verdictRef = useRef(null);

  const beam = {
    containerRef,
    gradientStartColor: "#f43f5e",
    gradientStopColor: "#ec4899",
    pathColor: "#f43f5e",
    pathOpacity: 0.15,
  };

  return (
    <PipelineCard
      eyebrow="Pipeline 2"
      title="Detection Engine"
      eyebrowClassName="text-rose-400"
      hoverBorderClassName="hover:border-rose-500/40"
      description="Multimodal deepfake detection. A computer vision branch inspects the media for blending boundaries and frequency-domain artifacts, while an NLP branch checks whether the accompanying text aligns with the image context. A cross-attention fusion layer merges both signals into a single real-versus-synthetic confidence score between 0.0 and 1.0."
      buttonLabel="Detect"
      buttonTo="/detect"
      buttonClassName="bg-rose-500 text-white hover:bg-rose-400"
    >
      <div
        ref={containerRef}
        className="relative flex h-72 w-full items-center justify-between gap-4 overflow-hidden px-2 sm:h-64 sm:px-10"
      >
        <div className="relative z-10 flex h-full flex-col justify-between py-2">
          <PipelineNode
            ref={mediaRef}
            icon={ImageIcon}
            label="Media (CV)"
            className="border-rose-500/60"
            iconClassName="text-rose-400"
          />
          <PipelineNode
            ref={textRef}
            icon={FileText}
            label="Text (NLP)"
            className="border-rose-500/60"
            iconClassName="text-rose-400"
          />
        </div>

        <PipelineNode
          ref={fusionCoreRef}
          icon={ScanSearch}
          label="Fusion Core"
          size="lg"
          className="border-pink-500"
          iconClassName="text-pink-400"
        />

        <PipelineNode
          ref={verdictRef}
          icon={ShieldAlert}
          label="Authenticity Verdict"
          className="border-rose-500/60"
          iconClassName="text-rose-400"
        />

        <AnimatedBeam {...beam} fromRef={mediaRef} toRef={fusionCoreRef} curvature={-60} />
        <AnimatedBeam {...beam} fromRef={textRef} toRef={fusionCoreRef} curvature={60} delay={0.4} />
        <AnimatedBeam {...beam} fromRef={fusionCoreRef} toRef={verdictRef} curvature={0} delay={0.8} />
      </div>
    </PipelineCard>
  );
}
