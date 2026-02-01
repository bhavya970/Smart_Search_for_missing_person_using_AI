import React from 'react';
import './ShimmerUpload.css';

const CloudSVG = () => (
  <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#a)">
      <path d="M70 50c0-17.67 14.33-32 32-32 8.22 0 15.64 3.27 21.18 8.56C111.85 16.97 123.7 10 136.5 10c17.36 0 31.5 14.14 31.5 31.5 0 .5-.01 1-.04 1.5C183.5 54.7 197 66 197 81c0 16.57-13.43 30-30 30H76c-15.46 0-26-13.15-26-28 0-12.32 8.36-23.03 20-27z" fill="#fff"/>
    </g>
    <defs>
      <filter id="a" x="0" y="0" width="220" height="140" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.18"/>
      </filter>
    </defs>
  </svg>
);

const ShimmerUpload = ({ complete = false, successText = 'Image Successfully uploaded' }) => {
  const [percent, setPercent] = React.useState(8);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // simulate progress; if `complete` becomes true, fast-forward to 100 then show success
  React.useEffect(() => {
    let mounted = true;
    let id = null;

    const tick = () => {
      setPercent((p) => {
        if (!mounted) return p;
        if (p >= 98) return 98;
        const delta = p < 60 ? Math.floor(Math.random() * 6) + 4 : Math.floor(Math.random() * 3) + 1;
        return Math.min(98, p + delta);
      });
    };

    // normal slow tick
    id = setInterval(tick, 420);

    return () => {
      mounted = false;
      if (id) clearInterval(id);
    };
  }, []);

  // when complete prop set, accelerate to 100 and then show success
  React.useEffect(() => {
    if (!complete) return;
    let mounted = true;
    const id = setInterval(() => {
      setPercent((p) => {
        if (!mounted) return p;
        if (p >= 100) return 100;
        const delta = Math.floor(Math.random() * 8) + 6; // faster
        const next = Math.min(100, p + delta);
        if (next === 100) {
          // show success slightly after reaching 100
          setTimeout(() => setShowSuccess(true), 220);
        }
        return next;
      });
    }, 120);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [complete]);

  return (
    <div className="upload-shimmer-wrap">
      <h2 className="upload-title">Uploading...</h2>
      <div className="upload-cloud">
        <CloudSVG />
        <div className="upload-arrow">↑</div>
      </div>

      {!showSuccess ? (
        <>
          <div className="upload-percent">{Math.min(100, percent)}%</div>
          <div className="upload-bar-outer">
            <div className="upload-bar-inner" style={{ width: `${Math.min(100, percent)}%` }} />
          </div>
          <div className="upload-wait">Please Wait</div>
        </>
      ) : (
        <div className="upload-success">{successText}</div>
      )}
    </div>
  );
};

export default ShimmerUpload;
