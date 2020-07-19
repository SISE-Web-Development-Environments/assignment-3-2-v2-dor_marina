<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group id="input-group-username" label-cols-sm="3" label="Username:" label-for="username" description="Username must be 3-8 characters long and contain only letters.">
        <b-form-input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must contain only letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-firstName" label-cols-sm="3" label="First Name:" label-for="firstName">
        <b-form-input id="firstname" v-model="$v.form.firstName.$model" type="text" :state="validateState('firstName')" placeholder="Joey"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-lastName" label-cols-sm="3" label="Last Name:" label-for="lastName">
        <b-form-input id="lastname" v-model="$v.form.lastName.$model" type="text" :state="validateState('lastName')" placeholder="Tribbiani"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-country" label-cols-sm="3" label="Country:" label-for="country">
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
        description="Password should be 5-10 characters long and contain at least one number and one special character."
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
              v-if="!$v.form.password.special"
            >Your password should have at least one number and one special character</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-email" label-for="email" label="Email address:" description="We'll never share your email with anyone else." label-cols-sm="3">
            <b-form-input
              id="email"
              v-model="$v.form.email.$model"
              type="email"
              :state="validateState('email')"
              placeholder="joey@iLikeFood.com"
              
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.email.required">Email is required</b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.email.email">Email must be valid</b-form-invalid-feedback>
          </b-form-group>

      <b-form-group id="input-group-Image" label-for="image" label-cols-sm="3" label="Image url:">
            <b-form-input
              id="image"
              type="text"
              placeholder="Enter image url"
              v-model="$v.form.image.$model"
              :state="validateState('image')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.image.url">Please enter a valid url</b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.image.required">Image is required</b-form-invalid-feedback>
          </b-form-group>

      <b-button type="reset" variant="dark">Reset</b-button>
      <b-button
        type="submit"
        variant="info"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="bottom">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        image: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        special: u =>
          new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])").test(u)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      },
       image: {
         required,
         url
       }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/user/Register",
          {
            username: this.form.username,
            password: this.form.password,
            FirstName: this.form.firstName,
            LastName: this.form.lastName,
            Email: this.form.email,
            Country: this.form.country,
            image: this.form.image
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response.data.message);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
         username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        image: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: italic;
  max-width: 600px;
  height: 800px;
  padding-top: 5%;
  align-content: center;
}
.bottom{
  margin-top: 5%;
  font-weight: bold;
}
.title{
  margin-left: 40%;
  margin-bottom: 10px;
  text-shadow: 1px 1px 0px rgba(51, 51, 51, 0.295);
}

.form{
  margin-bottom: 15px;
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
