import { useState } from "react";
import { IconSparkles } from "@tabler/icons-react";
import { FileUpload } from "@/components/ui/file-upload";
import { RainbowButton } from "@/components/ui/rainbow-button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Generate() {
  const [sourceFile, setSourceFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);
  const [consent, setConsent] = useState(false);

  const ready = Boolean(sourceFile && targetFile && consent);

  const handleGenerate = () => {
    if (!ready) return;
    const formData = new FormData();
    formData.append("source_face", sourceFile);
    formData.append("target_body", targetFile);
    // TODO: await axios.post("/api/generate", formData)
    console.log("generate", sourceFile.name, targetFile.name);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <header className="text-center">
          <h1 className="mt-1 text-3xl font-bold text-zinc-200 sm:text-4xl">Create Your Avatar</h1>
        </header>

        {/* Upload grid: source face (left), target body (right) */}
        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="min-h-96 rounded-2xl border border-dashed border-white/15 bg-zinc-900/60">
            <FileUpload
              title="Upload Source Face"
              hint="Drag and drop a clear, front-facing photo, or click to browse"
              onChange={(files) => setSourceFile(files[0] ?? null)}
            />
          </div>

          <div className="min-h-96 rounded-2xl border border-dashed border-white/15 bg-zinc-900/60">
            <FileUpload
              title="Upload Target Body"
              hint="Drag and drop the target body image, or click to browse"
              onChange={(files) => setTargetFile(files[0] ?? null)}
            />
          </div>
        </section>

        {/* Action area */}
        <section className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
          <label className="flex max-w-md cursor-pointer items-start gap-3 text-left text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-red-500"
            />
            <span>I confirm I have permission from the person whose face I am uploading.</span>
          </label>

          <RainbowButton
            size="lg"
            disabled={!ready}
            onClick={handleGenerate}
            className="text-red-500 font-semibold hover:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.35)]"
          >
            <IconSparkles className="size-4 text-[#FFFDF0]" />
            <span>Run Generation</span>
          </RainbowButton>

          {!ready && (
            <p className="text-xs text-zinc-500">
              Add both images and confirm permission to continue.
            </p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}