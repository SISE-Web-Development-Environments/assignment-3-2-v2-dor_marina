<template>
  <b-container>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <MealPreview class="recipePreview" :recipe="r" />
      </b-row>
      <b-row>
         <b-button pill variant="danger" size="lg" @click="removeAll">Remove All</b-button>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import MealPreview from "./MealPreview";
export default {
  name: "RecipeMealList",
  components: {
    MealPreview
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
    this.$root.$on("mealRemoved",()=>{
      this.updateRecipes();
    })
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/profile/getMealRecipes",
        );
        this.error=null;
        const ids = response.data;
        var length = ids.length;
        let recipesFromAns=[];
        this.recipes = [];
        for(let i=0; i<length; i++){
            let resp;
            resp = await this.axios.get(
            `http://localhost:3000/recipe/Information/${ids[i]['recipe_id']}`,
            );
            recipesFromAns.push(resp.data.data);
        }
        this.recipes.push(...recipesFromAns);
      } catch (error) {
        if(error.response.data.message === 'unauthorized'){
          this.$root.store.logout();
          this.$router.push("/login").catch(() => {
            this.$forceUpdate();});
        }
        else{
          this.error = "Sorry, you don't have any recipes in your meal yet"
        }
      }
    },
    async removeAll(){

      this.updateRecipes();
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 320px;
}
.title{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  max-width: 600px;
  padding-top: 5%;
  align-content: center;
  text-shadow: 2px 2px 0px rgba(95, 95, 95, 0.377);
  margin-bottom:70px ;
  text-align: center;
  font-weight:600;
}
</style>
