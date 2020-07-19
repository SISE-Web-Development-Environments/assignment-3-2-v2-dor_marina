<template>
    <b-container>
      <b-row>
        <b-col class="recipe-body">
          <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview">
          <div class="hover01 column">
            <div>
              <figure><img :src="recipe.image" class="recipe-image" /> </figure>
              <span>Click to see more</span>
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
            <li v-if="recipe.like">{{ recipe.like }} likes</li>
            <li>vegeterian: {{ recipe.vegetarian}}</li>
            <li>gluten free: {{recipe.glutenFree}}</li>
            <li>vegan: {{recipe.vegan}}</li>
            <li v-if="$root.store.username && recipe.watched " >watched: {{recipe.watched}}</li>
            <li v-if="$root.store.username && recipe.favorite ">saved: {{recipe.favorite}}</li>
            <b-button pill variant="outline-danger" v-if="$root.store.username && !recipe.favorite" @click="addToFavorites">save &#128151;</b-button>
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
    async addToFavorites(){
      try {
        const response = await this.axios.post(
          "http://localhost:3000/recipe/addToFavorites",
          {
            recipe_id: this.recipe.id,
          },
          {withCredentials: true}
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    }
  },
  async addToMeal(){
      try {
        const response = await this.axios.post(
          "http://localhost:3000/profile/addToMeal",
          {
            recipe_id: this.recipe.id,
          },
          {withCredentials: true}
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
};
</script>

<style scoped>

img{
  height: 200px;
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
	/* bottom: -20px; */
	left: 0;
	/* z-index: -0.5; */
	display: block;
	width: 300px;
	margin: 0;
	padding: 0;
	color: #444;
	font-size: 18px;
	text-decoration: none;
	text-align: center;
	/* -webkit-transition: .3s ease-in-out; */
	/* transition: .3s ease-in-out; */
	opacity: 0;
}
figure {
	width: 300px;
	height: 200px;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
figure:hover + span {
	opacity: 1;
}
</style>
