"use client";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeUploadProps {
  onComplete: (resumeText: string) => void;
  onSkip: () => void;
}

export default function ResumeUpload({ onComplete, onSkip }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const processFile = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) {
      setError("Please upload a PDF file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Max 10MB.");
      return;
    }

    setError("");
    setFileName(file.name);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onComplete(data.text || "");
    } catch {
      setError("Couldn't parse the PDF. You can skip and continue.");
      setIsProcessing(false);
    }
  }, [onComplete]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <motion.div
      className="max-w-xl mx-auto w-full px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <div className="text-center mb-8">
        <h2 className="font-display font-bold text-3xl mb-3">
          Upload Your Resume
        </h2>
        <p style={{ color: "#8b8ba7" }}>
          Our AI will extract skills, projects & achievements to personalize your score
        </p>
      </div>

      {/* Drop Zone */}
      <label htmlFor="resume-file-input">
        <motion.div
          className="relative rounded-2xl p-10 text-center cursor-pointer transition-all duration-300"
          style={{
            background: isDragging
              ? "rgba(97, 114, 248, 0.1)"
              : "rgba(255,255,255,0.03)",
            border: `2px dashed ${isDragging ? "#6172f8" : "rgba(255,255,255,0.12)"}`,
            boxShadow: isDragging ? "0 0 30px rgba(97,114,248,0.2)" : "none",
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          whileHover={{ scale: 1.01 }}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="w-16 h-16 rounded-full border-4 animate-spin"
                  style={{ borderColor: "rgba(97,114,248,0.2)", borderTopColor: "#6172f8" }}
                />
                <div className="font-medium">Parsing {fileName}...</div>
                <div className="text-sm" style={{ color: "#8b8ba7" }}>
                  Extracting skills & achievements
                </div>
              </motion.div>
            ) : fileName ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="text-5xl">✅</div>
                <div className="font-medium" style={{ color: "#00f5a0" }}>
                  {fileName}
                </div>
                <div className="text-sm" style={{ color: "#8b8ba7" }}>
                  Resume parsed successfully!
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{ background: "rgba(97,114,248,0.1)", border: "1px solid rgba(97,114,248,0.2)" }}
                >
                  📎
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">
                    Drop your resume here
                  </div>
                  <div className="text-sm" style={{ color: "#8b8ba7" }}>
                    or <span style={{ color: "#6172f8" }}>click to browse</span>
                  </div>
                </div>
                <div className="text-xs" style={{ color: "#8b8ba7" }}>
                  PDF · Max 10MB
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </label>

      <input
        id="resume-file-input"
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={onFileChange}
      />

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4 text-sm"
          style={{ color: "#f87171" }}
        >
          ⚠️ {error}
        </motion.p>
      )}

      {/* Skip option */}
      <div className="text-center mt-6">
        <button
          id="skip-resume-btn"
          onClick={onSkip}
          className="text-sm transition-colors"
          style={{ color: "#8b8ba7" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c7d7fe")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8b8ba7")}
        >
          Skip for now — I&apos;ll answer questions instead →
        </button>
      </div>
    </motion.div>
  );
}
