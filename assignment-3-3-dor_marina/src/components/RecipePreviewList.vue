<template>
  <b-container>
    <h3 class="title">
      {{ title }}:
    </h3>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
      <b-row>
        <b-button style="margin-left:120px; margin-bottom:10px;" @click="updateRecipes">See More</b-button>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
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
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/recipe/3Random",
        );
        const recipes = response.data.info_recipes;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
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
  margin-bottom:20px ;
  text-align: center;
  font-weight:600;
}
</style>
