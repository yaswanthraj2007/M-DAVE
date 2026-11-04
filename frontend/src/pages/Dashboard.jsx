import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GenerationPipeline from "@/components/dashboard/GenerationPipeline";
import DetectionPipeline from "@/components/dashboard/DetectionPipeline";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">Welcome back</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-200 sm:text-3xl">M-DAVE Control Center</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Generate watermarked, signed synthetic media or verify whether an image is real. All
            uploads are processed in memory and purged after inference.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <GenerationPipeline />
          
          <DetectionPipeline />
        </div>
      </div>
    </DashboardLayout>
  );
}
