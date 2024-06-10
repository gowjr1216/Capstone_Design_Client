import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CustomCircularProgressbar = ({ gpuUsage }) => {
  return (
    <CircularProgressbar
      value={gpuUsage}
      text={`${gpuUsage}%`}
      styles={{
        root: { width: '60px', height: '60px' }, // 크기 조정
        path: {
          stroke: `rgba(34, 177, 76)`,
          strokeLinecap: 'round',
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
          strokeWidth: '10', // 두께 조정
        },
        trail: {
          strokeWidth: '10', // 두께 조정
          stroke: '#d6d6d6',
        },
        text: {
          fill: '#ffffff',
          fontSize: '20px', // 텍스트 크기 조정
          dominantBaseline: 'middle',
          textAnchor: 'middle',
        },
      }}
    />
  );
};

export default CustomCircularProgressbar;
