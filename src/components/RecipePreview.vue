<template>
    <b-container>
      <b-row>
        <b-col class="recipe-body">
          <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview">
          <img :src="recipe.image" class="recipe-image" @click="addToWatched"/>
          </router-link>
        </b-col>
        <b-col class="recipe-footer">
           <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
          <div class="recipe-overview">
            <li>{{ recipe.readyInMinutes }} minutes</li>
            <li>{{ recipe.like }} likes</li>
            <li>vegeterian: {{ recipe.vegetarian}}</li>
            <li>gluten free: {{recipe.glutenFree}}</li>
            <li>vegan: {{recipe.vegan}}</li>
            <li v-if="$root.store.username">watched: {{recipe.watched}}</li>
            <li v-if="$root.store.username">saved: {{recipe.favorite}}</li>
          </div>
        </b-col>
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
  }
};
</script>

<style scoped>

img{
  height: 200px;
  width: auto;
  border-radius: 8px;
}
.recipe-footer{
  display:inline-block;
  margin-left:150px;
}

.recipe-title{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  font-weight:bolder;
  font-size:20px;
  text-decoration: underline;
}
</style>
