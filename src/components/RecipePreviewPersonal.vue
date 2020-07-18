<template>
    <b-container>
        <b-row style="text-align: center;">
            <div :title="recipe.recipe_name" class="recipe-title">
            {{ recipe.recipe_name }}
          </div>
        </b-row>
        <b-row>
            <b-col class="recipe-body">
                <router-link :to="{ name: 'personalRecipe', params: { recipeId: recipe.recipe_id } }" class="recipe-preview">
                    <img :src="recipe.image" class="recipe-image"/>
                </router-link>
            </b-col>
            <b-col class="recipe-footer">
            <div class="recipe-overview">
                <div><span class="ec ec-stopwatch"></span> {{recipe.durationTime }} min.</div>
                <span v-if="recipe.gluten"><img class="veg" src="../assets/glutenFree.png"/></span>
                <span v-if="recipe.vegetarian"><img class="veg" src="../assets/vegetarian.png"/></span>
                <span v-if="recipe.vegan"><img class="veg" src="../assets/vegan.png"/></span>
            </div>
            </b-col>
      </b-row>
      <b-row>
            <div id="bon">
                Bon-Appetit!
            </div>
        </b-row>
    </b-container>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>

img{
  height: 400px;
  width: auto;
  border-radius: 8px;
  margin-bottom: 30px;
}
.veg{
  height: 60px;
  width: auto;
  margin-right: 20px;
  margin-top: 20px;
}
.recipe-footer{
  display:inline-block;
  margin-left:150px;
  text-align: left;
}

.recipe-title{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  font-weight:bolder;
  font-size:30px;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 20px;
}
.recipe-overview{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
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

</style>
