// src/components/RainOverlay.jsx
import './RainOverlay.css';

export const RainOverlay = () => {
  return (
    <div className="rain-overlay">
      {Array.from({ length: 50 }).map((_, i) => (
        <img
          key={i}
          src="/images/raindrop.png"
          alt="raindrop"
          className="raindrop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random()}s`,
            animationDelay: `${Math.random() * 2}s`,
            width: '16px',
            height: '16px',
          }}
        />
      ))}
    </div>
  );
};
