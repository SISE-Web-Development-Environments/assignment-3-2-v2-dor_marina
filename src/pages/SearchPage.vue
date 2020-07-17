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
          style="width:70px;height:35px;"
          class="button"
          >Search</b-button>
      </div>
      <div>
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-Results"
              label-cols-sm="4"
              label="Number of Results:"
              label-for="Results"
            >
              <multiselect
                id="results"
                v-model="$v.form.resultsNum.$model"
                :options="resultsNumOptions"
                :multiple="false"
                :show-labels="false" placeholder="Select option"
              ></multiselect>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-Cuisines"
              label-cols-sm="4"
              label="Cuisines:"
              label-for="Cuisine"
            >
              <multiselect
                id="cuisine"
                v-model="$v.form.cuisine.$model"
                :options="cuisines"
                :multiple="true"
                :show-labels="false" placeholder="Select options"
              ></multiselect>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-diets"
              label-cols-sm="2"
              label="diet:"
              label-for="diet"
            >
              <multiselect
                id="diet"
                v-model="$v.form.diet.$model"
                :options="diets"
                :multiple="false"
                :show-labels="false" placeholder="Select option"
              ></multiselect>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-Intolerances"
              label-cols-sm="4"
              label="Intolerances:"
              label-for="Intolerance"
            >
              <multiselect
                id="Intolerance"
                v-model="$v.form.Intolerance.$model"
                :options="Intolerances"
                :multiple="true"
                :show-labels="false" placeholder="Select options"
              ></multiselect>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-form>
    <div id="notfound" v-if="form.submitError">
      No recipes found
    </div>
    <div v-else-if="searched">
      <div div class="flex">
        Sort by:
        <b-button
          id="likeSortButton"
          type="sort"
          style="width:70px;height:35px;margin-left:30px"
          @click="likeSort"
          >Likes&#x25B4;</b-button>
          <b-button
          id="timeSortButton"
          type="sort"
          style="width:70px;height:35px;margin-left:30px;"
          @click="timeSort"
          >Time&#x25B4;</b-button>
      </div>
      <div v-if="orederByTime">
        <b-row v-for="r in orderedTime" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </div>
      <div v-else-if="orederByLikes">
        <b-row v-for="r in orderedLikes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </div>
      <div v-else>
        <b-row v-for="r in recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </div>
    </div>
  </div>
</template>


<script>
  import Multiselect from 'vue-multiselect'
  import RecipePreview from "C:/Users/dordo/עבודות_אוניברסיטה/סביבות פיתוח באינטרנט/3-3/assignment-3-2-v2-dor_marina/src/components/RecipePreview.vue";
  import cuisines from "../assets/cuisine.js"
  import diets from "../assets/diet.js"
  import Intolerances from "../assets/Intolerance.js"
  import { required } from "vuelidate/lib/validators";
  export default {
    name: "search",
    components: {
    RecipePreview,
    Multiselect
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
    cuisines: [],
    diets: [],
    Intolerances: [],
    recipes:[],
    searched:false,
    orederByTime:false,
    orederByLikes:false,
    IncDec:false
    };
  },
  computed:{
    orderedTime: function(){
      if(this.IncDec){
        return _.orderBy(this.recipes,'readyInMinutes','asc');
      }
      else{
        return _.orderBy(this.recipes,'readyInMinutes','desc');
      }
    },
    orderedLikes: function(){
      if(this.IncDec){
        return _.orderBy(this.recipes,'like','asc');
      }
      else{
        return _.orderBy(this.recipes,'like','desc');
      }
    }
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.Intolerances.push(...Intolerances);
    if(this.$root.store.username && this.$root.store.lastSearch){
      this.recipes=[];
      this.recipes.push(...this.$root.store.lastSearch);
      this.searched=true;
    }
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
    timeSort(){
      if(this.orederByTime){
        if(this.IncDec){
          this.IncDec=false;
          document.getElementById("timeSortButton").innerText='Time▴';
          return;
        }
        else
          this.IncDec=true;
          document.getElementById("timeSortButton").innerText='Time▾';
          return;
      }
      else{
        this.IncDec=false;
        this.orederByTime=true;
        if(this.orederByLikes){
          this.orederByLikes=false;
          document.getElementById("likeSortButton").innerText='Likes▴';
        }
      }
    },
    likeSort(){
      if(this.orederByLikes){
        if(this.IncDec){
          this.IncDec=false;
          document.getElementById("likeSortButton").innerText='Likes▴';
          return;
        }
        else
          this.IncDec=true;
          document.getElementById("likeSortButton").innerText='Likes▾';
          return;
      }
      else{
        this.IncDec=false;
        this.orederByLikes=true;
        if(this.orederByTime){
          this.orederByTime=false;
          document.getElementById("timeSortButton").innerText='Time▴';
        }
      }
    },
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
          this.form.cuisine.forEach((c)=>{
            if(parameters.cuisine==undefined){
              parameters.cuisine=c;
            }
            else{
              parameters.cuisine+=","+c;
            }
            });
        }
        if(this.form.Intolerance!=null){
          this.form.cuisine.forEach((c)=>{
            if(parameters.intolerances==undefined){
              parameters.intolerances=c;
            }
            else{
              parameters.intolerances+=","+c;
            }
            });
        }
        if(this.form.diet!=null){
          parameters.diet=this.form.diet;
        }
        const response = await this.axios.get("http://localhost:3000/recipe/search/query/"+this.form.Keyword,{
         params: parameters
        });
        this.recipes=[];
        this.recipes.push(...response.data.info_recipes);
        if(this.$root.store.username){
          this.$root.store.saveSearch(this.recipes);
        }
        this.searched=true;
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped >
#notfound{
  font-size:0.6cm;
}
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
  margin-left:10px;
}

.button:hover{
  background: azure;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 0px rgba(51, 51, 51, 0.425);
}
</style>