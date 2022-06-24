export const formatted_data = {
  labels: [],
  datasets: [
    {
      label: 'Supply',
      data: [],
      backgroundColor: '#268D6C',
      stack: 'Stack 0',
    },
    {
      label: 'Demand',
      data: [],
      backgroundColor: '#DA7B11',
      stack: 'Stack 1',
    },
  ],
}

export const grouped_options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  onClick: function(evt){
    console.log(formatted_data);
    console.log(evt);
    console.log(data.datasets[0].data[BarChart.getElementAtEvent(evt)[0]._index])
    const value = chart.scales.x.getValueForPixel(EventTarget)
    console.log(value)

  //  alert(data.datasets[0].data[myLineChart.getElementAtEvent(evt)[0]._index]);
  }
}
