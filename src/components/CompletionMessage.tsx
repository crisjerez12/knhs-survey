"use client";

import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import { useEffect } from "react";
import { submitSurvey } from "../api/submitSurvey";
import type { SurveyProgress } from "../types";

export const CompletionMessage = ({
  progress,
}: {
  progress: SurveyProgress;
}) => {
  useEffect(() => {
    async function HandleSubmit() {
      await submitSurvey(progress);
    }
    HandleSubmit();
  });
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center space-y-8 bg-white rounded-2xl shadow-lg p-12"
    >
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <CheckCircle className="w-24 h-24 text-[#007AFF] mx-auto" />
        <motion.div
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1],
          }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -40, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * 0.1,
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
              className="absolute"
            >
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Thank you for completing the survey!
        </h2>
        <p className="text-gray-600">
          Your feedback helps us improve Kiamba National High School.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pt-4"
      >
        <p className="text-sm text-gray-500">
          Your responses have been recorded successfully.
        </p>
      </motion.div>
    </motion.div>
  );
};
