import React from 'react';
import './ShimmerUIMatches.css';

const ShimmerUIMatches = () => {
  return (
    <div className="shimmer-wrap">
      <div className="shimmer-scanner">
        <div className="face">
          <span className="dot d1" />
          <span className="dot d2" />
          <span className="dot d3" />
          <span className="dot d4" />
          <span className="dot d5" />
          <span className="dot d6" />
          <span className="dot d7" />
          <span className="dot d8" />
          <span className="dot d9" />
          <span className="dot d10" />
          <span className="dot d11" />
          <span className="dot d12" />
        </div>
        <div className="scanner-line" />
      </div>

      <h2 className="shimmer-title">Face Scanning in Process</h2>
      <p className="shimmer-sub">Please Wait</p>
      <div className="shimmer-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default ShimmerUIMatches;
