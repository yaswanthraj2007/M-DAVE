import { useRef } from "react";
import { UserRound, PersonStanding, Cpu, BadgeCheck } from "lucide-react";
import { AnimatedBeam } from "../ui/animated-beam";
import PipelineNode from "./PipelineNode";
import PipelineCard from "./PipelineCard";

export default function GenerationPipeline() {
  const containerRef = useRef(null);
  const sourceFaceRef = useRef(null);
  const targetBodyRef = useRef(null);
  const coreRef = useRef(null);
  const resultRef = useRef(null);

  const beam = {
    containerRef,
    gradientStartColor: "#22d3ee",
    gradientStopColor: "#3b82f6",
    pathColor: "#0ea5e9",
    pathOpacity: 0.15,
  };

  return (
    <PipelineCard
      eyebrow="Pipeline 1"
      title="Generation Engine"
      eyebrowClassName="text-cyan-400"
      hoverBorderClassName="hover:border-cyan-500/40"
      description="Promptless, zero-shot identity transfer. M-DAVE extracts a facial identity embedding from the source face and maps it onto the landmarks of the target body, with no text prompts required. The result is restored for clarity, then stamped with a visible watermark and a C2PA cryptographic signature. All uploads are processed in memory and purged after inference."
      buttonLabel="Generate"
      buttonTo="/generate"
      buttonClassName="bg-cyan-500 text-zinc-950 hover:bg-cyan-400"
    >
      <div
        ref={containerRef}
        className="relative flex h-72 w-full items-center justify-between gap-4 overflow-hidden px-2 sm:h-64 sm:px-10"
      >
        <div className="relative z-10 flex h-full flex-col justify-between py-2">
          <PipelineNode
            ref={sourceFaceRef}
            icon={UserRound}
            label="Source Face"
            className="border-cyan-500/60"
            iconClassName="text-cyan-400"
          />
          <PipelineNode
            ref={targetBodyRef}
            icon={PersonStanding}
            label="Target Body"
            className="border-cyan-500/60"
            iconClassName="text-cyan-400"
          />
        </div>

        <PipelineNode
          ref={coreRef}
          icon={Cpu}
          label="M-DAVE Core"
          size="lg"
          className="border-blue-500"
          iconClassName="text-blue-400"
        />

        <PipelineNode
          ref={resultRef}
          icon={BadgeCheck}
          label="Watermarked Result"
          className="border-cyan-500/60"
          iconClassName="text-cyan-400"
        />

        <AnimatedBeam {...beam} fromRef={sourceFaceRef} toRef={coreRef} curvature={-60} />
        <AnimatedBeam {...beam} fromRef={targetBodyRef} toRef={coreRef} curvature={60} delay={0.4} />
        <AnimatedBeam {...beam} fromRef={coreRef} toRef={resultRef} curvature={0} delay={0.8} />
      </div>
    </PipelineCard>
  );
}