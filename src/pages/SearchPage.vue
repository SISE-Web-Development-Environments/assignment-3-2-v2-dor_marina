<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form class="flex" @submit.prevent="onSearch">
      <b-form-group
        id="input-group-search"
        label-cols-sm="4"
        label="Search recipe:"
        label-for="Search"
      >
        <b-form-input
          id="keyword"
          v-model="$v.form.Keyword.$model"
          type="text"
          style="width:250px;"
          :state="validateState('Keyword')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Keyword is required
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        type="search"
        variant="primary"
        style="width:100px;height:40px"
        class="ml-5"
        >Register</b-button
      >
    </b-form>
  </div>
</template>


<script>
  import { required } from "vuelidate/lib/validators";
  export default {
    name: "Login",
    data() {
    return {
    form: {
      Keyword:"",
      submitError: undefined
    }
    };
  },
  validations: {
    form: {
      Keyword:{
       required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    }
  }
  }
</script>
<style lang="scss" scoped>
.flex {
    display: flex;
}
</style>