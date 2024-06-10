import React, { useMemo } from 'react';
import GaugeChart from 'react-gauge-chart';

const GaugeChartComponent = ({ prevMemUsage }) => {
  const memoizedGaugeChart = useMemo(() => (
    <GaugeChart
      id="gauge-chart1"
      nrOfLevels={30}
      colors={["lightblue", "blue"]}
      arcWidth={0.3}
      percent={prevMemUsage}
      animate={false}
      style={{
        marginTop: '85px',
        width: '150px',
        height: '150px',
      }}
      needleColor="#FF0000"
      needleBaseColor="white"
    />
  ), [prevMemUsage]);

  return memoizedGaugeChart;
};

export default React.memo(GaugeChartComponent);
