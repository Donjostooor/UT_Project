<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-between">
            <h1 class="display-1">ListMenu</h1>
            <div class="col-4 d-flex card-body">
                <div class="col-12 card card-1">
                    <router-link to="">
                        <h4><strong>All Menu :</strong></h4>
                        <h1 class="card-text"><strong>{{ menu.length }}</strong></h1>
                    </router-link>
                </div>
            </div>
        </div>
        <br>
        <div class="col-12 card-body">
                <h1 class="display-4">ตารางแสดงข้อมูลอาหารทั้งหมด</h1>
            <br>
            <div class="col-12 d-flex">
                <div class="col-1">
                    <h5><strong>ID</strong></h5>
                </div>
                <div class="col-1 text-center">
                    <h5><strong>Code</strong></h5>
                </div>
                <div class="col-3 text-center">
                    <h5><strong>FoodName</strong></h5>
                </div>
                <div class="col-1 text-center">
                    <h5><strong>Carbon</strong></h5>
                </div>
                <div class="col-3 text-center">
                    <h5><strong>Image</strong></h5>
                </div>
                <div class="col-2 text-center">
                    <h5><strong></strong></h5>
                </div>
            </div><br>
            <div class="col-12 d-flex" v-for="(menu, index) in menu.slice(0, 60).reverse()" :key="index">
                <div class="col-1">
                    <h6>{{ menu.f_id }}</h6>
                </div>
                <div class="col-1 text-center">
                    <h6>{{ menu.f_code }}</h6>
                </div>
                <div class="col-3 text-center">
                    <h6>{{ menu.f_name }}</h6>
                </div>
                <div class="col-1 text-center">
                    <h6>{{ menu.f_carbon }}</h6>
                </div>
                <div class="col-3 text-center">
                    <img class="img-scan" :src="menu.f_img" alt="Uploaded Image" />
                </div>
                <div class="col-2 d-flex btn-pro text-center">
                    <div>
                        <button type="button" class="btn-pro-body btn btn-default" data-bs-toggle="modal"
                            data-bs-target="#Change3" @click="showModel(menu.f_code)">Change</button>
                    </div>
                    <div>
                        <button type="button" class="btn-pro-body btn btn-danger" data-bs-toggle="modal"
                            data-bs-target="#del3" @click="showConfirmation(menu.f_code, index)">Delete</button>
                    </div>
                </div>
            </div>
        </div><br><br>
    </div>
    <!-- Modal Edit menu-->
    <div class="modal fade" id="Change3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Edit Menu</h5>
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
                                                    <input v-model="fromData.f_name" class="form-control"
                                                        placeholder="FoodName" type="text">
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i
                                                                class="bi bi-caret-right-square"></i></span>
                                                    </div>
                                                    <input v-model="fromData.f_carbon" class="form-control"
                                                        placeholder="FoodCarbon" type="text">
                                                </div>
                                            </div>
                                            <div class="form-group focused">
                                                <div class="input-group input-group-alternative mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i
                                                                class="bi bi-caret-right-square"></i></span>
                                                    </div>
                                                    <input v-model="fromData.f_img" class="form-control"
                                                        placeholder="FoodImage" type="text">
                                                </div>
                                            </div>

                                            <div class="text-center">
                                                <button type="submit" class="btn btn-primary my-4"
                                                    data-bs-dismiss="modal">Save Edit
                                                    Menu</button>
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
    <div class="modal fade" id="del3" tabindex="-1" aria-labelledby="del" aria-hidden="true">
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
export default {
    name: 'ListMenu',
    data() {
        return {
            menu: [],
            m_code: '',
            from: {
                f_code: '',
                f_name: '',
                f_carbon: '',
                f_img: null,
                f_materia: '',
            },
            fromData: {
                f_name: '',
                f_carbon: 0,
                f_img: '',
                f_materia: null,
            },
            //in Process
            isDragActive: false,
            dragText: "Drag & Drop",
            isConfirmationVisible: false,
            selectedItemToDelete: null,
            selectedItemIndex: null,
        }
    },
    methods: {
        showModel(itemId) {
            this.m_code = itemId;
            console.log(this.m_code);
            axios.get(`http://localhost:3036/menu/${this.m_code}`)
                .then((response) => {
                    console.log(response.data);
                    this.fromData.f_name = response.data.map((item) => item.f_name);
                    this.fromData.f_carbon = response.data.map((item) => item.f_carbon);
                    this.fromData.f_img = response.data.map((item) => item.f_img);
                    console.log('get data updated');
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        },
        submitForm() {
            // Assuming you have the user's ID available in your component
            const menuCode = this.m_code;

            // Prepare the data to be sent to the server
            const menuData = {
                f_name: this.fromData.f_name,
                f_carbon: this.fromData.f_carbon,
                f_img: this.fromData.f_img,
            };

            // Make a PATCH request to update the user
            axios.patch(`http://localhost:3036/menu/update/${menuCode}`, menuData)
                .then((response) => {
                    // Handle the response from the server if needed
                    console.log('Menu item updated successfully', response.data);

                    // Update your component's data with the updated menu data
                    axios.get("http://localhost:3036/menu")
                        .then((response) => {
                            if (response.data.length > 0) {
                                this.menu = response.data;
                                console.log("HTTP request completed");
                            } else {
                                console.error("No menu data found");
                            }
                        })
                        .catch((error) => {
                            console.error("An error occurred:", error);
                        });
                })
                .catch((error) => {
                    // Handle any errors that occurred during the request
                    console.error('Error updating menu item', error);
                });
        },
        submitFormAdd() {
            // Create a FormData object to send the image file to the server
            const formData = new FormData();
            formData.append('f_code', this.from.f_code);
            formData.append('f_name', this.from.f_name);
            formData.append('f_carbon', this.from.f_carbon);
            formData.append('f_img', this.from.f_img);

            // Make a POST request to the server to handle the file upload
            axios
                .post('http://localhost:3036/menu/new_menu', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type for file uploads
                    },
                })
                .then((response) => {
                    // Handle the response from the server if needed
                    console.log('Add Menu item successfully', response.data);

                    // Update your component's data with the updated menu data
                    axios.get("http://localhost:3036/menu")
                        .then((response) => {
                            if (response.data.length > 0) {
                                this.menu = response.data;
                                console.log("HTTP request completed");
                            } else {
                                console.error("No menu data found");
                            }
                        })
                        .catch((error) => {
                            console.error("An error occurred:", error);
                        });
                })
                .catch((error) => {
                    // Handle any errors that occurred during the request
                    console.error('Error adding menu item', error);
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
                .delete(`http://localhost:3036/menu/delete/${itemId}`)
                .then((response) => {
                    if (response.data.length > 0) {
                        console.error("No predict data found for the user");
                    } else {
                        // อัปเดต menu โดยลบรายการที่ถูกลบออก
                        this.menu.splice(index, 1);
                        console.log("Item deleted successfully");
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
                    }
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        },
    },
    mounted() {
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
    background-color: rgba(255, 153, 0, 0.2);
}

.img-size {
    height: 250px;
}

.img-size-body {
    height: 200px;
}
</style>