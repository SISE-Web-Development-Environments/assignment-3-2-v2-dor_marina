<template>
 <div id="main">
      <div v-for="r in recipes" :key="r.recipe_id">
             <RecipePreview class="recipePreview" :recipe="r" />
          <b-container>
              <b-row>
                  <b-col>
                     <h3 style="padding-bottom: 10px; text-decoration: underline;"> {{r.recipe_name}}</h3>
                  </b-col>
                </b-row>
                  <b-row>
                      <b-col>
                        <img :src="r.image" class="recipe-image"/>
                      </b-col>
                      <b-col>
                        <div class="recipe-overview">
                            <li>{{ r.durationTime }} minutes</li>
                            <li>vegeterian: {{ r.vegetarian}}</li>
                            <li>gluten free: {{r.gluten}}</li>
                            <li>vegan: {{r.vegan}}</li>
                            <li>servings: {{r.portions}}</li>
                        </div>
                      </b-col>
                  </b-row>
              <b-row style="padding-bottom:10px">
                  <b-col>
                      <h5> Ingredients:</h5>
                     <ul>
                        <li v-for="(m, index) in r.ingredients" :key="index + '_' + m.id">
                            {{m}}
                        </li>
                     </ul>
                  </b-col>
                  <b-col>
                      <h5> Instructions:</h5>
                    <ol>
                        <li v-for="(k, index) in r.instructions" :key="index + '_' + k.id">
                            {{k}}
                        </li>
                        </ol>
                  </b-col>
              </b-row>
              <b-row>
                  <div id="bon">
                      Bon-Appetit!
                  </div>
              </b-row>
          </b-container>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [],
    };
  },
  async created() {
    try {
      // response = this.$route.params.response;
        const response = await this.axios.get(
          `http://localhost:3000/recipe/recipeByID/${this.$route.params.recipeId}`
        );
        const recipes = response.data;
        console.log(response.data)
        let length = recipes.length;
        for(let i=0; i<length; i++){
            let inst = recipes[i]['instructions'];
            let splits = inst.split("|");
            recipes[i].instructions = splits;
            let ingr = recipes[i]['ingredients'];
            splits = ingr.split("|");
            recipes[i].ingredients = splits;
        }
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
  }
};
</script>

<style scoped>
.container {
  min-height: 320px;
}
img{
  height: 200px;
  width: auto;
  border-radius: 8px;
  margin-bottom: 30px;
  display: inline-block;
}

#bon{
    padding-top: 40px;
    padding-bottom: 30px;
  font-family: gentleFont;
  font-size: 40px;
  background: -webkit-linear-gradient(rgb(147, 149, 245), #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 35%;
}
.col{
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    background-color: rgba(255, 255, 240, 0.39);
}
</style>
