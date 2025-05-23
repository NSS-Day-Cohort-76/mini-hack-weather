// src/components/SkyTracker.jsx
import './SkyTracker.css';

export const SkyTracker = ({ astro }) => {
  const getPercent = (riseStr, setStr) => {
    const now = new Date();
    const [rHour, rMin, rAmPm] = riseStr.split(/[: ]/);
    const [sHour, sMin, sAmPm] = setStr.split(/[: ]/);

    const to24 = (h, ampm) => (ampm === 'PM' && h !== '12' ? +h + 12 : +h % 24);
    const rise = new Date(now);
    rise.setHours(to24(rHour, rAmPm), +rMin, 0);

    const set = new Date(now);
    set.setHours(to24(sHour, sAmPm), +sMin, 0);

    const pct = (now - rise) / (set - rise);
    return Math.max(0, Math.min(1, pct));
  };

  const sunPercent = getPercent(astro.sunrise, astro.sunset) * 100;
  const moonPercent = getPercent(astro.moonrise, astro.moonset) * 100;

  return (
    <div className="sky-tracker">
      <div className="sky-track">
        <img
          src="/images/sun.png"
          alt="Sun"
          className="tracker-icon"
          style={{ left: `${sunPercent}%` }}
        />
      </div>
      <div className="sky-track">
        <img
          src="/images/moon.png"
          alt="Moon"
          className="tracker-icon"
          style={{ left: `${moonPercent}%` }}
        />
      </div>
    </div>
  );
};
