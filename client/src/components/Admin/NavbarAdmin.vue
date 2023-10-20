<template>
    <nav class="navbar navbar-expand-md the-blur nav-head" aria-label="Eighth navbar example">
        <div class="container">
            <div  class="collapse navbar-collapse nav-btn" id="navbarsExample07">
                <div class="col-3 nav-btn">
                    <div class="p-2">
                        <router-link to="/profile">
                            <h5 v-for="(admin, index) in admin" :key="index"> 
                            <strong>Admin ID : </strong>{{ admin.admin_id }}&nbsp;&nbsp;|&nbsp; <strong>Username : </strong>{{ admin.admin_name }} 
                        </h5></router-link>
                    </div>
                    <div >
                        <a class="nav-link" @click.prevent="logOut">
                        <button  class="btn btn-danger" type="button">LogOut</button>
                    </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import axios from 'axios';

export default {
    name: 'NavigationAdmin',
    data() {
        return {
            admin: [],
        }
    },
    computed: {
        cerrentAdminID() {
            return this.$store.state.auth.user.admin.admin_id;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        }
    },
    mounted() {
        axios.get("http://localhost:3036/admin/" + this.cerrentAdminID)
            .then((response) => {
                if (response.data.length > 0) {
                    this.admin = response.data;
                    console.log("HTTP request admin completed");
                    console.log(this.cerrentAdminID);
                    console.log(this.admin );
                } else {
                    console.error("No predict data found for the user");
                    console.log(this.cerrentAdminID);
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }
};
</script>

<style scoped>
.nav-head {
    margin-left: -30px;
    z-index: 999;
}
.the-blur {
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 50px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255);
}

.navbar {
    height: 80px;
}

.nav-btn {
    padding: 10px 10px 0px 10px;
    display: flex;
    justify-content: end;
}
</style>