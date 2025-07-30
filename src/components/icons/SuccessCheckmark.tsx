import React from "react";

const SuccessCheckmark: React.FC = () => {
  return (
    <svg width="125" height="125" viewBox="0 0 100 100">
      {/* Círculo animado */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#4CAF50"
        strokeWidth="5"
        fill="none"
        strokeDasharray="283"
        strokeDashoffset="283"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="283;0"
          dur="0.6s"
          fill="freeze"
        />
      </circle>

      {/* Marca de verificación animada y oculta al inicio */}
      <path
        d="M35 50 L47 62 L68 38"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="50"
        strokeDashoffset="50"
        visibility="hidden"
      >
        <set attributeName="visibility" to="visible" begin="0.6s" />
        <animate
          attributeName="stroke-dashoffset"
          values="50;0"
          dur="0.4s"
          begin="0.6s"
          fill="freeze"
        />
      </path>
    </svg>
  );
};

export default SuccessCheckmark;
