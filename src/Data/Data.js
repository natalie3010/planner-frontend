const groupedData = {
    labels: ['React JS', 'Java', 'Kotlin', 'Node JS', 'Angular JS', 'AWS'],
    datasets: [
      {
        label: 'Supply',
        data: [7, 4, 3, 5, 2, 3],
        backgroundColor: '#268D6C',
        stack: 'Stack 0',
      },
      {
        label: 'Demand',
        data: [4, 1, 4, 8, 10, 3],
        backgroundColor: '#DA7B11',
        stack: 'Stack 1',
      },
    ],
  }
  
  const groupedOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  