// PeekBanner.jsx
// Shows only the top part ("reveal") of a taller orange band.
// Tweak bandHeight/reveal to match your screenshot.

export default function PeekBanner({
  text = "",
  bandHeight = 220, // total height of the orange band
  reveal = 110,     // how much of it you want visible
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-t-[28px]"
      style={{ height: reveal }}
      aria-hidden="true"
    >
      {/* Tall orange band positioned so only the top slice is visible */}
      <div
        className="absolute inset-x-0  flex items-end"
        style={{ height: bandHeight, bottom: -(bandHeight - reveal) }}
      >
        {/* Outline-only big text */}
        <svg viewBox="0 0 1200 200" className="w-full h-[200px]" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="50%"
            fill="transparent"
            stroke="#111111"
            strokeWidth="0.01"
            fontFamily="handelGothic"
            fontWeight="900"
            fontSize="220"
            letterSpacing="12"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity={0.12} 
          >
            {text}
          </text>
        </svg>
      </div>
    </div>
  );
}
