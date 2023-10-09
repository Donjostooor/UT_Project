<template>
    <div class="container">
        <div class="row">
            <!-- Pick Your images-->
            <div class="col-12">
                <div class="col-12" data-aos="zoom-out">
                    <h5><strong>Upload your File :</strong></h5>
                </div>
                <div class="drag-area" :class="{ active: isDragActive }" @dragover.prevent="onDragOver"
                    @dragleave="onDragLeave" @drop="onDrop" data-aos="zoom-out">
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
                    <button v-if="imageSrc" class="btn btn-primary" type="button" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" @click="onShowAllValue">All Value
                        Prediction</button>
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
                            <h5><strong></strong></h5>
                        </div>
                        <div class="col-7">
                            <h5 v-if="showOption === false"><strong>{{ maxClassName }}</strong></h5>
                            <select v-if="showOption === true" id="option-Fname" name="option-Fname"
                                class="form-select form-select" aria-label=".form-select-lg example"
                                @change="onOptionChange($event)">
                                <option :value="maxClassName" selected>{{ maxClassName }}</option>
                                <option v-for="(foodName, index) in FoodName" :key="index" :value="foodName">{{ foodName }}
                                </option>
                            </select>
                        </div>
                        <div class="col-4">
                            <h5>&nbsp;<strong>{{ maxProbability * 100 }}</strong></h5>
                        </div>
                    </div>
                </div>
                <div v-if="imageSrc" class="col-12 sc-result-footer">
                    <div class="col-12 d-flex justify-content-center">
                        <hr class="" color="blue" width="90%" style="border-width: 3px;">
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <button class="btn btn-success" type="button" data-bs-toggle="modal"
                            data-bs-target="#CarbonValue">Correct,start calculating.</button>
                        <button class="btn btn-danger" type="button" @click="onShowOption">No, picture is
                            incorrect.</button>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Table of Prediction</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    @click="onCloseAllValue"></button>
                            </div>
                            <div class="modal-body">
                                <!-- Show Table Prediction -->
                                <div>
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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                    @click="onCloseAllValue">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Show Result Your image -->
            <!-- Popup Result CarbonValue -->
            <div class="modal fade" id="CarbonValue" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
                tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalToggleLabel">&nbsp;&nbsp;<strong>Result</strong></h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12 ">
                                        <!-- image,foodname,prediction,carbonvalue -->
                                        <div class="col-12 d-flex justify-content-center">
                                            <!-- image,foodname -->
                                            <div class="col-8">
                                                <!-- image -->
                                                <div class="col-12 text-center">
                                                    <img class="img-scan" :src="imageSrc" alt="Uploaded Image"  />
                                                </div>
                                                <!-- foodname -->
                                                <div class="col-12 text-center">
                                                    <h5><strong>{{ maxClassName }}</strong></h5>
                                                </div>
                                            </div>
                                            <!-- prediction,carbonvalue -->
                                            <div class="col-4">
                                                <!-- prediction -->
                                                <div class="col-12 ">
                                                    <div class="col-12">
                                                        <p>Predict</p>
                                                    </div>
                                                    <div class="col-12">
                                                        <h1><strong>{{ maxProbability * 100 }} %</strong></h1>
                                                    </div>
                                                </div>
                                                <!-- carbonvalue -->
                                                <div class="col-12">
                                                    <div class="col-12">
                                                        <p>CarbonFootPrint Value<sub>(cfp)</sub></p>
                                                    </div>
                                                    <div class="col-12">
                                                        <h1><strong>{{ from.pd_carbon }}</strong></h1>
                                                    </div>
                                                    <div class="col-12">
                                                        <p>KgCO<sub>2</sub>e</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="col-12 d-flex justify-content-center">
                                                <hr class="" color="blue" width="90%" style="border-width: 3px;">
                                            </div>
                                        </div>
                                        <!-- year,date,time,btn -->
                                        <div class="col-12">
                                            <!-- year,date,time -->
                                            <div class="col-12 d-flex justify-content-center">
                                                <!-- year -->
                                                <!-- date -->
                                                <!-- time -->
                                            </div>
                                            <!-- btn -->
                                            <div class="col-12 d-flex justify-content-center">
                                                <button type="button" class="col-5 btn btn-success" data-bs-target="#SaveSuccess" data-bs-toggle="modal" data-bs-dismiss="modal" @click="onSetupFrom">Save</button>
                                                <div class="col-1">&nbsp;</div>
                                                <button type="button" class="col-5 btn btn-secondary"
                                                    data-bs-dismiss="modal" @click="onCloseAllValue">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="SaveSuccess" aria-hidden="true" aria-labelledby="SaveSuccess"
                tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="SaveSuccess"><strong>Result</strong></h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h4>Your results in this list are now saved in your account.</h4>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- EndPopup Result Carbonfootprint -->
            <!-- About Support -->
            <div v-if="imageSrc" class="col-12 d-flex justify-content-center ">
                <span class="support-by">power by Teachable machine</span>
            </div>
            <div class="col-12 btn-sc-back d-flex justify-content-center">
                <div class="col-6">
                    <router-link to="/"><button class="btn btn-default btn-block" type="button">Back to
                            Home</button></router-link>
                </div>
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
            //in post
            from: {
                pd_userid: 1,
                pd_name: "",
                pd_code: "",
                pd_carbon: 0,
                pd_predict: 0,
                pd_year: new Date().getFullYear(),
                pd_date: new Date().toISOString().split('T')[0],
                pd_time: new Date().toLocaleTimeString(),
                pd_img: null,
            },
            //in Process
            isDragActive: false,
            dragText: "Drag & Drop",
            imageSrc: null,
            maxClassName: "",
            maxProbability: 0,
            // axios get data
            m_model: [],
            f_code: [],
            f_name: [],
            f_carbon: [],
            ///show value
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
        onCloseOption(event) {
            event.preventDefault();
            this.showOption = false
            console.log("CloseOption Working..");
        },
        onOptionChange(event) {
            const Fname = event.target.value;
            let optionPD = 0;
            let optionN = "";
            console.log(event.target.value);
            // convert f_code to f_name
            for (let j = 0; j < this.f_name.length; j++) {
                if (Fname === this.FoodName[j]) {
                    optionN = this.FoodName[j]
                    optionPD = this.Prediction[j]
                    console.log("OptionChange Working..");
                    /*console.log(Fname);
                    console.log(this.FoodName[j]);
                    console.log(optionPD);*/
                }
            }
            this.maxProbability = optionPD;
            this.maxClassName = optionN
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
        async deleteImage(event) {
            this.imageSrc = null;
            this.maxClassName = "";
            this.maxProbability = 0;
            await this.onCloseOption(event);
            console.log("delete Working..");
        },
        async onSetupFrom(event) {
            //set pd_carbon
            let pd_carbon = 0;
            for (let j = 0; j < this.f_code.length; j++) {
                for (let i = 0; i < this.f_name.length; i++) {
                    if (this.maxClassName === this.f_name[i]) {
                        pd_carbon = this.f_carbon[i];
                        break; // Exit the loop once a match is found
                    }
                }
            }
            console.log("pd_carbon:", pd_carbon);

            this.from.pd_userid = 1;
            this.from.pd_name = this.maxClassName;
            this.from.pd_code = this.f_code[this.FoodName.indexOf(this.maxClassName)];
            this.from.pd_carbon = pd_carbon;
            this.from.pd_predict = parseFloat(this.maxProbability) * 100;

            await this.onSubmitPrediction(event);
        },

        onSubmitPrediction() {
            axios.post('http://localhost:3036/predict/new_value', this.from)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
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
                this.f_carbon = response.data.map((item) => item.f_carbon);

                console.log("import menu completed");
            })
    }
};

</script>
<style></style>