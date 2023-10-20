<template>
        <canvas ref="myChartGender" ></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
    data() {
        return {
            chartData: {
                labels: [], // This should be gender categories
                datasets: [
                    {
                        label: 'Gender Data',
                        data: [], // This should be the count of each gender category
                        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)',  'rgb(255, 205, 86)'],
                    },
                ],
            },
        };
    },
    mounted() {
        const ctx = this.$refs.myChartGender.getContext('2d');

        // Fetch data from your API endpoint using Axios
        axios.get('http://localhost:3036/user')
            .then((response) => {
                console.log("HTTP request completed");
                const userData = response.data;

                // Calculate the count of each gender category
                const genderCounts = userData.reduce((counts, user) => {
                    const gender = user.u_gender;
                    counts[gender] = (counts[gender] || 0) + 1;
                    return counts;
                }, {});

                // Populate chartData with labels and data
                this.chartData.labels = Object.keys(genderCounts);
                this.chartData.datasets[0].data = Object.values(genderCounts);

                // Create the chart
                const myChart = new Chart(ctx, {
                    type: 'doughnut', // Change this to the type of chart you want
                    data: this.chartData,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },
};
</script>
