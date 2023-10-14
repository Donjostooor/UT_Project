<template>
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
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-7">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div class="card bg-secondary shadow border-0">
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <h3><strong>Log-in</strong></h3>
              </div>
              <form name="form" @submit.prevent="handleLogin">
                <div class="form-group focused">
                  <div class="input-group input-group-alternative mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                    </div>
                    <input v-model="user.u_email" type="text" class="form-control" name="email" placeholder="Email" />
                    <div v-if="errors" class="alert alert-danger" role="alert">{{ errors.first('email') }}</div>
                  </div>
                </div>
                <div class="form-group focused">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="bi bi-unlock"></i></span>
                    </div>
                    <input v-model="user.u_password" type="password" class="form-control" name="password"
                      placeholder="Password" />
                    <div v-if="errors" class="alert alert-danger" role="alert">{{ errors.first('password') }}</div>
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary my-4">Log-in</button>
                  <router-link to="/register"><button type="button"
                      class="btn btn-primary my-4">Register</button></router-link>
                </div>
                <div class="form-group">
                  <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        u_email: '',
        u_password: ''
      },
      loading: false,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/');
        console.log("Login")
      }
    },
  },
  methods: {
    handleLogin() {
      this.loading = true;

      if (this.user.u_email && this.user.u_password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/');
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
        console.log('Good');
      } else {
        console.log('Bad');
      }
      console.log(this.user);
    }
  },
};
</script>


<style>
.section {
  height: 100vh;
}
</style>