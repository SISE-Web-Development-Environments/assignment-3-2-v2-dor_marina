<template>
<div id="main">
    <b-container>
        <b-row id="mainTitle">
            My Favorite Recipes
        </b-row>
        <b-row>
            <FavoriteRecipes />
        </b-row>
    </b-container>
 </div>
</template>

<script>
import FavoriteRecipes from "../components/FavoriteRecipes"
export default {
    name: "Favorite",
    components:{
    FavoriteRecipes
    },
};
</script>

<style scoped>
#mainTitle{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: italic;
  max-width: 800px;
  padding-top: 2%;
  align-content: center;
  text-shadow: 2px 2px 0px rgba(95, 95, 95, 0.377);
  margin-bottom:20px ;
  text-align: center;
  font-weight:600;
  font-size: 40px;
  padding-left: 32%;
}
</style>