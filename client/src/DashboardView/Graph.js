import React, { Component } from "react";
import Chart from "chart.js";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  plotChart() {
    let { metric, logs, logs2 } = this.props;

    console.log({ logs });
    console.log({ logs2 });

    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      data: {
        labels: logs.map((d) => d.ts),
        datasets: [
          {
            label: "Logger3",
            data: logs.map((d) => {
              let value = metric === "temperature" ? d.temp : d.hum;
              return { x: new Date(d.ts), y: value };
            }),
            fill: false,
            borderColor: "blue",
          },
          {
            label: "Logger4",
            data: logs2.map((d) => {
              let value = metric === "temperature" ? d.temp : d.hum;
              return { x: new Date(d.ts), y: value };
            }),
            fill: false,
            borderColor: "red",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: { unit: "day" },
            },
          ],
          // hardcoded
          yAxes: [{ ticks: { min: metric === "temperature" ? 27 : 40 } }],
        },
      },
    });
  }

  componentDidMount() {
    console.log("Graph mount");
    this.plotChart();
  }

  componentDidUpdate() {
    console.log("Graph update");
    this.plotChart();
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default Graph;
