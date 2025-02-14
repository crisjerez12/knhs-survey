import type React from "react";
import { motion } from "framer-motion";
import type { SurveyProgress } from "../types";
import { citizenCharterQuestions } from "../data/questions";

interface CitizenCharterSectionProps {
  progress: SurveyProgress;
  onNext: () => void;
  setProgress: React.Dispatch<React.SetStateAction<SurveyProgress>>;
}

export const CitizenCharterSection: React.FC<CitizenCharterSectionProps> = ({
  progress,
  onNext,
  setProgress,
}) => {
  const handleCC1Answer = (value: string) => {
    setProgress((prev) => ({
      ...prev,
      ccAnswers: {
        ...prev.ccAnswers,
        cc1: value,
        cc2:
          value ===
          "I do not know what a Citizen's Charter is and I did not see one in this office"
            ? ""
            : prev.ccAnswers?.cc2 || "",
        cc3:
          value ===
          "I do not know what a Citizen's Charter is and I did not see one in this office"
            ? ""
            : prev.ccAnswers?.cc3 || "",
      },
    }));
  };

  const handleCC2Change = (option: string) => {
    const currentAnswers = progress.ccAnswers.cc2;
    const newAnswers = option === currentAnswers ? currentAnswers : option;

    setProgress((prev) => ({
      ...prev,
      ccAnswers: {
        ...prev.ccAnswers,
        cc2: newAnswers,
      },
    }));
  };

  const handleCC3Answer = (value: string) => {
    setProgress((prev) => ({
      ...prev,
      ccAnswers: {
        ...prev.ccAnswers,
        cc3: value,
      },
    }));
  };

  const isCC2CC3Disabled =
    progress.ccAnswers?.cc1 ===
    "I do not know what a Citizen's Charter is and I did not see one in this office";

  const canProceed = () => {
    return progress.ccAnswers?.cc1 !== "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {citizenCharterQuestions.cc1.text}
      <div className="space-y-6">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-h2 font-display tracking-display text-gray-800"
        >
          <span className="text-red-500 ml-1">*</span>
        </motion.h2>
        <div className="space-y-3">
          {citizenCharterQuestions.cc1.options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <label className="block p-4 rounded-xl transition-all cursor-pointer hover:bg-blue-50 active:bg-blue-100">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="cc1"
                    value={option}
                    checked={progress.ccAnswers?.cc1 === option}
                    onChange={(e) => handleCC1Answer(e.target.value)}
                    className="w-5 h-5 text-[#007AFF] border-2 border-gray-300 focus:ring-[#007AFF]"
                    required
                  />
                  <span className="text-body leading-body font-body">
                    {option}
                  </span>
                </div>
              </label>
            </motion.div>
          ))}
        </div>
      </div>
      {/* CC2 Question */}
      <motion.div
        className="space-y-6"
        animate={{ opacity: isCC2CC3Disabled ? 0.5 : 1 }}
      >
        <h2 className="text-h2 font-display tracking-display text-gray-800">
          {citizenCharterQuestions.cc2.text}
        </h2>
        <div className="space-y-3">
          {citizenCharterQuestions.cc2.options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <label
                className={`block p-4 rounded-xl transition-all ${
                  !isCC2CC3Disabled
                    ? "cursor-pointer hover:bg-blue-50 active:bg-blue-100"
                    : "cursor-not-allowed"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value={option}
                    checked={progress.ccAnswers?.cc2?.includes(option) || false}
                    onChange={() => handleCC2Change(option)}
                    disabled={isCC2CC3Disabled}
                    className="w-5 h-5 text-[#007AFF] border-2 border-gray-300 rounded focus:ring-[#007AFF]"
                  />
                  <span className="text-body leading-body font-body">
                    {option}
                  </span>
                </div>
              </label>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="space-y-6"
        animate={{ opacity: isCC2CC3Disabled ? 0.5 : 1 }}
      >
        <h2 className="text-h2 font-display tracking-display text-gray-800">
          {citizenCharterQuestions.cc3.text}
        </h2>
        <div className="space-y-3">
          {citizenCharterQuestions.cc3.options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <label
                className={`block p-4 rounded-xl transition-all ${
                  !isCC2CC3Disabled
                    ? "cursor-pointer hover:bg-blue-50 active:bg-blue-100"
                    : "cursor-not-allowed"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="cc3"
                    value={option}
                    checked={progress.ccAnswers?.cc3 === option}
                    onChange={(e) => handleCC3Answer(e.target.value)}
                    disabled={isCC2CC3Disabled}
                    className="w-5 h-5 text-[#007AFF] border-2 border-gray-300 focus:ring-[#007AFF]"
                  />
                  <span className="text-body leading-body font-body">
                    {option}
                  </span>
                </div>
              </label>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Continue Button */}
      <motion.button
        onClick={onNext}
        disabled={!canProceed()}
        whileHover={canProceed() ? { scale: 1.02 } : {}}
        whileTap={canProceed() ? { scale: 0.98 } : {}}
        className={`w-full p-5 rounded-xl font-display text-h3 tracking-display transition-all ${
          canProceed()
            ? "bg-[#007AFF] text-white hover:bg-blue-600 hover:shadow-lg active:bg-blue-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};
