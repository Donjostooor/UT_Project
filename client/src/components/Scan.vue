<template>
    <Loading />
    <Navbar />
    <section id="scan" class="background d-flex">
        <div class="container ">
            <div class="row">
                
                <div class="col-12 background-scan">
                    <!-- Hero -->
                <div class="col-12 topic-scan">
                    <h1 class="heading-1 mb-0" data-aos="zoom-out" data-aos-delay="1500">
                        <strong>Carbon Footprint Analysis System</strong>
                    </h1>
                </div>
                <!-- End Hero -->
                <!-- Upload and Prediction file -->
                <div class="col-12 sc-context">
                    <br>
                    <Upload />
                </div>
                <!-- End Upload and Prediction file -->
                </div>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script setup>
import Loading from '/src/view/Loading.vue';
import Navbar from '/src/components/Nav/Navbar.vue';
import Footer from '/src/components/Nav/Footer.vue';
import Upload from '/src/components/Upload.vue'
window.scrollTo(0, 0);
    window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
</script>

<!-- ====== Css ====== -->
<style>
.background-scan {
    background-color: #fff;
    border-radius: 20px;
    padding: 0px 15px 0px 15px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
}

.topic-scan {
    padding: 5vh 0vh 2vh 0vh;
    align-items: center;
    text-align: center;
}

.sc-context {
    padding: 0vh 0vh 0vh 0vh;
}

/* Darg and drop css */

.drag-area {
    width: 70%;
    height: 400px;
    border: 3px dashed #ccd1da;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px auto;
    position: relative;
}

.drag-area h4 {
    margin-bottom: 20px;
    font-weight: 500;
}

.drag-area .icon {
    font-size: 50px;
    margin-bottom: 20px;
    color: blue;
    text-align: center;
}

.drag-area .header {
    font-size: 20px;
    font-weight: 500;
    color: #34495e;
}

.drag-area .support {
    font-size: 12px;
    color: gray;
    margin: 10px 0 15px 0;
}

.drag-area .button {
    font-size: 20px;
    font-weight: 500;
    color: #1683ff;
    cursor: pointer;
}

.drag-area.active {
    border: 2px solid #1683ff;
}

.img-scan {
    max-width: 100%;
    max-height: 380px;
    object-fit: cover;
    align-items: center;
    padding-bottom: 10px;
}

.btn-scan {
    padding: 5vh 0 0vh 0;
    text-align: center;

}

.support-by {
    font-size: 12px;
    color: gray;
    margin: 10px 0 15px 0;
}

.sc-result {
    padding: 5vh 5vh 5vh 5vh;
}

.sc-result-topic {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 15px 5px 5px 5px;
}

.sc-result-head {
    display: flex;
    align-items: center;
    justify-content: center;
}

.sc-result-body {
    padding-bottom: 2vh;
    display: flex;
    justify-content: center;
}

.showmore {
    padding-top: 3vh;
    text-align: center;
}

.btn-sc-back {
    padding: 0vh 10vh 5vh 10vh;
    color: red;
}

</style>
