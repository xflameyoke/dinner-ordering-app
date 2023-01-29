import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = (): JSX.Element => (
  <div className="lds-container">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoadingSpinner;
