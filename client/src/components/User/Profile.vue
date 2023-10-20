<template>
    <Navbar />
    <Loading />
    <div>
        <section class="background-profile sec_head">
        </section>
        <section class="sec_head">
        </section>
        <!-- Body Profile -->
        <section class="sec_body">
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex pro_head">
                        <div class="col-4 pro_body_center">
                            <div class="col-12 img_profile_body pro_img">
                                <img class="img img_profile" src="/src/assets/img/user_profile_null.png" alt="loading..."
                                    width="200" />
                            </div>
                            <div class="col-12 text-center">
                                <h6 class="text-uppercase text-muted font-weight-bold">User ID : {{ from.u_id }}</h6>
                            </div>
                        </div>
                        <div class="col- ">
                            <div class="col-12 pro_body_center">
                                <h3 class="text-uppercase font-weight-bold" v-for="(user, index) in user" :key="index">{{ user.u_name }} &nbsp; {{ user.u_lastname }}
                                </h3>
                            </div>
                            <div class="col-12 body_context">
                                <br>
                                <h5 class="body_context_text" v-for="(user, index) in user" :key="index">อายุ : {{ age }}</h5>
                                <h5 class="body_context_text" v-for="(user, index) in user" :key="index">วันเกิด : {{ formattedBirthday }}</h5>
                                <h5 class="body_context_text" v-for="(user, index) in user" :key="index">เพศ : {{ user.u_gender }}</h5>
                                <h5 class="body_context_text" v-for="(user, index) in user" :key="index">ที่อยู่ : {{ user.u_location }}</h5>
                            </div>
                        </div>
                        <div class="col-2 text-center">
                            <router-link to="/edit">
                                <button type="button" class="btn btn-default pro_btn">Edit</button>
                            </router-link>
                            <router-link to="/carbonscan">
                                <button type="button" class="btn btn-primary pro_btn_add">Scan Carbon</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <Chart />
            <div class="container-fluid pro_table">
                <div class="row">
                    <div class="col-1">&nbsp;</div>
                    <div class="col-10 pro_table_body">
                        <div class="col-12">
                            <h4 class=" body_context_text font-weight-bold ">ประวัติผลลัพธ์คาร์บอนฟุตพริ้นท์ <sub>
                                    <p>limit value 30</p>
                                </sub></h4>
                        </div>
                        <div class="col-12 d-flex pro-col">
                            <div class="col-1">
                                <h5 class=" body_context_text font-weight-bold ">List</h5>
                            </div>
                            <div class="col-3 text-center">
                                <h5 class=" body_context_text font-weight-bold ">Date</h5>
                            </div>
                            <div class="col-3 text-center">
                                <h5 class=" body_context_text font-weight-bold ">Name</h5>
                            </div>
                            <div class="col-2">
                                <h5 class=" body_context_text font-weight-bold text-center">Prediction</h5>
                            </div>
                            <div class="col-3">
                                <h5 class=" body_context_text font-weight-bold ">CFP Value</h5>
                            </div>
                        </div>
                        <div class="col-12 d-flex">
                            <div class="col-1 text-center">
                                <div class="col-12" v-for="number in limitedNumbers" :key="number">
                                    <h6 class=" body_context_text">{{ number }}</h6>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="col-12" v-for="(item, index) in Allpredict.slice(0, 30).reverse()" :key="index">
                                    <h6 class=" body_context_text">{{ formatDate(item.pd_date) }}&nbsp;{{ item.pd_time }}
                                    </h6>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="col-12" v-for="(item, index) in Allpredict.slice(0, 30).reverse()" :key="index">
                                    <h6 class=" body_context_text">{{ item.pd_name }}</h6>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12" v-for="(item, index) in Allpredict.slice(0, 30).reverse()" :key="index">
                                    <h6 class=" body_context_text text-center">{{ item.pd_predict }}%</h6>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="col-12 d-flex justify-content-between align-items-stretch"
                                    v-for="(item, index) in limitedAllPredict" :key="index">
                                    <h6 class="body_context_text">{{ item.pd_carbon }} <sub>KgCO<sub>2</sub>e</sub></h6>
                                    <div>
                                        <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                            data-bs-target="#del"
                                            @click="showConfirmation(item.pd_id, index)">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div v-if="isConfirmationVisible" class="modal fade" id="del" tabindex="-1" aria-labelledby="del"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <h4><strong>Are you sure to delete this item?</strong></h4>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                @click="cancelDelete">Close</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                @click="confirmDelete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <Footer />
</template>

<script>
import Loading from '/src/view/Loading.vue';
import Navbar from '/src/components/Nav/Navbar.vue';
import Footer from '/src/components/Nav/Footer.vue';
import Chart from '/src/components/User/Chart.vue';
import axios from "axios";

export default {
    name: 'ProfileComponent',
    components: {
        Loading,
        Navbar,
        Footer,
        Chart
    },
    data() {
        return {
            from: {
                u_id: this.$store.state.auth.user.user.u_id,
            },
            user: [],
            Allpredict: [],
            isConfirmationVisible: false,
            selectedItemToDelete: null,
            selectedItemIndex: null,
        };
    },
    computed: {
        formattedBirthday() {
            if (!this.user[0].u_birthday) return "";

            const date = new Date(this.user[0].u_birthday);
            const day = date.getUTCDate().toString().padStart(2, "0");
            const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
            const year = date.getUTCFullYear();
            return `${day}-${month}-${year}`;
        },
        age() {
            const birthDate = new Date(this.user[0].u_birthday);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            // Check if the birthdate for this year has occurred or not
            if (
                currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() &&
                    currentDate.getDate() < birthDate.getDate())
            ) {
                return age - 1;
            } else {
                return age;
            }
        },
        limitNumber() {
            return Math.min(30, this.Allpredict.length); // Ensure we don't exceed the array's length
        },
        limitedNumbers() {
            return Array.from({ length: this.limitNumber }, (_, index) => index + 1);
        },
        limitedAllPredict() {
            return this.Allpredict.slice(0, 30).reverse();
        },
    },
    mounted() {
        window.scrollTo(0, 0);
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        axios.get("http://localhost:3036/user/" + this.from.u_id)
            .then((response) => {
                if (response.data.length > 0) {
                    this.user = response.data;
                    console.log("HTTP request completed");
                    console.log(this.user);
                } else {
                    console.error("No predict data found for the user");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });

        axios.get("http://localhost:3036/predict/" + this.from.u_id)
            .then((response) => {
                if (response.data.length > 0) {
                    this.Allpredict = response.data;
                    console.log("HTTP request completed");
                    //console.log(this.Allpredict);
                } else {
                    console.error("No predict data found for the user");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    },
    methods: {
        formatDate(date) {
            const formattedDate = new Date(date);
            const dd = String(formattedDate.getDate()).padStart(2, '0');
            const mm = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const yyyy = formattedDate.getFullYear();

            return `${dd}-${mm}-${yyyy}`;
        },

        showConfirmation(itemId, index) {
            this.selectedItemToDelete = itemId;
            this.selectedItemIndex = index;
            this.isConfirmationVisible = true;
        },

        confirmDelete() {
            if (this.selectedItemToDelete) {
                this.deleteItem(this.selectedItemToDelete, this.selectedItemIndex);
                this.isConfirmationVisible = false;
            }
        },

        cancelDelete() {
            this.selectedItemToDelete = null;
            this.selectedItemIndex = null;
            this.isConfirmationVisible = false;
        },

        deleteItem(itemId, index) {
            axios
                .delete(`http://localhost:3036/predict/delete/${itemId}`)
                .then((response) => {
                    if (response.data.length > 0) {
                        console.error("No predict data found for the user");
                    } else {
                        // อัปเดต Allpredict โดยลบรายการที่ถูกลบออก
                        this.Allpredict.splice(index, 1);
                        console.log("Item deleted successfully");
                    }
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        },

    }
}

</script>

<style scoped>
.sec_head {
    padding-bottom: 43vh;
}

.sec_body {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;
    margin-top: -550px;
}

.pro_head {
    border-radius: 20px;
    padding: 10vh 10vh 10vh 10vh;
    background: rgba(255, 255, 255);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.pro_body_center {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.img_profile_body {
    z-index: 1;
    margin-top: -200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.img_profile {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
}

.pro_img {
    padding-bottom: 50px;
}

.body_context {
    padding: 0px 0px 0px 70px;
}

.body_context_text {
    padding: 0px 0px 30px 0px;
}

.pro_btn {
    width: 150px;
    margin-top: -50px;
    margin-left: -10px;
}

.pro_btn_add {
    width: 200px;
    margin-top: 350px;
    margin-left: -50px;
}

.pro_table {
    padding: 5vh 5vh 5vh 5vh;

}

.pro_table_body {
    padding-top: 3vh;
    padding-bottom: 8vh;
    border-radius: 10px;
    background: rgba(255, 255, 255);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

</style>
