<template>
    <b-container>
      <b-row>
        <b-col class="recipe-body">
        <img :src="recipe.image" class="recipe-image"/>
        </b-col>
        <b-col id="progressBar">
          <h4>Your Progress:</h4>
          <b-progress style="background-color: rgba(51, 51, 51, 0.3);"   animated variant="success" height="25px">
            <b-progress-bar :value="value" :max="max" :label="`${value}/${max}`"></b-progress-bar>
          </b-progress>
        </b-col>
        <b-col class="recipe-footer">
           <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
          <div class="recipe-overview">
            <div v-if="recipe.readyInMinutes"><span class="ec ec-stopwatch"></span> {{ recipe.readyInMinutes }} min.</div>
            <div v-if="recipe.durationTime"><span class="ec ec-stopwatch"></span> {{ recipe.durationTime }} min.</div>
            <span v-if="recipe.glutenFree"><img class="veg" src="../assets/glutenFree.png"/></span>
            <span v-if="recipe.vegetarian"><img class="veg" src="../assets/vegetarian.png"/></span>
            <span v-if="recipe.vegan"><img class="veg" src="../assets/vegan.png"/></span>
            <div>
              <b-button pill size="lg" variant="danger" @click="makeRecipe(recipe.id)" style="margin-right: 15px;">Make!</b-button>
            <router-link
            :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
            class="recipe-preview">
                
          </router-link>
            <b-button pill variant="secondary" @click="removeFromMeal" >Remove From Meal</b-button>
            </div>
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
  data(){
    return{
      value:3,
      max:0,
    }
  },
  mounted() {
    // console.log(this.recipe);
    if(this.recipe.analyzedInstructions !== undefined){
    this.max = this.recipe.analyzedInstructions.length;
    }
    else{
      this.max = this.recipe.instructions.length;
    }
    // this.value = this.localStorage.getItem(this.recipe.id);
  },
  methods:{
      async removeFromMeal(){
        try {
            const response = await this.axios.delete(
            `http://localhost:3000/profile/deleteRecipeFromMeal/${this.recipe.id}`);
            this.$root.store.number = this.$root.store.number-1;
            this.$root.$emit("mealRemoved");
      } catch (error) {
        console.log("error.response.status", error);
        return;
      }
      },
      makeRecipe(recipe_id){
        console.log(recipe_id);
        this.$router.push({ name: "Prepare", params: { recipeId: recipe_id }});
      }
  }
};
</script>

<style scoped>

#progressBar{
  margin-top:5%;
  margin-left: -70px;
  /* background-color: rgba(51, 51, 51, 0.205); */
}
img{
  height: 150px;
  width: auto;
  border-radius: 8px;
  margin-top: 10px;
}
.veg{
  height: 50px;
  width: auto;
  margin-right: 20px;
  margin-bottom: 15px;
  margin-top: 15px;
}

.recipe-footer{
  display:inline-block;
  /* margin-left:150px; */
}

.recipe-title{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  font-weight:bolder;
  font-size:20px;
  text-decoration: underline;
}

h4{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

/* .hover01 figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.hover01 figure:hover img {
	-webkit-transform: scale(1.3);
	transform: scale(1.3);
} */
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
  margin-top: 10px;
}
figure:hover + span {
	/* bottom: -36px; */
    opacity: 1;
    background-color: #db7953;
    margin-left: 60px;
}

.container{
background-color: rgba(247, 245, 224, 0.418);
border: groove;
margin-bottom: 5px;
}
</style>
