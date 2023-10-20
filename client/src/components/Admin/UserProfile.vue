<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-between">
            <h1 class="display-1">UserProfile</h1>
            <div class="col-4 d-flex card-body">
                <div class="col-12 card card-1">
                    <router-link to="">
                        <h4><strong>All User :</strong></h4>
                        <h1 class="card-text"><strong>{{ user.length }}</strong></h1>
                    </router-link>
                </div>
            </div>
        </div>
        <br>
        <div class="col-12 card-body">
            <h1 class="display-4">กราฟแบ่งประเภทแสดงข้อมูลผู้ใช้</h1>
            <!--btn tabs-->
            <div class="col-12 ">
                <div class="nav-wrapper">
                    <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab"
                                href="#tabs-icons-text-4" role="tab" aria-controls="tabs-icons-text-2"
                                aria-selected="false"><i
                                    class="bi bi-cup-hot-fill"></i>&nbsp;&nbsp;&nbsp;<strong>ช่วงอายุผู้ใช้</strong></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mb-sm-3 mb-md-0 " id="tabs-icons-text-2-tab" data-toggle="tab"
                                href="#tabs-icons-text-5" role="tab" aria-controls="tabs-icons-text-1"
                                aria-selected="true"><i
                                    class="bi bi-graph-up-arrow"></i>&nbsp;&nbsp;&nbsp;<strong>เพศผู้ใช้</strong></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab"
                                href="#tabs-icons-text-6" role="tab" aria-controls="tabs-icons-text-3"
                                aria-selected="false"><i
                                    class="bi bi-geo-alt-fill"></i>&nbsp;&nbsp;&nbsp;<strong>ที่อยู่ผู้ใช้</strong></a>
                        </li>
                    </ul>
                </div>
                <div class="card shadow tab-size">
                    <div class="card-body ">
                        <div class="tab-content " id="myTabContent">
                            <div class="tab-pane fade show active" id="tabs-icons-text-4" role="tabpanel"
                                aria-labelledby="tabs-icons-text-2-tab">
                                <div class="col-12 chart-size-2 d-flex justify-content-center">
                                    <ChartAge />
                                </div>
                            </div>

                            <div class="tab-pane fade" id="tabs-icons-text-5" role="tabpanel"
                                aria-labelledby="tabs-icons-text-1-tab">
                                <div class="col-12 chart-size-1 d-flex justify-content-center">
                                    <ChartGender />
                                </div>
                            </div>

                            <div class="tab-pane fade" id="tabs-icons-text-6" role="tabpanel"
                                aria-labelledby="tabs-icons-text-3-tab">
                                <div class="col-12 chart-size-3 d-flex justify-content-center">
                                    <ChartLocation />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><br>
        <div class="col-12 card-body">
            <h1 class="display-4">ตารางแสดงผู้ใช้ทั้งหมด</h1>
            <br>
            <div class="col-12 d-flex">
                <div class="col-1">
                    <h5><strong>ID</strong></h5>
                </div>
                <div class="col-2">
                    <h5><strong>Email</strong></h5>
                </div>
                <div class="col-3 text-center">
                    <h5><strong>Name - LastName</strong></h5>
                </div>
                <div class="col-1">
                    <h5><strong>Gender</strong></h5>
                </div>
                <div class="col-2 text-center">
                    <h5><strong>Location</strong></h5>
                </div>
                <div class="col-2 text-center">
                    <h5><strong>FX</strong></h5>
                </div>
            </div><br>
            <div class="col-12 d-flex" v-for="(user, index) in user.slice(0, 60).reverse()" :key="index">
                <div class="col-1">
                    <h6>{{ user.u_id }}</h6>
                </div>
                <div class="col-2">
                    <h6>{{ user.u_email }}</h6>
                </div>
                <div class="col-3 text-center">
                    <h6>{{ user.u_name }}&nbsp;{{ user.u_lastname }}</h6>
                </div>
                <div class="col-1">
                    <h6>{{ user.u_gender }}</h6>
                </div>
                <div class="col-2 text-center">
                    <h6>{{ user.u_location }}</h6>
                </div>
                <div class="col-2 d-flex btn-pro text-center">
                    <div>
                        <button type="button" class="btn-pro-body btn btn-default" data-bs-toggle="modal"
                            data-bs-target="#Change2" @click="showModel(user.u_id)">Change</button>
                    </div>
                    <div>
                        <button type="button" class="btn-pro-body btn btn-danger" data-bs-toggle="modal"
                            data-bs-target="#del2" @click="showConfirmation(user.u_id, index)">Delete</button>
                    </div>
                </div>
            </div>
        </div><br><br>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="Change2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Edit User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container ">
                        <div class="row justify-content-center ">
                            <div class="col-lg-10 re">
                                <div class=" border-0">
                                    <div class=" px-lg-5 py-lg-5">
                                        <form @submit.prevent="submitForm">
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i
                                                                class="bi bi-caret-right-square"></i></span>
                                                    </div>
                                                    <input v-model="formData.u_name" class="form-control" placeholder="Name"
                                                        type="text">
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i
                                                                class="bi bi-caret-right-square"></i></span>
                                                    </div>
                                                    <input v-model="formData.u_lastname" class="form-control"
                                                        placeholder="LastName" type="text">
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                                                    </div>
                                                    <input v-model="formData.u_email" class="form-control"
                                                        placeholder="Email" type="email">
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="bi bi-unlock"></i></span>
                                                    </div>
                                                    <input v-model="formData.u_password" class="form-control"
                                                        placeholder="Password" type="password">
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative">
                                                    <VueDatePicker v-model="formData.u_birthday"
                                                        placeholder="Select Your Birthday" />
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative" placeholder="">
                                                    <select v-model="formData.u_gender" class="form-select"
                                                        aria-label="Default select example">
                                                        <option value="{{formData.u_gender}}"> -- Select Your Gender --
                                                        </option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative">
                                                    <select v-model="formData.u_location" class="form-select"
                                                        aria-label="Default select example">
                                                        <option value="{{formData.u_location}}"> -- Select Your Location --
                                                        </option>
                                                        <option v-for="(location, index) in Location" :key="index"
                                                            :value="location">{{ location }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="text-center">
                                                <button type="submit" class="btn btn-primary my-4"
                                                    data-bs-dismiss="modal">Save Edit
                                                    account</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="del2" tabindex="-1" aria-labelledby="del" aria-hidden="true">
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
</template>
<script>
import axios from 'axios';
import ChartGender from './ChartGender.vue';
import ChartAge from './ChartAge.vue';
import ChartLocation from './ChartLocation.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

export default {
    name: 'UserProfile',
    components: {
        VueDatePicker,
        ChartGender,
        ChartAge,
        ChartLocation
    },
    data() {
        return {
            user: [],
            au_id: '',
            formData: {
                u_name: '',
                u_lastname: '',
                u_email: '',
                u_password: '',
                u_birthday: '',
                u_gender: '',
                u_location: '',
                u_img: null,
            },
            isConfirmationVisible: false,
            selectedItemToDelete: null,
            selectedItemIndex: null,
            date: ref(new Date()),
            Location: [
                'เชียงราย Chiang Rai |  Thailand',
                'เชียงใหม่ Chiang Mai |  Thailand',
                'น่าน Nan |  Thailand',
                'พะเยา Phayao |  Thailand',
                'แพร่ Phrae |  Thailand',
                'แม่ฮ่องสอน Mae Hong Son |  Thailand',
                'ลำปาง Lampang |  Thailand',
                'ลำพูน Lamphun |  Thailand',
                'อุตรดิตถ์ Uttaradit |  Thailand',
                'กาฬสินธุ์ Kalasin |  Thailand',
                'ขอนแก่น Khon Kaen |  Thailand',
                'ชัยภูมิ Chaiyaphum |  Thailand',
                'นครพนม Nakhon Phanom |  Thailand',
                'นครราชสีมา Nakhon Ratchasima |  Thailand',
                'บึงกาฬ Bueng Kan |  Thailand',
                'บุรีรัมย์ Buri Ram |  Thailand',
                'มหาสารคาม Maha Sarakham |  Thailand',
                'มุกดาหาร Mukdahan |  Thailand',
                'ยโสธร Yasothon |  Thailand',
                'ร้อยเอ็ด Roi Et |  Thailand',
                'เลย Loei |  Thailand',
                'ศรีสะเกษ Si Sa Ket |  Thailand',
                'สกลนคร Sakon Nakhon |  Thailand',
                'สุรินทร์ Surin |  Thailand',
                'หนองคาย Nong Khai |  Thailand',
                'หนองบัวลำภู Nong Bua Lam Phu |  Thailand',
                'อุดรธานี Udon Thani |  Thailand',
                'อุบลราชธานี Ubon Ratchathani |  Thailand',
                'อำนาจเจริญ Amnat Charoen |  Thailand',
                'กรุงเทพมหานคร Bangkok |  Thailand',
                'กำแพงเพชร Kamphaeng Phet |  Thailand',
                'ชัยนาท Chai Nat |  Thailand',
                'นครนายก Nakhon Nayok |  Thailand',
                'นครปฐม Nakhon Pathom |  Thailand',
                'นครสวรรค์ Nakhon Sawan |  Thailand',
                'นนทบุรี Nonthaburi |  Thailand',
                'ปทุมธานี Pathum Thani |  Thailand',
                'พระนครศรีอยุธยา Phra Nakhon Si Ayutthaya |  Thailand',
                'พิจิตร Phichit |  Thailand',
                'พิษณุโลก Phitsanulok |  Thailand',
                'เพชรบูรณ์ Phetchabun |  Thailand',
                'ลพบุรี Lop Buri |  Thailand',
                'สมุทรปราการ Samut Prakan |  Thailand',
                'สมุทรสงคราม Samut Songkhram |  Thailand',
                'สมุทรสาคร Samut Sakhon |  Thailand',
                'สระบุรี Saraburi |  Thailand',
                'สิงห์บุรี Sing Buri |  Thailand',
                'สุโขทัย Sukhothai |  Thailand',
                'สุพรรณบุรี Suphan Buri |  Thailand',
                'อ่างทอง Ang Thong |  Thailand',
                'อุทัยธานี Uthai Thani |  Thailand',
                'จันทบุรี Chanthaburi |  Thailand',
                'ฉะเชิงเทรา Chachoengsao |  Thailand',
                'ชลบุรี Chon Buri |  Thailand',
                'ตราด Trat |  Thailand',
                'ปราจีนบุรี Prachin Buri |  Thailand',
                'ระยอง Rayong |  Thailand',
                'สระแก้ว Sa Kaeo |  Thailand',
                'กาญจนบุรี Kanchanaburi |  Thailand',
                'ตาก Tak |  Thailand',
                'ประจวบคีรีขันธ์ Prachuap Khiri Khan |  Thailand',
                'เพชรบุรี Phetchaburi |  Thailand',
                'ราชบุรี Ratchaburi |  Thailand',
                'กระบี่ Krabi |  Thailand',
                'ชุมพร Chumphon |  Thailand',
                'ตรัง Trang |  Thailand',
                'นครศรีธรรมราช Nakhon Si Thammarat |  Thailand',
                'นราธิวาส Narathiwat |  Thailand',
                'ปัตตานี Pattani |  Thailand',
                'พังงา Phangnga |  Thailand',
                'พัทลุง Phatthalung |  Thailand',
                'ภูเก็ต Phuket |  Thailand',
                'ยะลา Yala |  Thailand',
                'ระนอง Ranong |  Thailand',
                'สตูล Satun |  Thailand',
                'สงขลา Songkhla |  Thailand',
                'สุราษฎร์ธานี Surat Thani |  Thailand',
            ],
        }
    },
    methods: {
        showModel(itemId) {
            this.au_id = itemId;
            axios.get(`http://localhost:3036/user/${this.au_id}`)
                .then((response) => {
                    this.formData.u_name = response.data.map((item) => item.u_name);
                    this.formData.u_lastname = response.data.map((item) => item.u_lastname);
                    this.formData.u_email = response.data.map((item) => item.u_email);
                    this.formData.u_password = response.data.map((item) => item.u_password);
                    this.formData.u_birthday = new Date(response.data.map((item) => item.u_birthday));
                    this.formData.u_gender = response.data.map((item) => item.u_gender);
                    this.formData.u_location = response.data.map((item) => item.u_location);
                    console.log('User get updated');

                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });

        },
        submitForm() {
            // Assuming you have the user's ID available in your component
            const userId = this.au_id;

            // Prepare the data to be sent to the server
            const userData = {
                u_name: this.formData.u_name,
                u_lastname: this.formData.u_lastname,
                u_email: this.formData.u_email,
                u_password: this.formData.u_password,
                u_birthday: this.formData.u_birthday,
                u_gender: this.formData.u_gender,
                u_location: this.formData.u_location,
                u_img: this.formData.u_img,
            };

            // Make a PATCH request to update the user
            axios
                .patch(`http://localhost:3036/user/update/${userId}`, userData)
                .then((response) => {
                    // Handle the response from the server if needed
                    console.log('User updated successfully', response.data);
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
                })
                .catch((error) => {
                    // Handle any errors that occurred during the request
                    console.error('Error updating user', error);
                });
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
                .delete(`http://localhost:3036/user/delete/${itemId}`)
                .then((response) => {
                    if (response.data.length > 0) {
                        console.error("No predict data found for the user");
                    } else {
                        // อัปเดต Allpredict โดยลบรายการที่ถูกลบออก
                        this.user.splice(index, 1);
                        console.log("Item deleted successfully");
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
                    }
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
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
    }

}
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
    font-size: 60px;
    padding-bottom: 3vh;
    padding-right: 3vh;
    text-align: right;
}

.card-1 {
    background-color: rgba(0, 255, 150, 0.2);
}

.tab-size {
    height: 600px;
}

.chart-size-1 {
    padding-top: 2vh;
    max-height: 500px;
}

.chart-size-2 {
    padding-top: 5vh;
    max-height: 500px;
}

.chart-size-3 {
    padding-top: 5vh;
    max-height: 1000px;
}

.btn-pro {
    width: 50px;
    text-align: center;
}

.btn-pro-body {
    text-align: center;
}
</style>