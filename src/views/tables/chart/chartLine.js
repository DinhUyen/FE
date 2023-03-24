
import React from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';

const YourComponent = ({ data }) => {
  const chartData = getChartData(data);

  return (
    <div>
      <LineChart data={chartData} />
    </div>
  );
};
const getChartData = (data) => {
  const chartData = {};

  if (Array.isArray(data)) {
    data.forEach((item) => {
      const values = item.history.map((point) => {
        const [date, value] = point.split(':');
        return { x: new Date(date * 1000), y: parseInt(value) };
      }).sort((a, b) => a.x - b.x); // sắp xếp giá trị hoành độ tăng dần

      // Check if chartData already has the key
      if (chartData[item.target_name]) {
        chartData[item.target_name].values.push(...values);
      } else {
        chartData[item.target_name] = {
          values: values,
          key: item.target_name,
          color: getRandomColor()
        };
      }
    });

    // Sort values for each target_name by x-axis (hoàng độ)
    Object.keys(chartData).forEach((target_name) => {
      chartData[target_name].values.sort((a, b) => a.x - b.x);
    });
  }

  // Convert object to array
  return Object.values(chartData);
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const LineChart = ({ data }) => {
  return (
    <React.Fragment>
      {React.createElement(NVD3Chart, {
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format('%d-%m-%Y')(new Date(d));
          },
        },        
        yAxis: {
          tickFormat: function (d) {
            return parseInt(d);
          }
        },
        type: 'lineChart',
        datum: data,
        x: 'x',
        y: 'y',
        height: 300,
        renderEnd: function () {
          console.log('renderEnd');
        }
      })}
    </React.Fragment>
  );
};

export default YourComponent;
