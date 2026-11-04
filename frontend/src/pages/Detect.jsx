import { useState } from "react";
import { IconSparkles } from "@tabler/icons-react";
import { FileUpload } from "@/components/ui/file-upload";
import { RainbowButton } from "@/components/ui/rainbow-button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const MEDIA_ACCEPT = { "image/*": [], "video/*": [] };
const TEXT_ACCEPT = { "text/plain": [".txt"], "application/json": [".json"] };

export default function Detect() {
  const [mediaFile, setMediaFile] = useState(null);
  const [textFile, setTextFile] = useState(null);

  // The text/caption file is optional: it only enables the NLP cross-check
  const ready = Boolean(mediaFile);

  const handleDetect = () => {
    if (!ready) return;
    const formData = new FormData();
    formData.append("media", mediaFile);
    if (textFile) formData.append("caption_file", textFile);
    // TODO: await axios.post("/api/detect", formData)
    console.log("detect", mediaFile.name, textFile?.name ?? "(no caption file)");
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <header className="text-center">
          <h1 className="mt-1 text-3xl font-bold text-zinc-200 sm:text-4xl">Detection Engine</h1>
        </header>

        {/* Upload grid: suspect media (left), text/caption data (right) */}
        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="min-h-96 rounded-2xl border border-dashed border-white/15 bg-zinc-900/60">
            <FileUpload
              title="Upload Suspect Media"
              hint="Drag and drop an image or video to analyze, or click to browse"
              accept={MEDIA_ACCEPT}
              onChange={(files) => setMediaFile(files[0] ?? null)}
            />
          </div>

          <div className="min-h-96 rounded-2xl border border-dashed border-white/15 bg-zinc-900/60">
            <FileUpload
              title="Upload Text/Caption Data"
              hint="Optional: a .txt or .json file with the caption or claim"
              accept={TEXT_ACCEPT}
              onChange={(files) => setTextFile(files[0] ?? null)}
            />
          </div>
        </section>

        {/* Action area */}
        <section className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
          <RainbowButton
            size="lg"
            disabled={!ready}
            onClick={handleDetect}
            className="text-red-500 font-semibold hover:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.35)]"
          >
            <IconSparkles className="size-4 text-[#FFFDF0]" />
            <span>Run Detection</span>
          </RainbowButton>

          {!ready && (
            <p className="text-xs text-zinc-500">Upload suspect media to start the analysis.</p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}