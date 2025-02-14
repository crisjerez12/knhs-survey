import { motion } from "framer-motion";
import type { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: number) => void;
  selectedAnswer?: string;
  direction: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  selectedAnswer,
  direction,
}) => {
  return (
    <motion.div
      initial={{ x: 200 * direction, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200 * direction, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full bg-white rounded-2xl shadow-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-800">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index + 1)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              selectedAnswer === option
                ? "bg-[#007AFF] text-white"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
