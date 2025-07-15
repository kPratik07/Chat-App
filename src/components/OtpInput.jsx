import { useRef } from "react";

const OTPInput = ({ value, onChange, length = 4 }) => {
  const inputs = useRef([]);

  const handleChange = (e, idx) => {
    const newVal = e.target.value.replace(/\D/, "");
    const newOTP = value.split("");
    newOTP[idx] = newVal;
    onChange(newOTP.join(""));

    // Move to next input if digit entered
    if (newVal && idx < length - 1) {
      inputs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputs.current[idx - 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          maxLength="1"
          value={value[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-12 h-12 text-center text-lg border rounded-md dark:bg-gray-700 dark:text-white"
        />
      ))}
    </div>
  );
};

export default OTPInput;
