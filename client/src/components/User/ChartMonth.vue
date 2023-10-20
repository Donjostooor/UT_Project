<template>
  <div v-if="checkdata === false">
    <h3>No Result Carbonfootprint</h3>
  </div>
    <canvas v-if="Allpredict" id="myChart" width="400" height="200"></canvas>
</template>
  
<script>
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  data() {
    return {
      Allpredict: [],
      checkdata: false,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3036/predict/" + this.$store.state.auth.user.user.u_id)
      .then((response) => {
        if (response.data.length > 0) {
          this.Allpredict = response.data;
          console.log("HTTP request completed");
          //console.log(this.Allpredict);
          this.checkdata = true;
          // Process data and initialize the chart after data is available
          this.processDataAndInitializeChart();
        } else {
          console.error("No predict data found for the user");
          this.checkdata=false;
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  },
  methods: {
    processDataAndInitializeChart() {
      // Create an empty map to store labels and data
      const dataMap = new Map();

      // Process data and combine data for the same label (date)
      this.Allpredict.forEach((item) => {
        const date = item.pd_date.split('T')[0]; // Remove time part
        const carbon = item.pd_carbon;

        if (dataMap.has(date)) {
          dataMap.set(date, dataMap.get(date) + carbon);
        } else {
          dataMap.set(date, carbon);
        }
      });

      // Extract unique labels and corresponding data
      const labels = [...dataMap.keys()];
      const data = labels.map((date) => dataMap.get(date));

      // Keep only the last 30 labels and data points
      const maxItems = 31;
      if (labels.length > maxItems) {
        labels.splice(0, labels.length - maxItems);
        data.splice(0, data.length - maxItems);
      }

      // Add one day to each label
      const updatedLabels = labels.map((date) => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + 1);
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      });

      // Create the chart
      const ctx = document.getElementById('myChart');
      this.chartData = new Chart(ctx, {
        
        data: {
          labels: updatedLabels,
          datasets: [{
            type: "line",
            label: "",
            fill: true,
            backgroundColor: "transparent",
            borderColor: "blue",
            data: data,
          },{
            type: "bar",
            label: "Your carbon in the last 30 days",
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "blue",
            data: data,
          },],
        },
        options: {
          scales: {
            xAxes: [{
              reverse: true,
              gridLines: {
                color: "rgba(0,0,0,0.05)",
              },
            }],
            yAxes: [{
              borderDash: [5, 5],
              gridLines: {
                color: "rgba(0,0,0,0)",
                fontColor: "#fff",
              },
            }],
          },
        },
      });
    },
  },

};
</script>
  