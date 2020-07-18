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
                            <div><span class="ec ec-stopwatch"></span> {{r.durationTime }} min.</div>
                            <span v-if="r.gluten"><img class="veg" src="../assets/glutenFree.png"/></span>
                            <span v-if="r.vegetarian"><img class="veg" src="../assets/vegetarian.png"/></span>
                            <span v-if="r.vegan"><img class="veg" src="../assets/vegan.png"/></span>
                            <div><b>servings: {{r.portions}}</b></div>
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
.veg{
  height: 60px;
  width: auto;
  margin-right: 20px;
  margin-top: 20px;
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
