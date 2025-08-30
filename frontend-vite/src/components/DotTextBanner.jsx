// import React from "react";

// /**
//  * Renders large dotted text using an SVG pattern fill.
//  * Props:
//  *  - text: string to display
//  *  - color: dot color (default: #e5e7eb - gray-200)
//  *  - dotRadius: radius of each dot in px (default: 1.2)
//  *  - gap: distance between dot centers in px (default: 6)
//  *  - fontSize: SVG font-size in px (default: 160)
//  *  - opacity: overall opacity (default: 0.35)
//  *  - vertical: if true, render rotated vertically along the side
//  *  - className: extra classes for positioning (use absolute, pointer-events-none, etc.)
//  */
// const DotTextBanner = ({
//   text = "TECHNOLOGY",
//   color = "#000",
//   dotRadius = 1.2,
//   gap = 6,
//   fontSize = 160,
//   opacity = 0.35,
//   vertical = true,
//   className = "",
//   style,
// }) => {
//   // Calculate an SVG viewBox wide enough for the text length
//   const padding = fontSize * 0.25;
//   const estWidth = text.length * (fontSize * 0.7) + padding * 2;
//   const estHeight = fontSize + padding * 2;

//   return (
//     <div className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
//       <svg
//         width="59%"
//         height="50%"
//         viewBox={`0 0 ${vertical ? estHeight : estWidth} ${vertical ? estWidth : estHeight}`}
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         <defs>
//           <pattern id="dotPattern" x="0" y="0" width={gap} height={gap} patternUnits="userSpaceOnUse">
//             <circle cx={dotRadius} cy={dotRadius} r={dotRadius} fill={color} />
//           </pattern>
//         </defs>
//         <g transform={vertical ? `rotate(-90 ${estHeight / 2} ${estWidth / 2})` : undefined}>
//           <text
//             x="50%"
//             y="50%"
//             textAnchor="middle"
//             dominantBaseline="middle"
//             fontSize={fontSize}
//             fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
//             fontWeight="600"
//             letterSpacing="0.08em"
//             fill="url(#dotPattern)"
//           >
//             {text}
//           </text>
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default DotTextBanner;



/**
 * Large dotted word rendered via SVG pattern.
 * Lives happily in the background: pointer-events-none, no layout impact.
 */


import React, { useId } from "react";

const DotTextBanner = ({
  text = "",
  color = "#000000",
  dotRadius = 1.1,
  gap = 6,
  fontSize = 160,
  opacity = 0.22,
  vertical = false,
  className = "",
  style,
}) => {
  if (!text) return null;

  const vbW = 2000;
  const vbH = Math.round(fontSize * 1.6);
  const pid = useId().replace(/:/g, "");

  return (
    <div
      className={`pointer-events-none select-none absolute inset-0 -z-10 ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${vertical ? vbH : vbW} ${vertical ? vbW : vbH}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`dotPattern-${pid}`} x="0" y="0" width={gap} height={gap} patternUnits="userSpaceOnUse">
            <circle cx={dotRadius} cy={dotRadius} r={dotRadius} fill={color} />
          </pattern>
        </defs>

        <g transform={vertical ? `rotate(-90 ${vbH / 2} ${vbW / 2})` : undefined}>
          <text
            x="50%" y="50%"
            textAnchor="middle" dominantBaseline="middle"
            fontSize={fontSize}
            fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
            fontWeight="800"
            letterSpacing="0.08em"
            fill={`url(#dotPattern-${pid})`}
          >
            {text}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DotTextBanner;
