<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 style="text-align: center; font-style: oblique; margin-bottom:15px;">{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" style="filter: contrast(150%); border-radius: 8px;"/>
         <b-button id="meal" pill size="lg" variant="dark" v-if="$root.store.username && !recipe.inMeal" @click="addToMeal" style="margin-top:2px">Add To Meal👨‍🍳</b-button>
         <div v-if="message">{{message}}</div>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><span class="ec ec-stopwatch"></span> {{ recipe.readyInMinutes }} min.</div>
              <div><img class="info" src="../assets/like.png"/> {{ recipe.like }} likes</div>
              <div><b>Servings: {{recipe.servings}}</b></div>
              <!-- <div v-if="$root.store.username && recipe.watched " >You watched this recipe</div> -->
              <!-- <div v-if="$root.store.username && isFavorite ">&#128151;already saved </div> -->
          <!-- <b-button pill variant="outline-danger" v-if="$root.store.username && !isFavorite" @click="addToFavorites" style="margin-bottom:10px">save &#128151;</b-button> -->
            </div>
            <h4>Ingredients:</h4>
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h4>Instructions:</h4>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    <div>
            <span v-if="recipe.glutenFree"><img class="veg" src="../assets/glutenFree.png"/></span>
             <span v-if="recipe.vegetarian"><img class="veg" src="../assets/vegetarian.png"/></span>
            <span v-if="recipe.vegan"><img class="veg" src="../assets/vegan.png"/></span>
            <span v-if="$root.store.username && recipe.watched "><img class="veg" src="../assets/seen.png"/></span>
             <span v-if="$root.store.username && !recipe.watched "><img class="veg" src="../assets/notSeen.png"/></span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      message: null,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        response = await this.axios.get(
          `http://localhost:3000/recipe/Information/${this.$route.params.recipeId}`,

          );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        id,
        analyzedInstructions,
        instructions,
        ingredients,
        like,
        vegetarian,
        vegan,
        glutenFree,
        watched,
        favorite,
        readyInMinutes,
        image,
        title,
        servings
      } = response.data.data;
      let _instructions = analyzedInstructions
        // .map((fstep) => {
        //   fstep.steps[0].step = fstep.name + fstep.steps[0].step;
        //   return fstep.steps;
        // })
        // .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        id,
        instructions,
        _instructions,
        analyzedInstructions,
        ingredients,
        like,
        vegetarian,
        vegan,
        glutenFree,
        watched,
        favorite,
        readyInMinutes,
        image,
        title,
        servings
      };
      this.recipe = _recipe;
      console.log(this.recipe)
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
  async addToMeal(){
      try {
        console.log(this.recipe.id);
        const response = await this.axios.post(
          "http://localhost:3000/profile/addToMeal",
          {
            recipe_id: this.recipe.id,
          },
          {withCredentials: true}
        );
        console.log(response);
        this.$root.store.number = this.$root.store.number+1;
        let x = document.getElementById("meal");
        x.style.display = "none";
        this.message="The recipe has been added to your meal!"
      } catch (err) {
        if(err.response.data == "this recipe is already in your meal"){
          let y = document.getElementById("meal");
          y.style.display = "none";
          this.message="The recipe is already in your meal!"
        }
        if(error.response.data.message === 'unauthorized'){
          this.$root.store.logout();
          this.$router.push("/login").catch(() => {
            this.$forceUpdate();
      });
        }
      }
    },
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
      console.log(this.recipe)
      console.log(this.recipe.favorite)
      return this.recipe.favorite;
    },
    isWatched() {
      console.log(this.recipe.watched)
      return this.recipe.watched;
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.info{
  height: 25px;
  width: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.veg{
  height: 80px;
  width: auto;
  margin-right: 20px;
  margin-bottom: 30px;
}

</style>
