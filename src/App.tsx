import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClientInfoSection } from "./components/ClientInfoSection";
import { CitizenCharterSection } from "./components/CitizenCharterSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { CompletionMessage } from "./components/CompletionMessage";
import { ProgressBar } from "./components/ProgressBar";
import type { SurveyProgress } from "./types";
import Logo from "./assets/logo.png";
export default function App() {
  const [progress, setProgress] = useState<SurveyProgress>(() => {
    const saved = localStorage.getItem("surveyProgress");
    return saved
      ? JSON.parse(saved)
      : {
          currentSection: 1,
          clientInfo: null,
          ccAnswers: { cc1: "", cc2: [], cc3: "" },
          satisfactionAnswers: {},
          isComplete: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("surveyProgress", JSON.stringify(progress));
  }, [progress]);

  const handleNext = async () => {
    if (progress.currentSection < 3) {
      setProgress((prev) => ({
        ...prev,
        currentSection: prev.currentSection + 1,
      }));
    } else {
      setProgress((prev) => ({ ...prev, isComplete: true }));
    }
  };

  const renderSection = () => {
    switch (progress.currentSection) {
      case 1:
        return (
          <ClientInfoSection
            progress={progress}
            onNext={handleNext}
            setProgress={setProgress}
          />
        );
      case 2:
        return (
          <CitizenCharterSection
            progress={progress}
            onNext={handleNext}
            setProgress={setProgress}
          />
        );
      case 3:
        return (
          <ExperienceSection
            progress={progress}
            onNext={handleNext}
            setProgress={setProgress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8"
        >
          <img src={Logo} alt="knhs-logo" className="h-12 w-12" />
          <h1 className="text-h1 font-bold font-display text-center sm:text-left tracking-display text-gray-800">
            Kiamba National High School
          </h1>
        </motion.div>

        {progress.isComplete ? (
          <CompletionMessage progress={progress} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={progress.currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <ProgressBar current={progress.currentSection} total={3} />
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
