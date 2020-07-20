<template>
 <div id="main">
      <div v-for="r in recipes" :key="r.id">
             <RecipePreview class="recipePreview" :recipe="r" />
          <b-container>
              <b-row>
                  <b-col>
                     <h3 style="padding-bottom: 10px; text-decoration: underline;"> {{r.title}}</h3>
                  </b-col>
                </b-row>
                  <b-row>
                      <b-col>
                        <img :src="r.image" class="recipe-image"/>
                      </b-col>
                      <b-col>
                        <div class="recipe-overview">
                            <div><span class="ec ec-stopwatch"></span> {{r.readyInMinutes }} min.</div>
                            <span v-if="r.glutenFree"><img class="veg" src="../assets/glutenFree.png"/></span>
                            <span v-if="r.vegetarian"><img class="veg" src="../assets/vegetarian.png"/></span>
                            <span v-if="r.vegan"><img class="veg" src="../assets/vegan.png"/></span>
                            <div><b>servings: {{r.portions}}</b></div>
                            <b-button id="prepare" pill size="lg" variant="dark" @click="prepareRecipe(r.id)" style="margin-top:2px; margin-right:20px">Prepare Recipe <span class="ec ec-fork-and-knife"></span></b-button>
                            <b-button id="meal" pill size="lg" variant="dark" v-if="$root.store.username" @click="addToMeal(r.id)" style="margin-top:2px">Add To Meal 👨‍🍳</b-button>
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
        // console.log(response.data)
        let length = recipes.length;
        for(let i=0; i<length; i++){
            let inst = recipes[i]['instructions'];
            let splits = inst.split("|");
            recipes[i].instructions = splits;
            let ingr = recipes[i]['ingredients'];
            let fixedIngr=[];
            let obj = JSON.parse(ingr);
            let ingrLength = obj.length;
            for(let j=0; j< ingrLength; j++){
              let one = obj[j].amount + " " + obj[j].name;
              fixedIngr.push(one);
            }
            recipes[i].ingredients = fixedIngr;
        }
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
  },
  methods:{
async addToMeal(recipe_id){
      try {
        this.$root.store.AddToMeal(recipe_id);
        const response = await this.axios.post(
          "http://localhost:3000/profile/addToMeal",
          {
            recipe_id: recipe_id,
          },
          {withCredentials: true}
        );
        this.$root.store.number = this.$root.store.number+1;
        let x = document.getElementById("meal");
        x.style.display = "none";
        // this.message="The recipe has been added to your meal!"
      } catch (err) {
        if(err.response.data == "this recipe is already in your meal"){
          let y = document.getElementById("meal");
          y.style.display = "none";
          // this.message="The recipe is already in your meal!"
        }
        if(error.response.data.message === 'unauthorized'){
          this.$root.store.logout();
          this.$router.push("/login").catch(() => {
            this.$forceUpdate();
      });
        }
      }
    },
    prepareRecipe(recipe_id){
    try{
      if(this.$root.store.username){
        this.addToMeal(recipe_id);
      }
      this.$router.push({ name: "Prepare", recipeId:recipe_id});
    }
    catch (err) {
      console.log(err.response);
      this.form.submitError = err.response.data.message;
    }
  },
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
