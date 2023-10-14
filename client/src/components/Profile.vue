<template>
    <Navbar />
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
                                <img class="img img_profile" src="../assets/img/user_profile_null.png" alt="loading..."
                                    width="200" />
                            </div>
                            <div class="col-12 text-center">
                                <h6 class="text-uppercase text-muted font-weight-bold">User ID : {{ from.u_id }}</h6>
                            </div>
                        </div>
                        <div class="col-6 ">
                            <div class="col-12 pro_body_center">
                                <h3 class="text-uppercase font-weight-bold">{{ from.u_name }} &nbsp; {{ from.u_lastname }}
                                </h3>
                            </div>
                            <div class="col-12 body_context">
                                <br>
                                <h5 class="body_context_text">Ages: {{ age }}</h5>
                                <h5 class="body_context_text">Birthday: {{ formattedBirthday }}</h5>
                                <h5 class="body_context_text">Gender : {{ from.u_gender }}</h5>
                                <h5 class="body_context_text">Location : {{ from.u_location }}</h5>
                            </div>
                        </div>
                        <div class="col-2 text-center">
                            <button type="button" class="btn btn-default pro_btn">Edit</button>
                            <router-link to="/carbonscan">
                                <button type="button" class="btn btn-primary pro_btn_add">Scan Carbon</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <Chart />
            <div class="container pro_table">
                <div class="row">
                    <div class="col-12 pro_table_body">
                        <div class="col-12">
                            <h4 class=" body_context_text font-weight-bold ">History Result Carbonfootprint</h4>
                        </div>
                        <div class="col-12 d-flex">
                            <div class="col-1">
                                <h5 class=" body_context_text font-weight-bold ">List</h5>
                            </div>
                            <div class="col-5">
                                <h5 class=" body_context_text font-weight-bold ">Name</h5>
                            </div>
                            <div class="col-2">
                                <h5 class=" body_context_text font-weight-bold ">Prediction</h5>
                            </div>
                            <div class="col-2">
                                <h5 class=" body_context_text font-weight-bold ">CFP Value</h5>
                            </div>
                            <div class="col-2">
                                <h5 class=" body_context_text font-weight-bold ">Time</h5>
                            </div>
                        </div>
                        <div class="col-12 d-flex">
                            <div class="col-1">
                                <div class="col-12" v-for="(item, index) in Allpredict" :key="index">
                                    <h6 class=" body_context_text">{{  }}</h6>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="col-12" v-for="(item, index) in Allpredict" :key="index">
                                    <h6 class=" body_context_text">{{ item.Allpredict.pd_name }}</h6>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12" v-for="(item, index) in Allpredict" :key="index">
                                    <h6 class=" body_context_text">{{ item.Allpredict.pd_predict }}</h6>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12" v-for="(item, index) in Allpredict" :key="index">
                                    <h6 class=" body_context_text">{{ item.Allpredict.pd_carbon }}</h6>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12" v-for="(item, index) in Allpredict" :key="index">
                                    <h6 class=" body_context_text">{{ item.Allpredict.pd_date }}</h6>
                                    <h6 class=" body_context_text">{{ item.Allpredict.pd_time }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <Footer />
</template>

<script>
import Navbar from '/src/components/Nav/Navbar.vue';
import Footer from '/src/components/Nav/Footer.vue';
import Chart from '/src/components/Chart.vue';

export default {
    name: 'ProfileComponent',
    components: {
        Navbar,
        Footer,
        Chart
    },
    data() {
        return {
            from: {
                u_id: this.$store.state.auth.user.user.u_id,
                u_email: this.$store.state.auth.user.user.u_email,
                u_age: '',
                u_birthday: this.$store.state.auth.user.user.u_birthday,
                u_name: this.$store.state.auth.user.user.u_name,
                u_lastname: this.$store.state.auth.user.user.u_lastname,
                u_gender: this.$store.state.auth.user.user.u_gender,
                u_location: this.$store.state.auth.user.user.u_location,
            },
            Allpredict: [],
        };
    }, computed: {
        formattedBirthday() {
            if (!this.from.u_birthday) return "";

            const date = new Date(this.from.u_birthday);
            const day = date.getUTCDate().toString().padStart(2, "0");
            const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
            const year = date.getUTCFullYear();

            return `${day}-${month}-${year}`;
        },
        age() {
            const birthDate = new Date(this.from.u_birthday);
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
    }, mounted() {
        axios.get("http://localhost:3036/predict/1")
            .then((response) => {
                // Assuming the response.data is an array of objects
                this.Allpredict = response.data;

                console.log("import menu completed");
            })
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
    z-index: 1000;
    margin-top: -130px;
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
    padding: 0px 0px 20px 0px;
}

.pro_btn {
    width: 150px;
    margin-top: -50px;
    margin-left: -10px;
}

.pro_btn_add {
    width: 200px;
    margin-top: 240px;
    margin-left: -50px;
}

.pro_table {
    padding: 5vh 5vh 5vh 5vh;
}

.pro_table_body {
    padding-top: 3vh;
    border-radius: 10px;
    background: rgba(255, 255, 255);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>
