import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CustomCircularProgressbar = ({ cpuUsage }) => {
  return (
    <CircularProgressbar
      value={cpuUsage}
      text={`${cpuUsage}%`}
      styles={{
        root: { width: '60px', height: '60px' },
        path: {
          stroke: `rgba(62, 152, 199)`,
          strokeLinecap: 'round',
          transform: 'rotate(0.75turn)',
          transformOrigin: 'center center',
          strokeWidth: '10',
        },
        trail: {
          stroke: '#d6d6d6',
          strokeLinecap: 'round',
          strokeWidth: '10',
        },
        text: {
          fill: '#ffffff',
          fontSize: '20px',
          dominantBaseline: 'middle',
          textAnchor: 'middle',
        },
      }}
      counterClockwise={true}
    />
  );
};

export default CustomCircularProgressbar;
