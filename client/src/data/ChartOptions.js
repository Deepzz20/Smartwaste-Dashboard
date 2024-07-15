const commonChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    fontFamily: "Plus Jakarta Display",
    background: 'transparent'
  },
  theme: {
    mode: "dark",
  },
  xaxis: {
    labels: { show: true },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: { show: true },
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: true,
  },
};


export const satisfactionRateChartOptions = {
  ...commonChartOptions,
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    ...commonChartOptions.xaxis,
  },
  grid: {
    strokeDashArray: 5,
    borderColor: "#56577A",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0,
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
  },
  colors: ["#0075FF"],
};


export const usersWeeklyChartOptions = {
  ...commonChartOptions,
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    ...commonChartOptions.xaxis,
  },
  colors: ["#008080"],
  plotOptions: {
    bar: {
      borderRadius: 5,
    },
  },
};


export const usersMonthlyChartOptions = {
  ...commonChartOptions,
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    ...commonChartOptions.xaxis,
  },
  colors: ["#ffc412"],
  plotOptions: {
    bar: {
      borderRadius: 5,
    },
  },
};


export const issuesChartOptions = {
  ...commonChartOptions,
  fill: {
    type: 'gradient',
    gradient: {
      shade: "light",
      shadeIntensity: 0.25,
    }
  },
  colors: ['#e60000', '#ff9933', '#00b300'],
  stroke: {
    colors: "#0c113e",
    lineCap: "round"
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            fontWeight: 600,
          }
        }
      }
    }
  },
  legend: {
    formatter: function (val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex]
    },
    fontSize: "15px",
    fontWeight: 500,
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom'
      }
    }
  }],
};