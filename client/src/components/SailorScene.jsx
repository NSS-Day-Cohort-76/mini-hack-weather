// src/components/SailorScene.jsx
import './SailorScene.css';

export const SailorScene = ({ windMph }) => {
  const shouldSail = windMph > 10;

  return (
    <div className="ocean-scene">
      <img
        src="/images/sailor.png"
        alt="Sailor Skating"
        className={`sailor ${shouldSail ? 'animate' : ''}`}
      />
    </div>
  );
};
