import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GenerationPipeline from "@/components/dashboard/GenerationPipeline";
import DetectionPipeline from "@/components/dashboard/DetectionPipeline";
import { USER } from "@/data/mockUser";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-zinc-200 sm:text-3xl">Welcome, {USER.name}.</h1>

        <div className="flex flex-col gap-6">
          <GenerationPipeline />
          <DetectionPipeline />
        </div>
      </div>
    </DashboardLayout>
  );
}