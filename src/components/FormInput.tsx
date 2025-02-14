import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  options?: string[];
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  register,
  errors,
  required = false,
  options,
}) => {
  const errorMessage = errors[name]?.message as string;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "select" ? (
        <select
          {...register(name)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500
                   focus:border-transparent transition-all bg-white"
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500
                   focus:border-transparent transition-all"
        />
      )}

      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
