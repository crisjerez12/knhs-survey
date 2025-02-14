import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  return (
    <div className="flex justify-between w-full gap-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center justify-center px-6 py-3 rounded-xl transition-all ${
          canGoPrevious
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`flex items-center justify-center px-6 py-3 rounded-xl transition-all ${
          canGoNext
            ? "bg-[#007AFF] text-white hover:bg-blue-600"
            : "bg-blue-200 text-white cursor-not-allowed"
        }`}
      >
        Next
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};
