<template>
  <b-container>
    <b-col>
      <b-row v-if="error">
        <h5 style="text-align: center; font-style: oblique; margin-top:15px; margin-left: 27%; margin-bottom:15px">{{error}}</h5>
        </b-row>
     <div class="container" v-dragula="colOne" bag="first-bag">
        <div v-for="(r,index) in recipes" :key="r.id">
          <div style="font-size:30px">{{index+1}}.</div>
            <MealPreview class="recipePreview" :recipe="r" />
        </div>
      </div>
      <b-row v-if="!error">
         <b-button pill variant="danger" size="lg" @click="removeAll">Remove All</b-button>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import MealPreview from "./MealPreview";

export default {
  name: "RecipeMealList",
  components: {
    MealPreview
  },
  data() {
    return {
      recipes: [],
      error:null
    };
  },
  // created: function () {
  //   Vue.vueDragula.options('first-bag', {
  //     direction: 'vertical'
  //   })},
  mounted() {
    this.updateRecipes();
    this.$root.$on("mealRemoved",()=>{
      this.updateRecipes();
    })
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/profile/getMealRecipes",
        );
        this.error=null;
        const ids = response.data;
        var length = ids.length;
        let recipesFromAns=[];
        this.recipes = [];
        for(let i=0; i<length; i++){
            let resp;
            let id = ids[i]['recipe_id'];
            if(id>20){
            resp = await this.axios.get(
            `http://localhost:3000/recipe/Information/${ids[i]['recipe_id']}`,
            );
            recipesFromAns.push(resp.data.data);
            }
            else if(id%2 == 0){
             resp = await this.axios.get(
          "http://localhost:3000/profile/familyRecipesWhole");
            const recipes = resp.data;
            for(let j=0; j<recipes.length; j++){
              if(recipes[j].id == id){
                recipesFromAns.push(recipes[j]);
              }
            }
            }
            else{
            resp = await this.axios.get(
          `http://localhost:3000/recipe/recipeByID/${id}`);
            recipesFromAns.push(resp.data[0]);
            }
        }
        this.recipes.push(...recipesFromAns);
      } catch (error) {
        console.log(error);
        if(error.response.data.message === 'unauthorized'){
          this.$root.store.logout();
          this.$router.push("/login").catch(() => {
            this.$forceUpdate();});
        }
        else{
          this.error = "Sorry, you don't have any recipes in your meal yet"
          this.recipes=[];
        }
      }
    },
    async removeAll(){
        try {
            const response = await this.axios.delete(
            `http://localhost:3000/profile/deleteAllFromMeal`);
            this.$root.store.number = 0;
            this.updateRecipes();
        } catch (error) {
          console.log("error.response.status", error);
          return;
        }
      }
    },
};
</script>

<style lang="scss" scoped>
// .container {
//   min-height: 200px;
// }

.recipePreview:hover{
  cursor: -webkit-grab; 
  cursor: grab;
}

.recipePreview:active{
cursor: -webkit-grabbing; 
cursor: grabbing;
}
.title{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  max-width: 600px;
  padding-top: 5%;
  align-content: center;
  text-shadow: 2px 2px 0px rgba(95, 95, 95, 0.377);
  margin-bottom:70px ;
  text-align: center;
  font-weight:600;
}
button{
  margin-left: 43%;
  margin-bottom: 10px;
}
*, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}
.container .scale-transition {
  overflow: hidden;
  height: 40px;
  transition: height .2s;
}
.container .scale-enter {
  height: 0px;
}
.container .scale-leave {
  height: 0px;
}
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}
.gu-hide {
  display: none !important;
}
.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
.gu-transit {
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}
</style>
