import React, { Component } from "react";
import Chart from "chart.js";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  plotChart() {
    let { logs, logs2 } = this.props;

    console.log({ logs });
    console.log({ logs2 });

    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      data: {
        labels: logs.map((d) => d.ts),
        datasets: [
          {
            label: "Logger3-Temperature",
            data: logs.map((d) => {
              return { x: new Date(d.ts), y: d.temp };
            }),
            fill: false,
            borderColor: "blue",
          },
          {
            label: "Logger4-Temperature",
            data: logs2.map((d) => {
              return { x: new Date(d.ts), y: d.temp };
            }),
            fill: false,
            borderColor: "red",
          },
        ],
      },
      options: {
        responsive: true,
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
          yAxes: [{ ticks: { min: 27.5 } }],
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
    return (
      <div>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default Graph;
