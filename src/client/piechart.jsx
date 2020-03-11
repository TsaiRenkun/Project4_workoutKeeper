import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Doughnut} from 'react-chartjs-2';

class Pie extends React.Component {

   
  render() {
      console.log(this.props.completed, "INSIDE CHART")
      const data = {
        labels: [
            'Missed',
            'Completed',
        ],
        datasets: [{
            data: [this.props.missed.length, this.props.completed.length],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            ]
        }]
    };
    return (
      <div style = {{width:"500px", height: "500px"}}>
        <h2>Total Workouts</h2>
        <Doughnut data={data} />
      </div>
    );
  }
};

export default Pie;