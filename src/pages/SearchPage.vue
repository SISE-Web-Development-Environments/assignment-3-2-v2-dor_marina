<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch">
      <div class="flex">
        <b-form-group
          id="input-group-search"
          label-cols-sm="2"
          label="Search recipe:"
          label-for="resultsNum"
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
          style="width:70px;height:35px"
          class="button"
          >Search</b-button>
      </div>
      <div class="flex">
        <b-form-group
          id="input-group-Results"
          label-cols-sm="6"
          label="Number of Results:"
          label-for="Results"
        >
          <b-form-select
            id="results"
            v-model="$v.form.resultsNum.$model"
            :options="resultsNumOptions"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-Cuisines"
          label-cols-sm="4"
          label="Cuisine:"
          label-for="Cuisine"
          style="margin-left:10px;"
        >
          <b-form-select
            id="cuisine"
            v-model="$v.form.cuisine.$model"
            :options="cuisines"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-diets"
          label-cols-sm="4"
          label="diet:"
          label-for="diet"
          style="margin-left:10px;"
        >
          <b-form-select
            id="diet"
            v-model="$v.form.diet.$model"
            :options="diets"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-Intolerances"
          label-cols-sm="6"
          label="Intolerance:"
          label-for="Intolerance"
          style="margin-left:10px;"
        >
          <b-form-select
            id="Intolerance"
            v-model="$v.form.Intolerance.$model"
            :options="Intolerances"
          ></b-form-select>
        </b-form-group>
      </div>
    </b-form>
    <div style="overflow:auto;">
      <b-row v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
    </div>
  </div>
</template>


<script>
  import RecipePreview from "C:/Users/dordo/עבודות_אוניברסיטה/סביבות פיתוח באינטרנט/3-3/assignment-3-2-v2-dor_marina/src/components/RecipePreview.vue";
  import cuisines from "../assets/cuisine.js"
  import diets from "../assets/diet.js"
  import Intolerances from "../assets/Intolerance.js"
  import { required } from "vuelidate/lib/validators";
  export default {
    name: "Login",
    components: {
    RecipePreview
   },
    data() {
    return {
    form: {
      Keyword:"",
      cuisine:null,
      resultsNum:null,
      diet:null,
      Intolerance:null,
      submitError: undefined
    },
    resultsNumOptions: ["5","10","15"],
    cuisines: [{ value: null, text: "", disabled: true }],
    diets: [{ value: null, text: "", disabled: true }],
    Intolerances: [{ value: null, text: "", disabled: true }],
    recipes:[]
    };
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.Intolerances.push(...Intolerances);
  },
  validations: {
    form: {
      Keyword:{
       required
      },
      resultsNum:{},
      cuisine:{},
      diet:{},
      Intolerance:{}
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try{
        let parameters={};
        if(this.form.resultsNum!=null){
          parameters.numOfRecipes=this.form.resultsNum;
        }
        if(this.form.cuisine!=null){
          parameters.cuisine=this.form.cuisine;
        }
        if(this.form.Intolerance!=null){
          parameters.intolerances=this.form.Intolerance;
        }
        if(this.form.diet!=null){
          parameters.diet=this.form.diet;
        }
        const response = await this.axios.get("https://recipes-from-gramma.herokuapp.com/recipe/search/query/"+this.form.Keyword,{
         params: parameters
        });
        this.recipes=[];
        this.recipes.push(...response.data.info_recipes);
      }catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch(){
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Search();
    }
  }
  }
</script>
<style lang="scss" scoped>
.flex {
    display: flex;
}
.container {
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: italic;
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
.bottom{
  margin-top: 5%;
  font-weight: bold;
}

.button{
  display:inline-block;
  position: relative;
  width: 100%;
  background: #333;
  color: azure;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.671);
  border: none;
  font-size: 17px;
  margin-top:2px;
  margin-left:445px;
}

.button:hover{
  background: azure;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 0px rgba(51, 51, 51, 0.425);
}
</style>