import React from "react";

const ErrorCross: React.FC = () => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {/* Círculo rojo animado */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#F44336"
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

      {/* Línea 1 de la X */}
      <line
        x1="35"
        y1="35"
        x2="65"
        y2="65"
        stroke="#F44336"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="42"
        strokeDashoffset="42"
        visibility="hidden"
      >
        <set attributeName="visibility" to="visible" begin="0.6s" />
        <animate
          attributeName="stroke-dashoffset"
          values="42;0"
          dur="0.3s"
          begin="0.6s"
          fill="freeze"
        />
      </line>

      {/* Línea 2 de la X */}
      <line
        x1="35"
        y1="65"
        x2="65"
        y2="35"
        stroke="#F44336"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="42"
        strokeDashoffset="42"
        visibility="hidden"
      >
        <set attributeName="visibility" to="visible" begin="0.9s" />
        <animate
          attributeName="stroke-dashoffset"
          values="42;0"
          dur="0.3s"
          begin="0.9s"
          fill="freeze"
        />
      </line>
    </svg>
  );
};

export default ErrorCross;
