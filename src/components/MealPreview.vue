<template>
    <b-container>
      <b-row>
        <b-col class="recipe-body">
          <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview">
          <!-- <img :src="recipe.image" class="recipe-image"/> -->
          <div class="hover01 column">
            <div>
              <figure><img :src="recipe.image" class="recipe-image" /> </figure>
              <span>Click to make the recipe🔥</span>
            </div>
          </div>
          </router-link>
        </b-col>
        <b-col class="recipe-footer">
           <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
          <div class="recipe-overview">
            <li v-if="recipe.readyInMinutes">{{ recipe.readyInMinutes }} minutes</li>
            <li v-if="recipe.durationTime">{{ recipe.durationTime }} minutes</li>
            <li>vegeterian: {{ recipe.vegetarian}}</li>
            <li>gluten free: {{recipe.glutenFree}}</li>
            <li>vegan: {{recipe.vegan}}</li>
            <b-button pill variant="secondary" @click="removeFromMeal">Remove From Meal</b-button>
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
  },
  methods:{
      async removeFromMeal(){
        try {
            response = await this.axios.delete(
            `http://localhost:3000/profile/deleteRecipeFromMeal/${this.recipe.id}`);
            console.log("deleted?")
            this.$root.$emit("mealRemoved");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        return;
      }
      }
  }
};
</script>

<style scoped>

img{
  height: 250px;
  width: auto;
  border-radius: 8px;
  margin-bottom: 30px;
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

.hover01 figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.hover01 figure:hover img {
	-webkit-transform: scale(1.3);
	transform: scale(1.3);
}
.column span {
	margin-left: 1em;
	color: #333;
  font-size: 100%;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.column div span {
	position: absolute;
	/* bottom: 20px; */
	left: 0;
	/* z-index: -0.5; */
	display: block;
	width: 300px;
	margin: 0;
	padding: 0;
    color: rgb(48, 48, 48);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	font-size: 18px;
	text-decoration: none;
	text-align: center;
	-webkit-transition: .3s ease-in-out;
	/* transition: .3s ease-in-out; */
	opacity: 0;
}
figure {
  height: 250px;
  width: auto;
    /* overflow: hidden; */
    border-radius: 8px;
  margin-bottom: 5px;
}
figure:hover + span {
	/* bottom: -36px; */
    opacity: 1;
    background-color: #db7953;
    margin-left: 60px;
}
</style>
