import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SurveyProgress } from "../types";
import { satisfactionQuestions } from "../data/questions";

interface ExperienceSectionProps {
  progress: SurveyProgress;
  onNext: () => void;
  setProgress: React.Dispatch<React.SetStateAction<SurveyProgress>>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onNext,
  setProgress,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (value: string) => {
    setProgress((prev) => ({
      ...prev,
      satisfactionAnswers: {
        ...prev.satisfactionAnswers,
        [satisfactionQuestions[currentQuestion].id]: value,
      },
    }));

    if (currentQuestion < satisfactionQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {satisfactionQuestions[currentQuestion].text}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {satisfactionQuestions[currentQuestion].options.map((option) => (
                <motion.button
                  key={option}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleAnswer(option)}
                  className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100
                           text-left font-medium text-gray-700 transition-colors"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              Question {currentQuestion + 1} of {satisfactionQuestions.length}
            </span>
            <div className="w-32 h-2 bg-blue-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#007AFF]"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentQuestion + 1) / satisfactionQuestions.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
