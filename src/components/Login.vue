<template>
  <div class="container">
    <div class="card">
      <h1 class="title">Login</h1>
      <b-form  @submit.prevent="onLogin">
        <b-form-group class="form"
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
        >
          <b-form-input class="form"
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Username is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="form"
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password is required
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
          class="button"
          >Login</b-button
        >
        <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Login failed: {{ form.submitError }}
      </b-alert>
        <div class="bottom">
            Don't have an account?<router-link to="register"> Register in here</router-link>
        </div>
      </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          "https://recipes-from-gramma.herokuapp.com/user/Login",
          {
            username: this.form.username,
            password: this.form.password
          },
          {withCredentials: true}
        );
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    }
  }
};
</script>

<style scoped>
.container {
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: italic;
  max-width: 400px;
  height: 700px;
  padding-top: 5%;
  align-content: center;
}
.title{
  margin-left: 40%;
  margin-bottom: 10px;
  text-shadow: 1px 1px 0px rgba(51, 51, 51, 0.295);
}

.form{
  margin-bottom: 15px;
}
.card{
height: 370px;
margin-top: auto;
margin-bottom: auto;
background-color: rgba(248, 248, 255, 0);
width: 370px;
border: none;
}

.bottom{
  margin-top: 5%;
  font-weight: bold;
}

.button{
  display:inline-block;
  width: 100%;
  background: #333;
  color: azure;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.671);
  border: none;
  font-size: 17px;
  margin-top:5px;
}

.button:hover{
  background: azure;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 0px rgba(51, 51, 51, 0.425);
}
</style>