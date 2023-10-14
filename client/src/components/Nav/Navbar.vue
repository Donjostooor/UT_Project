<template>
    <nav class="navbar navbar-expand-md fixed-top the-blur " data-aos="zoom-out" data-aos-delay="1700"
        aria-label="Eighth navbar example">
        <div class="container">
            <router-link to="/"><img class="logo" src="/src/assets/logo.png" alt="loading..." /></router-link>
        </div>
        <div class="container">
            <div  class="collapse navbar-collapse nav-btn" id="navbarsExample07">
                <div v-if="!currentUser" class="col-3 nav-btn">
                    <a href="/login">
                        <p>Log-in</p>
                    </a>
                    <a href="/register">
                        <p>Register</p>
                    </a>
                </div>
                <div v-if="currentUser" class="col-3 nav-btn">
                    <div class="p-2">
                        <router-link to="/profile"><p> Username : {{ currentUser.user.u_name }} {{ currentUser.user.u_lastname }} </p></router-link>
                    </div>
                    <div>
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
export default {
    name: 'Navigation',
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        }
    }
};
</script>

<style>
.the-blur {
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 50px;
    margin-bottom: 20px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
}

.navbar {
    height: 80px;
}

.logo {
    padding-bottom: 10px;
    width: 100%;
    height: 100px;
}

.nav-btn {
    padding: 10px 10px 0px 10px;
    display: flex;
    justify-content: end;
}
</style>