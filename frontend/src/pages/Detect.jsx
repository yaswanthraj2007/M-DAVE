import { useState } from "react";
import { IconSparkles } from "@tabler/icons-react";
import { FileUpload } from "@/components/ui/file-upload";
import { RainbowButton } from "@/components/ui/rainbow-button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Detect() {
  const [mediaFile, setMediaFile] = useState(null);
  const [caption, setCaption] = useState("");

  const ready = Boolean(mediaFile);

  const handleDetect = () => {
    if (!ready) return;
    const formData = new FormData();
    formData.append("media", mediaFile);
    if (caption) formData.append("caption", caption);
    // TODO: await axios.post("/api/detect", formData)
    console.log("detect", mediaFile.name, caption);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <header className="text-center">
          <h1 className="mt-1 text-3xl font-bold text-zinc-200 sm:text-4xl">Detection Engine</h1>
        </header>

        {/* Upload & Caption Input */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-h-96 rounded-2xl border border-dashed border-white/15 bg-zinc-900/60">
            <FileUpload
              title="Upload Suspicious Media"
              hint="Drag and drop image or video file to analyze, or click to browse"
              onChange={(files) => setMediaFile(files[0] ?? null)}
            />
          </div>

          <div className="flex min-h-96 flex-col justify-between rounded-2xl border border-dashed border-white/15 bg-zinc-900/60 p-6">
            <div>
              <h3 className="text-base font-semibold text-zinc-200">Optional Context / Caption</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Provide text accompanying the media to enable cross-modal semantic inconsistency checking.
              </p>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Paste news headline, social post caption, or claim context here..."
                rows={7}
                className="mt-4 w-full rounded-xl border border-white/10 bg-zinc-950 p-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-rose-500/60 focus:outline-none"
              />
            </div>
            <p className="text-xs text-zinc-500">
              Evaluated using NLP branch and cross-attention against visual features.
            </p>
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
            <span>Detect</span>
          </RainbowButton>

          {!ready && (
            <p className="text-xs text-zinc-500">
              Upload media to start detection analysis.
            </p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
