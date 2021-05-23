import React from 'react';
import { Line } from 'react-chartjs-2';



const LineChart = (props) => {
    const mydata = [];
    for(var i = 1; i < props.details.length; i++){
        mydata.push({
              label: props.details[i].name,
              data: props.details[i].values,
              labels: props.details[i].values,
              backgroundColor: [
                `#${Math.floor(Math.random()*16777215).toString(16)}`
              ],
              hoverBackgroundColor: [         
                `#${Math.floor(Math.random()*16777215).toString(16)}`
              ],
              "pointRadius": 5,
              "pointHitRadius": 5,
              "pointHoverRadius": 4,
            })
        }
    const data = {
        labels: props.details[0].values,
        datasets: mydata,
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      };

    return (
        <div className="chart">
            <Line data={data} options={options} />
        </div>
    )
};

export default LineChart;