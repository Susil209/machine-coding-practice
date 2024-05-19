
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { MAX, MIN } from '../constants';

const ProgressBar = ({ value = 0, onComplete=()=>{} }) => {

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        setPercentage(Math.min(MAX, Math.max(value, MIN)))

        if(value >= MAX ){
            onComplete();
        }
    },[onComplete, value])

  return (
    <div className="progress">
      <span style={{color: percentage > 49 ? "white" : "black" }}>{percentage.toFixed()}%</span>
      <div 
    //   style={{width: `${percentage}%`}}
    style={{
        transform: `scaleX(${percentage / MAX})`,
        
        transformOrigin: "left",

        }}
        role='progressbar'
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percentage.toFixed()}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  onComplete: PropTypes.func
};

export default ProgressBar;
