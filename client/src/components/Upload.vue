<template>
    <div class="container">
        <div class="row">

            <!-- Pick Your images-->
            <div class="col-12">
                <div class="col-12">
                    <h5><strong>Upload your File :</strong></h5>
                </div>
                <div class="drag-area" :class="{ active: isDragActive }" @dragover.prevent="onDragOver"
                    @dragleave="onDragLeave" @drop="onDrop">
                    <div v-if="imageSrc === null" class="icon">
                        <i class="bi bi-images"></i>
                    </div>
                    <span v-if="imageSrc === null" class="header">{{ dragText }}</span>
                    <span v-if="imageSrc === null" class="header">or <span class="button"
                            @click="browseFile">browse</span></span>
                    <input v-if="imageSrc === null" type="file" ref="fileInput" hidden @change="onFileChange" />
                    <span v-if="imageSrc === null" class="support">Supports: JPEG, JPG, PNG</span>
                    <img v-if="imageSrc" class="img-scan" :src="imageSrc" alt="Uploaded Image" />
                </div>
                <div v-if="imageSrc === null" class="col-12 d-flex justify-content-center ">
                    <span class="support-by">power by Teachable machine</span>
                </div>
                <div class="col-12 btn-scan">
                    <div class="col-12 d-flex justify-content-center">
                        <button v-if="imageSrc" class="col-8 btn btn-danger btn-block" type="button"
                            @click="deleteImage">Reset Image</button>
                    </div>
                    <div v-if="imageSrc" class="col-12 d-flex justify-content-center">
                        <hr class="" color="blue" width="90%" style="border-width: 3px;">
                    </div>
                </div>
            </div>

            <!-- Show Result Your image -->
            <div v-if="imageSrc" class="col-12 sc-result">
                <div class="col-12 sc-result d-flex justify-content-between">
                    <h5><strong>Result your image :</strong></h5>
                    <!-- btn Show Prediction-->
                    <button v-if="imageSrc && showValue === false" class="btn btn-primary" type="button"
                        @click="onShowAllValue">All Value Prediction</button>
                    <button v-if="showValue === true" class="btn btn-default" type="button" @click="onCloseAllValue">Hide
                        Value</button>
                </div>
                <div class="sc-result-topic">

                    <!-- Show Result Head -->
                    <div class="col-12 sc-result-head">
                        <div class="col-1">
                            <h5><strong></strong></h5>
                        </div>
                        <div class="col-7">
                            <p><strong>FoodName</strong></p>
                        </div>
                        <div class="col-4">
                            <p><strong>Prediction Value <span>%</span></strong></p>
                        </div>
                    </div>

                    <!-- Show Result Body -->
                    <div class="col-12 sc-result-body">
                        <div class="col-1 p-2">
                            <h5><strong> 1. </strong></h5>
                        </div>
                        <div class="col-7">
                            <h5 v-if="showOption === false"><strong>{{ maxClassName }}</strong></h5>
                            <select v-if="showOption === true" id="option-Fname" name="option-Fname" class="form-select form-select-lg" aria-label=".form-select-lg example" @change="onOptionChange($event)">
                                <option :value="maxClassName" selected>{{ maxClassName }}</option>
                                <option v-for="(foodName, index) in FoodName" :key="index" :value="foodName">{{ foodName }}</option>                                 
                            </select>
                        </div>
                        <div class="col-4 p-2">
                            <h5 >&nbsp;<strong>{{ maxProbability * 100 }}</strong></h5>
                        </div>
                    </div>
                </div>
                <div v-if="imageSrc" class="col-12 sc-result-footer">
                    <div class="col-12 d-flex justify-content-center">
                        <hr class="" color="blue" width="90%" style="border-width: 3px;">
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <button class="btn btn-success" type="button">Correct,start calculating.</button>
                        <button class="btn btn-danger" type="button" @click="onShowOption">No, picture is incorrect.</button>
                    </div>
                </div>

                <!-- Show Table Prediction -->
                <div v-if="showValue === true" class="sc-result-topic">
                    <!-- Show Result Head -->
                    <div class="col-12 sc-result-head">
                        <div class="col-1">
                            <p>List</p>
                        </div>
                        <div class="col-7">
                            <p><strong>FoodName</strong></p>
                        </div>
                        <div class="col-4">
                            <p><strong>Prediction Value <span>%</span></strong></p>
                        </div>
                    </div>
                    <!-- Show Result Body -->
                    <div class="col-12 sc-result-body">
                        <div class="col-1">
                            <div class="col-12" v-for="(item, index) in list" :key="index">
                                <h5><strong>{{ item }}</strong></h5>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="col-12" v-for="(foodName, index) in FoodName" :key="index">
                                <h5><strong>{{ foodName }}</strong></h5>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="col-12" v-for="(prediction, index) in Prediction" :key="index">
                                <h5><strong>{{ prediction }}</strong></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Show Table Prediction -->
            </div>
            <!-- End Show Result Your image -->

            <!-- About Support -->
            <div v-if="imageSrc" class="col-12 d-flex justify-content-center ">
                <span class="support-by">power by Teachable machine</span>
            </div>
        </div>
    </div>
</template>
<script>
import * as tmImage from "@teachablemachine/image/dist";
import axios from "axios";
export default {
    data() {
        return {
            isDragActive: false,
            dragText: "Drag & Drop",
            imageSrc: null,
            maxClassName: "",
            maxProbability: 0,
            m_model: [],
            f_code: [],
            f_name: [],
            //show value
            list: [],
            FoodName: [],
            Prediction: [],
            showValue: false,
            showOption: false,
        };
    },
    methods: {
        //All VALUES in Table
        onShowAllValue(event) {
            event.preventDefault();
            this.showValue = true
            console.log("ShowAllValue Working..");
        },
        onCloseAllValue(event) {
            event.preventDefault();
            this.showValue = false
            console.log("CloseAllValue Working..");
        },
        //Select Option
        onShowOption(event) {
            event.preventDefault();
            this.showOption = true
            console.log("ShowOption Working..");
        },
        onOptionChange(event) {
            const Fname = event.target.value;
            let optionPD = 0;
            console.log(event.target.value);
            // convert f_code to f_name
            for (let j = 0; j < this.f_name.length; j++) {
                    if (Fname === this.FoodName[j]) {
                        optionPD = this.Prediction[j]
                        console.log("OptionChange Working..");
                        /*console.log(Fname);
                        console.log(this.FoodName[j]);
                        console.log(optionPD);*/
                    }
            }
            this.maxProbability = optionPD;
        },

        async browseFile() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.displayFile(file);
        },
        onDragOver(event) {
            event.preventDefault();
            this.dragText = "Release to Upload";
            this.isDragActive = true;
        },
        onDragLeave() {
            this.dragText = "Drag & Drop";
            this.isDragActive = false;
        },
        onDrop(event) {
            event.preventDefault();
            this.isDragActive = false;
            const file = event.dataTransfer.files[0];
            this.displayFile(file);
        },
        async displayFile(file) {
            const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
            if (validExtensions.includes(file.type)) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    this.imageSrc = fileReader.result;
                };
                fileReader.readAsDataURL(file);
                this.dragText = "Image Uploaded";
                this.isDragActive = false;
                console.log("Model started");
                console.log("Model Loading...");
                await this.predict(file);
            } else {
                alert("This file is not an Image");
                this.isDragActive = false;
            }
        },
        async predict(imageFile) {
            const modelURL = this.m_model + "model.json";
            const metadataURL = this.m_model + "metadata.json";

            const model = await tmImage.load(modelURL, metadataURL);
            const maxPredictions = model.getTotalClasses();

            const imageElement = document.createElement("img");
            imageElement.src = this.imageSrc;

            const prediction = await model.predict(imageElement, false);
            let maxProbability = -Infinity;
            let maxClassName = "";
            let maxName = "";
            let classid = 0;
            let ProbabilityCH = [];
            let NameCH = [];

            // find the maxValue
            for (let i = 0; i < maxPredictions; i++) {
                //const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(3);
                //console.log(classPrediction);

                const probabilityValue = prediction[i].probability;
                if (probabilityValue > maxProbability) {
                    maxProbability = probabilityValue;
                    maxClassName = prediction[i].className;
                    console.log("find the maxValue Working..");
                }
            }

            // convert max f_code to max f_name 
            for (let j = 0; j < this.f_name.length; j++) {
                const codename = maxClassName;
                if (codename === this.f_code[j]) {
                    //console.log(this.f_name[j]);
                    maxName = this.f_name[j];
                    console.log("convert max f_code to max f_name Working..");
                }
            }

            // convert f_code to f_name
            for (let j = 0; j < this.f_name.length; j++) {
                for (let k = 0; k < this.f_name.length; k++) {
                    if (prediction[j].className === this.f_code[k]) {
                        NameCH[j] = this.f_name[k];
                        ProbabilityCH[j] = prediction[j].probability.toFixed(3);
                        console.log("convert f_code to f_name Working..");
                    }
                }
            }
            // gen list 
            for (let j = 0; j < this.f_code.length; j++) {
                classid = j + 1;
                console.log("gen Num Working..");
            }

            this.list = classid
            this.FoodName = NameCH;
            this.Prediction = ProbabilityCH;
            this.maxClassName = maxName;
            this.maxProbability = maxProbability.toFixed(3);
        },
        deleteImage() {
            this.imageSrc = null;
            this.maxClassName = "";
            this.maxProbability = 0;
            console.log("delete Working..");
        },
    },
    mounted() {
        axios.get("http://localhost:3036/model")
            .then((response) => {
                // Assuming the response.data is an array of objects
                this.model = response.data;
                this.m_model = response.data.map((item) => item.m_model);
                console.log("import model completed");
            })
            .catch((error) => {
                console.error(error);
            });
        axios.get("http://localhost:3036/menu")
            .then((response) => {
                // Assuming the response.data is an array of objects
                this.menu = response.data;
                this.f_code = response.data.map((item) => item.f_code);
                this.f_name = response.data.map((item) => item.f_name);
                console.log("import menu completed");
            })
    }
};

</script>
<style></style>