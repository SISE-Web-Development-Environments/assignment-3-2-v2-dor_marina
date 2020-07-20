<template>
    <b-container>
      <b-row>
        <b-col>
          <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
        </b-col>
        <b-col>
          <div v-if="$root.store.username && isFavorite ">&#128151;already saved </div>
          <b-button pill variant="outline-danger" v-if="$root.store.username && !isFavorite" @click="addToFavorites" style="margin-bottom:10px">save &#128151;</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="recipe-footer">
          <div class="recipe-overview">
            <div v-if="recipe.readyInMinutes"><span class="ec ec-stopwatch"></span> {{ recipe.readyInMinutes }} min.</div>
            <div v-if="recipe.like"><img class="info" src="../assets/like.png"/> {{ recipe.like }} likes</div>
            <!-- <div v-if="$root.store.username && recipe.watched "><img class="info" src="../assets/seen.png"/></div> -->
            <!-- <div v-if="$root.store.username && !recipe.watched " >Click on pic to watch</div> -->
            <span v-if="recipe.glutenFree"><img class="veg" src="../assets/glutenFree.png"/></span>
             <span v-if="recipe.vegetarian"><img class="veg" src="../assets/vegetarian.png"/></span>
            <span v-if="recipe.vegan"><img class="veg" src="../assets/vegan.png"/></span>
             <span v-if="$root.store.username && recipe.watched "><img class="veg" src="../assets/seen.png"/></span>
             <span v-if="$root.store.username && !recipe.watched "><img class="veg" src="../assets/notSeen.png"/></span>
          </div>
        </b-col>
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
   computed: {
    isFavorite() {
      return this.recipe.favorite;
    },
    isWatched() {
      return this.recipe.watched;
    }
  },
};
</script>

<style scoped>

.container{
  max-width: 800px;
  margin-bottom: 20px;
}
.info{
  height: 25px;
  width: auto;
  margin-top: 10px;
}

.veg{
  height: 30px;
  width: auto;
  margin-right: 20px;
}

img{
  height: 150px;
  width: auto;
  border-radius: 8px;
  margin-bottom: 30px;
}
.recipe-footer{
  display:inline-block;
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
	/* margin-left: 1em; */
	color: #333;
  font-size: 100%;
  margin-right: 50px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.column div span {
	position: absolute;
	/* bottom: -20px; */
	/* left: 0; */
  /* z-index: -0.5; */
	display: block;
	width: 300px;
	/* margin: 0; */
  /* padding: 0; */
  padding-right: 30px;
	color: #444;
	font-size: 18px;
	text-decoration: none;
  text-align: center;
	-webkit-transition: .3s ease-in-out;
	/* transition: .3s ease-in-out; */
	opacity: 0;
}
figure {
	width: auto;
	height: 150px;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
figure:hover + span {
	/* bottom: -36px; */
	opacity: 1;
}
.recipe-overview{
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size:18px;
}
</style>
