<template>
  <div id="main">
    <b-container>
        <b-row id="mainTitle" class='double-border-text'>
            Lets Cook!
        </b-row>
        <b-row>
            <MealRecipesList />
        </b-row>
    </b-container>
 </div>
</template>

<script>
import MealRecipesList from "../components/MealRecipesList"
export default {
    name: "MealList",
    components:{
        MealRecipesList,
    },
}
</script>

<style lang="scss" scoped>
// Color
$brown: #2b2520;
$green: #39dbc2;
$pink: #f41fbf;
$yellow: #ffed28;
$purple: #b028ff;
$blue: #49A7FF;
$red: #ff3838;
$orange: #db7953;

// Font
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rancho&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Molle:ital@1&display=swap');


// Size
$extra-large: 110px;
$large: 84px;

.double-border-text {
    $random-text: 'Lets Cook!';
    position: relative;
    $stroke-width: $large * 0.2;
    font-family: 'Pacifico', cursive;
    // text-transform: uppercase;
    font-size: $large;
    color: rgb(247, 245, 224);
    -webkit-text-stroke-width: $stroke-width;
    -webkit-text-stroke-color: lighten(adjust-hue($yellow, -5%), 35%);
    margin-left: 30%;
    margin-bottom: 2%;

    &:after {
      content: $random-text;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-text-stroke-width: 0;
      color: $orange;
    }
    
    &:before {
      z-index: -1;
      content: $random-text;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-text-stroke-width: $stroke-width + 15px;
      -webkit-text-stroke-color: $orange;
    }
  }
  
  button{
      margin-bottom: 10px;
      margin-left:43%;
  }
</style>