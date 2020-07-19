<template>
  <div id="main">
      <div id="mainTitle">
          Personal Recipes
      </div>
      <div v-for="r in recipes" :key="r.id">
             <RecipePreview class="recipePreview" :recipe="r" />
      </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreviewPersonal"
export default {
    name:"Personal",
    data(){
        return{
            recipes:[]
        }
    },
    components:{
        RecipePreview
    },
    mounted(){
        this.getRecipes();
    },
    methods:{
        async getRecipes(){
            try {
        const response = await this.axios.get(
          "http://localhost:3000/profile/personalRecipesWhole",
        );
        const recipes = response.data;
        let length = recipes.length;
        for(let i=0; i<length; i++){
            let inst = recipes[i]['instructions'];
            let splits = inst.split("|");
            recipes[i].instructions = splits;
            let ingr = recipes[i]['ingredients'];
            splits = ingr.split("|");
            recipes[i].ingredients = splits;
        }
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        if(error.response.data.message === 'unauthorized'){
          this.$root.store.logout();
          this.$router.push("/login").catch(() => {
            this.$forceUpdate();
      });
        }
      }
        }
    }
}
</script>

<style scoped>
.container {
  min-height: 320px;
}
#mainTitle{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  max-width:1200px;
  align-content: center;
  text-shadow: 2px 2px 0px rgba(95, 95, 95, 0.377);
  margin-bottom:20px ;
  text-align: center;
  font-weight:600;
  font-size: 45px;
  padding-left: 23%;
  padding-top: 1%;
}
img{
  height: 200px;
  width: auto;
  border-radius: 8px;
  margin-bottom: 30px;
  display: inline-block;
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