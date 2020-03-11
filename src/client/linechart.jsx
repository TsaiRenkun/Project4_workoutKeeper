import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Line} from 'react-chartjs-2';
import moment from "moment";




class Linechart extends React.Component {


    

    render() {
        let monthArray = [[],[],[],[],[],[],[]]
    
        let finding = monthArray.map((array,i)=>{
            this.props.completed.map((workout)=>{
                let month = moment(workout.updated_at).month()
                console.log(month)
                if(i === month){
                    monthArray[i].push(workout)
                    console.log(monthArray, "PUSH PUSH PUSH")
                }
            })
        })

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          
          
            datasets: [
              {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [monthArray[0].length, monthArray[1].length, monthArray[2].length, monthArray[3].length, monthArray[4].length, monthArray[5].length, monthArray[6].length]
              }
            ]
          };

      return (
        <div style = {{width:"800px", height: "400px"}}>
        <h2>Stats Monthly Progress</h2>
        <Line data={data} />
      </div>
      );
    }
  };
  
  export default Linechart;