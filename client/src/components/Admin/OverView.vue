<template>
    <div class="container-fluid ">
        <h1 class="display-1">OverView</h1><br>
        <div class="col-12 d-flex card-body ">
            <div class="col-2 card card-1">
                <router-link to="">
                    <h5><strong>All User :</strong></h5>
                    <h1 class="card-text"><strong>{{ user.length }}</strong></h1>
                </router-link>
            </div>
            <div class="col-1" />
            <div class="col-2 card card-2">
                <router-link to="">
                    <h5><strong>All Menu :</strong></h5>
                    <h1 class="card-text"><strong>{{ menu.length }}</strong></h1>
                </router-link>
            </div>
            <div class="col-1" />
            <div class="col-6 card">
                <h5 v-for="(model, index) in model" :key="index"><strong>This webs use model from </strong>m_id : {{
                    model.m_id }}</h5>
                <div class="col-12 d-flex">
                    <div class="col-9">
                        <p class="card-model" v-for="(model, index) in model" :key="index">{{ model.m_model }}</p>
                    </div>
                    <div class="col-3 p-4">
                        <button type="button" class="btn btn-default" data-bs-toggle="modal"
                            data-bs-target="#Change">Change</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="col-12 card-body">
            <h1 class="display-4">ตารางผลลัพธ์คาร์บอนของผู้ใช้</h1>
            <ChartCarbon />
        </div>
        <br>
        <div class="col-12 card-body">
            <h1 class="display-4">ประวัติผลลัพธ์คาร์บอนของผู้ใช้</h1>
            <br>
            <div class="col-12 d-flex">
                <div class="col-1">
                    <h5><strong>ID</strong></h5>
                </div>
                <div class="col-1">
                    <h5><strong>UserID</strong></h5>
                </div>
                <div class="col-3">
                    <h5><strong>&nbsp;&nbsp;&nbsp;FoodName</strong></h5>
                </div>
                <div class="col-3 text-center">
                    <h5><strong>Prediction</strong></h5>
                </div>
                <div class="col-2 text-center">
                    <h5><strong>CarbonValue</strong></h5>
                </div>
                <div class="col-2 text-center">
                    <h5><strong>Date</strong></h5>
                </div>
            </div><br>
            <div class="col-12 d-flex">
                <div class="col-1">
                    <h6 v-for="(predict, index) in predict.slice(0, 60).reverse()" :key="index">{{ predict.pd_id }}</h6>
                </div>
                <div class="col-1">
                    <h6 v-for="(predict, index) in predict.slice(0, 60).reverse()" :key="index">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ predict.pd_userid }}</h6>
                </div>
                <div class="col-3">
                    <h6 v-for="(predict, index) in predict.slice(0, 60).reverse()" :key="index">&nbsp;&nbsp;&nbsp;&nbsp;{{ predict.pd_name }}</h6>
                </div>
                <div class="col-3 text-center">
                    <h6 v-for="(predict, index) in predict.slice(0, 60).reverse()" :key="index">{{ predict.pd_predict }} %</h6>
                </div>
                <div class="col-2 text-center">
                    <h6 v-for="(predict, index) in predict.slice(0, 60).reverse()" :key="index">{{ predict.pd_carbon }} <sub>KgCO<sub>2</sub>e</sub></h6>
                </div>
                <div class="col-2 text-center">
                    <h6 v-for="(date, index) in formattedDates.slice(0, 60).reverse()" :key="index">{{ date }}</h6>
                </div>
            </div>
        </div><br><br>

        <!-- Modal -->
        <div class="modal fade" id="Change" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><strong>Change model</strong></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <div class="form-group focused">
                                <div class="input-group input-group-alternative mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="bi bi-caret-right-square"></i></span>
                                    </div>
                                    <input v-model="new_model.m_id" class="form-control"
                                        placeholder="Input your delete oldId " type="text">
                                </div>
                                <div class="input-group input-group-alternative mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="bi bi-caret-right-square"></i></span>
                                    </div>
                                    <input v-model="new_model.m_model" class="form-control"
                                        placeholder="Input your NewModel URL" type="text">
                                </div>
                            </div><br>
                            <div class="text-right">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ChartCarbon from '/src/components/Admin/ChartCarbon.vue'
import axios from 'axios';

export default {
    name: 'Overview',
    components: {
        ChartCarbon
    },
    data() {
        return {
            user: [],
            menu: [],
            model: [],
            predict: [],
            new_model: {
                m_id: '',
                m_model: '',
            },
        };
    },
    computed: {
        formattedDates() {
            if (!this.predict || this.predict.length === 0) return [];

            return this.predict.map(item => {
                if (!item.pd_date) return "";

                const date = new Date(item.pd_date);
                const day = date.getUTCDate().toString().padStart(2, "0");
                const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
                const year = date.getUTCFullYear();

                return `${day}-${month}-${year}`;
            });
        },
    },


    methods: {
        async submitForm() {
            try {
                const response = await axios.delete('http://localhost:3036/model/delete/' + this.new_model.m_id);
                if (response.status === 200) {
                    // Update was successful, you can show a success message or redirect
                    console.log('User delete successfully');
                    const response = await axios.post('http://localhost:3036/model/new_model', this.new_model);
                    if (response.status === 200) {
                        console.log('User post new model successfully');
                    }
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },

    },
    mounted() {
        axios.get("http://localhost:3036/user")
            .then((response) => {
                if (response.data.length > 0) {
                    this.user = response.data;
                    console.log("HTTP request completed");
                } else {
                    console.error("No user data found");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
        axios.get("http://localhost:3036/menu")
            .then((response) => {
                if (response.data.length > 0) {
                    this.menu = response.data;
                    console.log("HTTP request completed");
                } else {
                    console.error("No user data found");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
        axios.get("http://localhost:3036/model")
            .then((response) => {
                if (response.data.length > 0) {
                    this.model = response.data;
                    console.log("HTTP request completed");
                } else {
                    console.error("No user data found");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
        axios.get("http://localhost:3036/predict")
            .then((response) => {
                if (response.data.length > 0) {
                    this.predict = response.data;
                    console.log("HTTP request completed");
                } else {
                    console.error("No user data found");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    },
};

</script>
<style scoped>
.card-body {
    background-color: rgb(255, 255, 255, 1);
    border-radius: 15px;
}

.card {
    border: 1px solid rgb(0, 0, 0, 0.2);
    height: 150px;
    border-radius: 15px;
    background-color: #fff;
    padding: 2vh 3vh 2vh 3vh;
}


.card-text {
    padding-top: 1vh;
    padding-right: 3vh;
    text-align: right;
}

.card-model {
    padding-top: 1vh;
}

.card-1 {
    background-color: rgba(0, 255, 150, 0.2);
}

.card-2 {
    background-color: rgba(255, 153, 0, 0.2);
}
</style>