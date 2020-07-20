<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <RecipePreviewList title="Explore these recipes" class="RandomRecipes center" />
        </b-col>
        <b-col>
          <span v-if="!$root.store.username">
            <login id="login"/>
          </span>
          <span v-else>
            <RecipeWatched title="Last watched recipes" style="margin-top:3px"/>
          </span>
        </b-col>
      </b-row>
    </b-container>
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
