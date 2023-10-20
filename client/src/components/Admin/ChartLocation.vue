<template>
    <canvas ref="myChartLocation"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
    data() {
    return {
        chartData: {
            labels: [], // This should be location categories
            datasets: [
                {
                    label: 'Location Data',
                    data: [], // This should be the count of each location category
                    backgroundColor: this.generateRandomColors(77), // Use the function to generate 77 different colors
                },
            ],
        },
    };
},
methods: {
    generateRandomColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`;
            colors.push(color);
        }
        return colors;
    },
},
    mounted() {
        const ctx = this.$refs.myChartLocation.getContext('2d');

        // Fetch data from your API endpoint using Axios
        axios.get('http://localhost:3036/user')
            .then((response) => {
                console.log("HTTP request completed");
                const userData = response.data;

                // Calculate the count of each location category
                const locationCounts = userData.reduce((counts, user) => {
                    const location = user.u_location;
                    counts[location] = (counts[location] || 0) + 1;
                    return counts;
                }, {});

                // Populate chartData with labels and data
                this.chartData.labels = Object.keys(locationCounts);
                this.chartData.datasets[0].data = Object.values(locationCounts);

                // Create the chart
                const myChart = new Chart(ctx, {
                    type: 'bar', // Change this to the type of chart you want
                    data: this.chartData,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },

};
</script>
