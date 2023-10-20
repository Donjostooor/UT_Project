<template>
    <div class="section features-2">
        <div class="container-fluid">
            <div class="row t-how">
                <div class="col-md mx-auto text-center" data-aos="fade-up" data-aos-delay="300">
                    <span class="badge badge-pill badge-warning text-uppercase">Food list</span>
                    <h2 class="display-2">
                        <i class="bi bi-egg-fried">&nbsp;</i>รายการอาหารที่รองรับ
                    </h2>
                    <p class="lead" data-aos="fade-up" data-aos-delay="700">
                        "ทุกมื้ออาหารเป็นโอกาสพิเศษในการสร้างความรักและความทรงจำที่ดี."
                        <br />
                        Rachael Ray
                    </p>
                </div>
                <!-- ======= col Foodlist ======== -->
                <div class="row">
                    <div class="foodlist">
                        <div class="col-md-4" v-for="(menu, index) in menu" :key="index" data-aos="fade-up">
                            <div class="col bt">
                                <div class="food-card">
                                <img :src="menu.f_img" class="card-img-food"/>
                                <div class="food-body">
                                    <h4 class="food-title mb-0"><strong>{{ menu.f_name }}</strong></h4>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ======= End col Foodlist ======== -->
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            menu: [],
        };
    },
    mounted() {
        // Make a GET request to your API endpoint
        axios
            .get("http://localhost:3036/menu") // Update the URL as needed
            .then((response) => {
                // Assuming the response.data is an array of objects
                this.menu = response.data;
                //console.log(this.menu);
            })
            .catch((error) => {
                console.error(error);
            });
    },
};

</script>
<!-- ====== Css ====== -->
<style scoped>
.card-img-food {
    width: 100%;
    height: 25vh;
    object-fit: cover;
    align-items: center;
}

.t-how {
    padding-bottom: 5vh;
}

.food-card {
    border-radius: 6px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
    padding: 40px 15px 15px 15px;
    padding-top: 20px;
}
.food-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    scale: 0.99;
    transition: 0.5s;
}

.food-body {
    text-align: center;
    padding: 20px 15px 0px 15px;
}

.bt {
    padding-bottom: 50px;
}
.foodlist {
    padding: 5vh 5vh 5vh 5vh;
    display: flex;
    flex-wrap:wrap-reverse;
    justify-content:space-between;
}
</style>