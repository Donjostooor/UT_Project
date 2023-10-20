<template>
    <Loading />
    <Navbar />
    <section id="hero" class="background d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-7">
                    <h1 class="display-1 mb-0" data-aos="fade-up" data-aos-delay="1700">
                        <b>Carbon Footprint Analysis System</b>
                    </h1>
                    <br />
                    <h2 data-aos="fade-up" data-aos-delay="1700">Using less Carbon is better, Helping to save the world</h2>
                    <div data-aos="fade-up" data-aos-delay="2200">
                        <router-link to="/carbonscan" class="btn-get-started"><b>CARBON SCAN</b></router-link>
                    </div>
                    <div class="text-sup" data-aos="fade-up" data-aos-delay="2200">
                        <p><a href="#FoodSupport">รายการอาหารที่รองรับ</a></p>
                    </div>
                </div>
                <div class="col-lg-5"></div>
            </div>
        </div>
    </section>
    <!-- End Hero -->
    <!-- ======= Card Button About Us Section  ======= -->
    <!-- <div class="section features-1"  >
        <div class="container">
            <div class="row t-how">
                <div class="col-md mx-auto text-center" data-aos="fade-up" data-aos-delay="500">
                    <span class="badge badge-pill badge-primary text-uppercase">How to</span>
                    <h2 class="display-2">
                        <i class="bi bi-search">&nbsp;</i>How to use this WebApp?
                    </h2>
                    <p class="lead">
                        "การทำความเข้าใจวิธีการใช้งานเว็บไชต์เป็นเหมือนการเปิดประตูสู่โลกของ<br />ความรู้และประสบการณ์ใหม่"
                    </p>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4" data-aos="fade-right" data-aos-delay="700">
                    <div class="info card">
                        <img src="https://i.pinimg.com/originals/21/80/1f/21801f4aaed85514b1d0f0c1f8fea275.gif"
                            class="card-img-top" alt="..." />
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-2 p-3 right">
                                    <h2><i class="bi bi-1-square-fill"></i></h2>
                                </div>
                                <div class="col-md-10 p">
                                    <h5 class="info-title text-uppercase text-primary">
                                        Upload your Image
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4" data-aos="fade-right" data-aos-delay="900">
                    <div class="info card">
                        <img src="https://i.pinimg.com/originals/21/80/1f/21801f4aaed85514b1d0f0c1f8fea275.gif"
                            class="card-img-top" alt="..." />
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-2 p-3 right">
                                    <h2><i class="bi bi-2-square-fill"></i></h2>
                                </div>
                                <div class="col-md-10 p">
                                    <h5 class="info-title text-uppercase text-primary">
                                        Recheck Your prediction
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4" data-aos="fade-right" data-aos-delay="1100">
                    <div class="info card">
                        <img src="https://i.pinimg.com/originals/21/80/1f/21801f4aaed85514b1d0f0c1f8fea275.gif"
                            class="card-img-top" alt="..." />
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-2 p-3 right">
                                    <h2><i class="bi bi-3-square-fill"></i></h2>
                                </div>
                                <div class="col-md-10 p">
                                    <h5 class="info-title text-uppercase text-primary">
                                        Show your [CFP] results
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    -->
    <!-- Card Button About Us Section -->
    <!-- ======= Benefits of this WebApp Section ======= -->
    <section id="why-us" class="why-us section-bg">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1">
                    <div class="content text-center" data-aos="fade-in" data-aos-delay="500">
                        <span class="badge badge-pill badge-success text-uppercase">Benefits</span>
                        <h2 class="display-2">
                            <i class="bi bi-rocket-takeoff-fill">&nbsp;</i>ประโยชน์ของ WebApp นี้
                        </h2>
                        <br />
                    </div>
                    <div class="accordion-list">
                        <ul>
                            <li data-aos="flip-down" data-aos-delay="500">
                                <p>
                                    <span>01</span>แสดงค่า Carbon Footprint ในอาหารแต่ล่ะรายการได้
                                </p>
                            </li>
                            <li data-aos="flip-down" data-aos-delay="700">
                                <p><span>02</span>สร้างจิตสำนึกให้รักสิ่งแวดล้อม</p>
                            </li>
                            <li data-aos="flip-down" data-aos-delay="900">
                                <p>
                                    <span>03</span>ช่วยลดประมาณคาร์บอนไดออกไซด์โดยเริ่มจากกลุ่มขนาดเล็กได้
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-5 align-items-stretch order-1 order-lg-2 img" data-aos="fade-left" data-aos-delay="1100">
                    &nbsp;
                    <img src="src/assets/img/Benefits-img.png" class="Bene-img" />
                </div>
            </div>
        </div>
    </section>
    <!-- End Benefits of this WebApp Section -->
    <!-- ======= Food list supported Section ======= -->
    <section>
        <div id="FoodSupport" class="bodyfood">
            <FoodSupport />
        </div>
    </section>
    <Footer />
    <!-- ======= End Food list supported Section ======= -->
</template>

<script>
import Loading from '/src/view/Loading.vue';
import Navbar from '/src/components/Nav/Navbar.vue';
import Footer from '/src/components/Nav/Footer.vue';
import FoodSupport from '/src/components/AboutFood.vue'
import axios from 'axios';

export default {
    name: 'Home',
    components: {
        Loading,
        Navbar,
        Footer,
        FoodSupport,
    },
    mounted() {
        window.scrollTo(0, 0);
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }
}
</script>

<style scoped>
.Bene-img {
    width: 100%;
    height: 80vh;
    object-fit: cover;
    object-position: center;
}
.bodyfood{
    height: 470vh;
}
.text-sup{
    padding-top: 10px;
    padding-left: 100px;
}
</style>
