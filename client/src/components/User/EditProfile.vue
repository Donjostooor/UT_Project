<template>
    <Loading />
    <div class="wrapper">
        <section class="section section-shaped section-lg">
            <div class="shape shape-style-1 bg-gradient-default">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container ">
                <div class="row justify-content-center ">
                    <div class="col-lg-10 re">
                        <div class="card bg-secondary shadow border-0">
                            <div class="card-body px-lg-5 py-lg-5">
                                <div class="text-center text-muted mb-4">
                                    <h3><strong>Edit Your Profile</strong></h3>
                                </div>
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
                                            <input v-model="formData.u_lastname" class="form-control" placeholder="LastName"
                                                type="text">
                                        </div>
                                    </div>
                                    <div class="form-group focused">
                                        <div class="input-group input-group-alternative mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                                            </div>
                                            <input v-model="formData.u_email" class="form-control" placeholder="Email"
                                                type="email">
                                        </div>
                                    </div>
                                    <div class="form-group focused">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="bi bi-unlock"></i></span>
                                            </div>
                                            <input v-model="formData.u_password" class="form-control" placeholder="Password"
                                                type="password">
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
                                                <option value=""> -- Select Your Gender -- </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group focused">
                                        <div class="input-group input-group-alternative">
                                            <select v-model="formData.u_location" class="form-select"
                                                aria-label="Default select example">
                                                <option value=""> -- Select Your Location -- </option>
                                                <option v-for="(location, index) in Location" :key="index"
                                                    :value="location">{{ location }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary my-4">Save Edit account</button>
                                    </div>
                                </form>
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
import Loading from '/src/view/Loading.vue';
import Footer from '/src/components/Nav/Footer.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';
import axios from 'axios';

export default {
    el: 'Register',

    components: {
        VueDatePicker,
        Loading,
        Footer,
    },
    data() {
        return {
            u_id: this.$store.state.auth.user.user.u_id,
            formData: {
                u_name: this.$store.state.auth.user.user.u_name,
                u_lastname: this.$store.state.auth.user.user.u_lastname,
                u_email: this.$store.state.auth.user.user.u_email,
                u_password: this.$store.state.auth.user.user.u_password,
                u_birthday: new Date(this.$store.state.auth.user.user.u_birthday),
                u_gender: this.$store.state.auth.user.user.u_gender,
                u_location: this.$store.state.auth.user.user.u_location,
                u_img: null,
            },
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
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.patch(`http://localhost:3036/user/update/${this.u_id}`, this.formData);
                if (response.status === 200) {
                    // Update was successful, you can show a success message or redirect
                    console.log('User updated successfully');
                    this.$router.push('/profile');
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },

    }, mounted() {
        axios.get(`http://localhost:3036/user/${this.u_id}`)
            .then((response) => {
                this.$store.state.auth.user.user.u_name = response.data.map((item) => item.u_name);
                this.$store.state.auth.user.user.u_lastname = response.data.map((item) => item.u_lastname);
                this.$store.state.auth.user.user.u_email = response.data.map((item) => item.u_email);
                this.$store.state.auth.user.user.u_password = response.data.map((item) => item.u_password);
                this.$store.state.auth.user.user.u_birthday = response.data.map((item) => item.u_birthday);
                this.$store.state.auth.user.user.u_gender = response.data.map((item) => item.u_gender);
                this.$store.state.auth.user.user.u_location = response.data.map((item) => item.u_location);
                console.log("import user completed");
            })
            .catch((error) => {
                console.error(error);
            });
    }
};


</script>
<style scoped>
.section {
    height: 120vh;
}
</style>