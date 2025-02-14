import type React from "react";
import type { SatisfactionAnswers } from "../types";
import { satisfactionQuestions } from "../data/questions";

interface SatisfactionSectionProps {
  answers: SatisfactionAnswers;
  onAnswer: (questionId: string, value: string) => void;
}

export const SatisfactionSection: React.FC<SatisfactionSectionProps> = ({
  answers,
  onAnswer,
}) => {
  return (
    <div className="space-y-6">
      {satisfactionQuestions.map((question) => (
        <div key={question.id} className="space-y-4">
          <h3 className="font-medium text-gray-900">{question.text}</h3>
          <div className="space-y-2">
            {question.options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onAnswer(question.id, e.target.value)
                  }
                  className="w-4 h-4 text-[#007AFF]"
                  required
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
