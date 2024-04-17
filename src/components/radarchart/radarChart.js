import React, { useEffect, useRef } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const RadarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const radarOptions = {
        scales: {
            r: {
                grid: {
                    color: 'rgba(198, 198, 198, 0.8)'
                },
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                    color: 'rgba(255, 255, 255, 1)',
                    backdropColor: 'rgba(0, 0, 0, 0)',
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 1)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "radar",
      data: data,
      options: radarOptions,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default RadarChart;
