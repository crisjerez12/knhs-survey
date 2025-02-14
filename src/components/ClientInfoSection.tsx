import { motion } from "framer-motion";
import type { ClientInfo, SurveyProgress } from "../types";
import { regions } from "../types";

interface ClientInfoSectionProps {
  progress: SurveyProgress;
  onNext: () => void;
  setProgress: React.Dispatch<React.SetStateAction<SurveyProgress>>;
}

export const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({
  progress,
  onNext,
  setProgress,
}) => {
  const handleChange = (field: keyof ClientInfo, value: string | number) => {
    setProgress((prev) => ({
      ...prev,
      clientInfo: {
        ...prev.clientInfo,
        [field]: value,
      },
    }));
  };

  const isComplete = () => {
    return (
      progress.clientInfo?.clientType &&
      progress.clientInfo?.sex &&
      progress.clientInfo?.age &&
      progress.clientInfo?.region &&
      progress.clientInfo?.serviceAvailed
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Client Type
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={progress.clientInfo?.clientType || ""}
          onChange={(e) => handleChange("clientType", e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#007AFF]
                   focus:border-transparent transition-all"
          required
        >
          <option value="">Select type</option>
          <option value="Citizen">Citizen</option>
          <option value="Business">Business</option>
          <option value="Government (Employee)">Government (Employee)</option>
          <option value="Government (Another Agency)">
            Government (Another Agency)
          </option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Sex
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {["Male", "Female"].map((option) => (
            <button
              key={option}
              onClick={() => handleChange("sex", option)}
              className={`p-3 rounded-xl transition-colors ${
                progress.clientInfo?.sex === option
                  ? "bg-[#007AFF] text-white"
                  : "bg-blue-50 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Age
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="number"
          value={progress.clientInfo?.age || ""}
          onChange={(e) => handleChange("age", parseInt(e.target.value))}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#007AFF]
                   focus:border-transparent transition-all"
          min="1"
          max="120"
          required
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Region of Residence
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={progress.clientInfo?.region || ""}
          onChange={(e) => handleChange("region", e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#007AFF]
                   focus:border-transparent transition-all"
          required
        >
          <option value="">Select region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Service Availed */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Service Availed
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={progress.clientInfo?.serviceAvailed || ""}
          onChange={(e) => handleChange("serviceAvailed", e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#007AFF]
                   focus:border-transparent transition-all"
          required
          aria-label="Service Availed"
        />
      </div>

      {/* Continue Button */}
      <button
        onClick={onNext}
        disabled={!isComplete()}
        className={`w-full p-4 rounded-xl font-semibold transition-colors ${
          isComplete()
            ? "bg-[#007AFF] text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </motion.div>
  );
};
