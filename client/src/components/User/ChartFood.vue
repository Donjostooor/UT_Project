<template>
    <div v-if="checkdata === false">
        <h3>No Result Carbonfootprint</h3>
    </div>
    <canvas v-if="Allpredict" id="myChart2"></canvas>
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
                    this.updateChart(); // Call the function to update the chart
                } else {
                    console.error("No predict data found for the user");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                this.checkdata = false;
            });
    },
    methods: {
        updateChart() {
            // Count the occurrences of each pd_name in Allpredict
            const nameCounts = {};

            // Select the last 30 items from Allpredict
            const last30Predictions = this.Allpredict.slice(-30);

            last30Predictions.forEach((item) => {
                const name = item.pd_name;
                if (nameCounts[name]) {
                    nameCounts[name] += 1;
                } else {
                    nameCounts[name] = 1;
                }
            });

            // Extract labels (Allpredict.pd_name) and data (counts)
            const labels = Object.keys(nameCounts);
            const data = Object.values(nameCounts);

            if (this.chartData) {
                // Update the chart if it exists
                this.chartData.data.labels = labels;
                this.chartData.data.datasets[0].data = data;
                this.chartData.update(); // Update the chart
            } else {
                // Create the chart if it doesn't exist
                const ctx = document.getElementById('myChart2');
                this.chartData = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'จำนวน',
                            data: data,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                                'rgb(205, 97, 85)',
                                'rgb(241, 148, 138)',
                                'rgb(195, 155, 211)',
                                'rgb(187, 143, 206)',
                                'rgb(127, 179, 213)',
                                'rgb(133, 193, 233)',
                                'rgb(118, 215, 196)',
                                'rgb(115, 198, 182)',
                                'rgb(125, 206, 160)',
                                'rgb(130, 224, 170)',
                                'rgb(248, 196, 113)',
                                'rgb(229, 152, 102)',
                                'rgb(153, 163, 164)',
                                'rgb(204, 209, 209)',
                                // Add more colors if needed
                            ],
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        // Your chart options
                    }
                });
            }
        }
    },
};
</script>
  