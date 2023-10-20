<template>
    <canvas ref="myChartAge"></canvas>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
    data() {
        return {
            chartData: {
                labels: ['18-25', '26-30', '31-40', '41-50', '51-60', '60++'],
                datasets: [
                    {
                        label: 'Length of Age',
                        data: [], // The count of users in each age length category
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 159, 64)'
                        ],
                    },
                ],
            },
        };
    },
    mounted() {
        const ctx = this.$refs.myChartAge.getContext('2d');

        // Fetch data from your API endpoint using Axios
        axios.get('http://localhost:3036/user')
            .then((response) => {
                console.log("HTTP request completed");
                const userData = response.data;

                // Calculate the count of users in each age length category
                const ageLengthCounts = userData.reduce((counts, user) => {
                    const birthday = user.birthday;
                    const age = calculateAge(birthday);

                    if (age >= 18 && age <= 25) {
                        counts['18-25'] = (counts['18-25'] || 0) + 1;
                    } else if (age >= 26 && age <= 30) {
                        counts['26-30'] = (counts['26-30'] || 0) + 1;
                    } else if (age >= 31 && age <= 40) {
                        counts['31-40'] = (counts['31-40'] || 0) + 1;
                    } else if (age >= 41 && age <= 50) {
                        counts['41-50'] = (counts['41-50'] || 0) + 1;
                    } else if (age >= 51 && age <= 60) {
                        counts['51-60'] = (counts['51-60'] || 0) + 1;
                    } else {
                        counts['60++'] = (counts['60++'] || 0) + 1;
                    }

                    return counts;
                }, {});

                // Populate chartData with data
                this.chartData.datasets[0].data = Object.values(ageLengthCounts);

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

// Function to calculate age from a birthday string
function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred this year yet
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
</script>
  