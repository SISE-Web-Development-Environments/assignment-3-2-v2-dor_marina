<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" />
        </b-col>
        <b-col>
          <span v-if="!$root.store.username">
            <login id="login"/>
          </span>
          <span v-else>
            <RecipeWatched title="Last watched recipes"/>
          </span>
        </b-col>
      </b-row>
    </b-container>
    <!-- <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList> -->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import login from '../components/Login';
import RecipeWatched from "../components/RecipeWatchedList";
export default {
  components: {
    RecipePreviewList,
    login,
    RecipeWatched
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
b-container{
  height: 100%;
  width: 100%;
}

#login{
  margin-top: 15%;
}

</style>
