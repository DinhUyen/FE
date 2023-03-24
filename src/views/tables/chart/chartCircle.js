import ApexCharts from "apexcharts";
import React, { Component } from 'react';
class CircleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [props.data],
    };
  }

  componentDidMount() {
    const optionsCircle = {
      chart: {
        type: "radialBar",
        height: 250,
        offsetX: 0,
      },
      plotOptions: {
        radialBar: {
          inverseOrder: false,
          hollow: {
            margin: 5,
            size: "70%",
            background: "transparent",
          },
          track: {
            show: true,
            background: "#cfe5fc",
            strokeWidth: "100%",
            opacity: 1,
            margin: 3, // margin is in pixels
          },
        },
      },
      series: this.state.series,
      labels: ["Đã quét"],
      legend: {
        position: "left",
        offsetX: -30,
        offsetY: -10,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    };

    this.chartCircle = new ApexCharts(
      document.querySelector("#circlechart"),
      optionsCircle
    );

    this.chartCircle.render();
  }

  componentWillUnmount() {
    this.chartCircle.destroy();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.data !== this.props.data) {
  //     this.setState({ series: [this.props.data] }, () => {
  //       this.chartCircle.updateSeries(this.state.series);
  //     });
  //   }
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const newSeries = [this.props.data];
      if (newSeries !== this.state.series) {
        this.setState({ series: newSeries }, () => {
          this.chartCircle.updateSeries(newSeries);
        });
      }
    }
  }
  render() {
    return <div id="circlechart"></div>;
  }
}

export default CircleChart;
