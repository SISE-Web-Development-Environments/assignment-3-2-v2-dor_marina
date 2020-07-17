<template>
  <b-container>
    <h3 class="title">
      {{ title }}:
    </h3>
    <b-row v-if="error">
                <h3 style="text-align: center; font-style: oblique; margin-top:15px; margin-left: 22%;">{{error}}</h3>
            </b-row>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipeWatchedList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      error:null
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/profile/last3watched",
        );
        this.error=null;
        const ids = response.data;
        var length = ids.length;
        let recipesFromAns=[];
        this.recipes = [];
        for(let i=0; i<length; i++){
            let resp;
            resp = await this.axios.get(
            `http://localhost:3000/recipe/Information/${ids[i]['recipe_watched']}`,
            );
            recipesFromAns.push(resp.data.data);
        }
        this.recipes.push(...recipesFromAns);
      } catch (error) {
        if(error.response.data.message === 'unauthorized'){
      //     this.$root.store.logout();
      //     this.$router.push("/login").catch(() => {
      //       this.$forceUpdate();
      // });
        }
        else{
          this.error = "Sorry, you didn't watched any recipes yet"
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 300px;
}
.title{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  max-width: 600px;
  padding-top: 5%;
  align-content: center;
  text-shadow: 2px 2px 0px rgba(95, 95, 95, 0.377);
  margin-bottom:20px ;
  text-align: center;
  font-weight:600;
}
</style>
