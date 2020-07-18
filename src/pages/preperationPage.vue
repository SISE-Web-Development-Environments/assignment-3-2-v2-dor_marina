<template>
    <div class="container">
        <div v-if="recipe">
            <div class="recipe-header mt-3 mb-4">
                <h1 style="text-align: center; font-style: oblique; margin-bottom:15px;">{{ recipe.title }}</h1>
                <b-col>
                <img :src="recipe.image" class="center" style="filter: contrast(150%); border-radius: 8px;"/>
                </b-col>
                <b-col>
                </b-col>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
      recipe: null,
    };
  },
  created() {
      this.recipe=this.$root.store.pereparedRecipe;
  }
};
</script>