import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CodeInput({ length = 6, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...values];
    updated[index] = value;
    setValues(updated);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (updated.every((v) => v.length === 1)) {
      onComplete?.(updated.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(paste)) return;

    const digits = paste.slice(0, length).split("");
    const updated = Array(length).fill("");

    digits.forEach((digit, i) => {
      updated[i] = digit;
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });

    setValues(updated);
    if (digits.length === length) {
      onComplete?.(digits.join(""));
    } else {
      inputsRef.current[digits.length]?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center gap-3 mb-4"
    >
      {values.map((val, idx) => (
        <motion.input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={idx === 0 ? handlePaste : undefined}
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileFocus={{ scale: 1.05 }}
        />
      ))}
    </motion.div>
  );
}
