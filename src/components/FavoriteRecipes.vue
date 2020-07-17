<template>
    <b-container>
        <b-col>
            <b-row v-if="error">
                <h2 style="text-align: center; font-style: oblique; margin-top:15px; margin-left: 22%;">{{error}}</h2>
            </b-row>
            <b-row v-else v-for="r in recipes2" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r" />
            </b-row>
        </b-col>
    </b-container>
</template>

<script>
    import RecipePreview from "./RecipePreview.vue";
    export default {
        name: "FavoriteList",
        data(){
            return{
                recipes2: [],
                error: null,
            };
        },
        components: {
            RecipePreview
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
            try {
                const response = await this.axios.get(
                "http://localhost:3000/profile/favorites",
                );
                this.error=null;
                const ids = response.data;
                var length = ids.length;
                let recipesFromAns=[];
                this.recipes2 = [];
                for(let i=0; i<length; i++){
                    let resp;
                    resp = await this.axios.get(
                    `https://recipes-from-gramma.herokuapp.com/recipe/Information/${ids[i]['recipe_id']}`,
                    );
                    recipesFromAns.push(resp.data.data);
                    console.log(resp.data.data)
                }
                this.recipes2.push(...recipesFromAns);
            } catch (error) {
                if(error.response.data.message === 'unauthorized'){
                    this.$root.store.logout();
                    this.$router.push("/login").catch(() => {
                    this.$forceUpdate();});
                }
                else{
                    this.error = "Sorry, you dont have any favorites yet";
                }
            }
            }
        }
    };

</script>
<style>
</style>