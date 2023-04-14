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
  const chartData = [];

  if (Array.isArray(data)) {
    data.forEach((item) => {
      const values = item.history.map((point) => {
        const [date, value] = point.split(':');
        return { x: new Date(date * 1000), y: parseInt(value) };
      }).sort((a, b) => a.x - b.x); // sắp xếp giá trị hoành độ tăng dần

      chartData.push({
        values: values,
        key: item.target_name,
        color: getRandomColor()
      });
    });

    // Sắp xếp các đường line theo tên target_name
    chartData.sort((a, b) => a.key.localeCompare(b.key));
  }

  return chartData;
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
      <NVD3Chart
        xAxis={{
          tickFormat: function (d) {
            return d3.time.format('%d-%m-%Y')(new Date(d));
          },
        }}
        yAxis={{
          tickFormat: function (d) {
            return parseInt(d);
          },
        }}
        type="lineChart"
        datum={data}
        height={300}
        renderEnd={() => {
          console.log('renderEnd');
        }}
      />
    </React.Fragment>
  );
};

export default YourComponent;
