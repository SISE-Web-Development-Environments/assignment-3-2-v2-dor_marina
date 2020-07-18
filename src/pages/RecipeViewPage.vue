<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 style="text-align: center; font-style: oblique; margin-bottom:15px;">{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" style="filter: contrast(150%); border-radius: 8px;"/>
         <b-button id="prepare" pill size="lg" variant="dark" @click="prepareRecipe" style="margin-top:2px; margin-right:20px">Prepare Recipe 👨‍🍳</b-button>
         <b-button id="meal" pill size="lg" variant="dark" v-if="$root.store.username && !recipe.inMeal" @click="addToMeal" style="margin-top:2px">Add To Meal 👨‍🍳</b-button>
         <div v-if="message">{{message}}</div>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><b>Ready in</b> {{ recipe.readyInMinutes }} minutes</div>
              <div><b>Likes:</b> {{ recipe.likes }} likes</div>
              <div><b>Servings:</b> {{recipe.servings}}</div>
              <div><b>Vegeterian:</b> {{ recipe.vegetarian}}</div>
              <div><b>Gluten free:</b> {{recipe.glutenFree}}</div>
              <div><b>Vegan:</b> {{recipe.vegan}}</div>
              <div v-if="$root.store.username"><b>watched:</b> {{recipe.watched}}</div>
              <div v-if="$root.store.username"><b>saved:</b> {{recipe.favorite}}</div>
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
        likes,
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
        likes,
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
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
  prepareRecipe(){
    try{
      if(this.$root.store.username && !this.recipe.inMeal){
        addToMeal();
      }
      this.$root.store.newPreparedRecipe(this.recipe);
      this.$router.push({ name: "Prepare"});
    }
    catch (err) {
      console.log(err.response);
      this.form.submitError = err.response.data.message;
    }
  },
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
  }
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

</style>
