<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 style="text-align: center; font-style: oblique; margin-bottom:15px;">{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" style="filter: contrast(150%); border-radius: 8px;"/>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><span class="ec ec-stopwatch"></span> {{ recipe.readyInMinutes }} min.</div>
              <div><img class="info" src="../assets/like.png"/> {{ recipe.like }} likes</div>
              <b-row>
                <div><b>Servings: {{recipe.servings*amount}}</b></div>
                <b-button id="Incremant" variant="success" type="inc" style="width:70px;height:35px;margin-left:30px" @click="Increment">
                   <b> +</b>
                </b-button>
                <b-button :disabled="disable" id="decrement" variant="danger" type="inc" style="width:70px;height:35px;margin-left:30px" @click="decrement">
                    <b>-</b>
                </b-button>
              </b-row>
              <!-- <div v-if="$root.store.username && recipe.watched " >You watched this recipe</div> -->
              <!-- <div v-if="$root.store.username && isFavorite ">&#128151;already saved </div> -->
          <!-- <b-button pill variant="outline-danger" v-if="$root.store.username && !isFavorite" @click="addToFavorites" style="margin-bottom:10px">save &#128151;</b-button> -->
            </div>
            <h5>Please check that you have all of the ingredients:</h5>
                    <div>
                        <input id="mainCheck" type="checkbox" v-model="markAllIngredients" @change="checkAll($event)">
                        <b>I have all of the ingredients</b>
                    </div>
                    <div ref="ingri">
                      <div 
                          v-for="(r, index) in recipe.ingredients"
                          :key="index + '_' + r.id"
                      >
                          <input type="checkbox" @change="check($event)">
                          {{ r.amount*amount }} {{r.unit}}  {{r.name}}
                      </div>
                    </div>
          </div>
          <div class="wrapped">
            <h4>Instructions:</h4>
            <div ref=steps>
              <div v-for="s in recipe._instructions" :key="s.number">
                <input type="checkbox" disabled @change="changeStage" style="margin-left:-15px;">
                <span v-if="s.step">{{ s.step }}</span>
                <span v-else>{{s}}</span>
              </div>
            </div>
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
    </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
    return {
      index:0,
      recipe: null,
      amount:1,
      disable:true,
      markAllIngredients:false,
      numberIngridiaintsMarked:0
    };
  },
  async mounted() {
        try {
        let response;
        try {
          if(this.$route.params.recipeId>20){
          response = await this.axios.get(
            `http://localhost:3000/recipe/Information/${this.$route.params.recipeId}`,

            );
            response = response.data.data
            }
          else if(this.$route.params.recipeId%2==0){
            response = await this.axios.get(
            "http://localhost:3000/profile/familyRecipesWhole");
            const recipes = response.data;
            for(let j=0; j<recipes.length; j++){
              if(recipes[j].id == this.$route.params.recipeId){
                response = recipes[j];
              }
            }
          }else{
            response = await this.axios.get(
          `http://localhost:3000/recipe/recipeByID/${this.$route.params.recipeId}`);
          response = response.data[0];
          }
        } catch (error) {
          console.log(error);
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
        } = response;
        let _instructions = analyzedInstructions
          if(this.$route.params.recipeId<=20){
            let inst = instructions;
            let splits = inst.split("|");
            _instructions = splits;
            ingredients = JSON.parse(ingredients);
          }
          console.log(_instructions);
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
      } catch (error) {
        console.log(error);
      }
      if(localStorage.getItem(this.recipe.id)>0){
        this.markAllIngredients=true;
        this.$nextTick(function () {
          this.checkAndDisable();
          for(let i=0; i<this.recipe.ingredients.length;i++){
            let temp=this.$refs.ingri;
            temp.children[i].children[0].checked=true;
          }
        });
    }
  },
  computed:{
      allMarked: function(){
        if(this.numberIngridiaintsMarked==this.recipe.ingredients.length){
          return false;
        }
        return true;
      }
  },
  methods:{
      changeStage(){
        if( !this.$refs.steps.children[0].children[0].checked){
            localStorage.setItem(this.recipe.id,0);
        }
        else{
          for(let i=0; i<this.recipe._instructions.length;i++){
            if( this.$refs.steps.children[i].children[0].checked){
              localStorage.setItem(this.recipe.id,i+1);
            }
            else{
              break;
            }
          }
        }
        this.checkAndDisable();
      },
      checkAndDisable(){
        let stage=localStorage.getItem(this.recipe.id);
        for(let i=0; i<this.recipe._instructions.length;i++){
          if(i<stage){
            this.$refs.steps.children[i].children[0].disabled=false;
            this.$refs.steps.children[i].children[0].checked=true;
          }
          else if(i==stage){
            this.$refs.steps.children[i].children[0].disabled=false;
            this.$refs.steps.children[i].children[0].checked=false;
          }
          else{
            this.$refs.steps.children[i].children[0].disabled=true;
            this.$refs.steps.children[i].children[0].checked=false;
          }
        }
      },
      checkAll(c){
        if(c.currentTarget.checked){
          for(let i=0; i<this.recipe.ingredients.length;i++){
            let temp=this.$refs.ingri;
            temp.children[i].children[0].checked=true;
          }
          this.numberIngridiaintsMarked=this.recipe.ingredients.length;
          localStorage.setItem(this.recipe.id,0);
          this.checkAndDisable();
        }
        else{
          for(let i=0; i<this.recipe.ingredients.length;i++){
            this.$refs.ingri.children[i].children[0].checked=false;
          }
          localStorage.setItem(this.recipe.id,0);
          this.numberIngridiaintsMarked=0;
          localStorage.setItem(this.recipe.id,0);
          this.checkAndDisable();
          this.$refs.steps.children[0].children[0].disabled=true;
        }
      },
      check(c){
        if(c.currentTarget.checked){
          this.numberIngridiaintsMarked++;
        }
        else{
          this.markAllIngredients=false;
          this.numberIngridiaintsMarked--;
          localStorage.setItem(this.recipe.id,0);
          this.checkAndDisable();
          this.$refs.steps.children[0].children[0].disabled=true;
        }
        if(this.numberIngridiaintsMarked==this.recipe.ingredients.length){
          this.markAllIngredients=true;
          localStorage.setItem(this.recipe.id,0);
          this.checkAndDisable();
        }
      },
      Increment(){
          this.amount++;
          this.disable=false;
          this.checkAll=false;
      },
      decrement(){
          this.amount--;
          if(this.amount==1){
            this.disable=true;
          }
      }
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