<template>
  <b-container>
              <b-row>
                  <b-col>
                     <h3 style="padding-bottom: 10px; text-decoration: underline;"> {{recipe.title}}</h3>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                     <h4 style="padding-bottom: 10px;"> Author: {{recipe.author}}</h4>
                  </b-col>
                </b-row>
                  <b-row>
                      <b-col>
                        <img :src="recipe.image" class="recipe-image"/>
                      </b-col>
                      <b-col>
                        <div class="recipe-overview">
                            <li>{{ recipe.readyInMinutes}} minutes</li>
                            <li>Vegeterian: {{ recipe.vegetarian}}</li>
                            <li>Gluten free: {{recipe.glutenFree}}</li>
                            <li>Vegan: {{recipe.vegan}}</li>
                            <li>Servings: {{recipe.servings}}</li>
                            <li>Usualy prepared in: {{recipe.usually_prepared}}</li>
                            <li>Main country: {{recipe.main_country}}</li>
                            <b-button id="prepare" pill size="lg" variant="dark" @click="prepareRecipe(recipe.id)" style="margin-top:2px; margin-right:20px">Prepare Recipe <span class="ec ec-fork-and-knife"></span></b-button>
                            <b-button id="meal" pill size="lg" variant="dark" @click="addToMeal(recipe.id)" style="margin-top:2px">Add To Meal 👨‍🍳</b-button>
                            <li v-if="message">{{message}}</li>
                        </div>
                      </b-col>
                  </b-row>
              <b-row style="padding-bottom:10px">
                  <b-col>
                      <h5> Ingredients:</h5>
                     <ul>
                        <li v-for="(i, index) in recipe.ingredients" :key="index + '_' + i.id">
                            {{ i}}
                        </li>
                    </ul>
                  </b-col>
                  <b-col>
                      <h5> Instructions:</h5>
                        <ol>
                        <li v-for="(k, index) in recipe.instructions" :key="index + '_' + k.id">
                            {{k}}
                        </li>
                        </ol>
                  </b-col>
              </b-row>
               <b-row v-if="recipe.more_photos">
                  <b-col>
                     <h4 style="padding-bottom: 10px;"> more photos:</h4>
                  </b-col>
                </b-row>
              <b-row v-if="recipe.more_photos">
                  <b-col v-for="(m, index) in recipe.more_photos" :key="index + '_' + m.id">
                     <img @click="zoom" :src="m" class="recipe-image"/>
                  </b-col>
                </b-row>
              <b-row>
                  <div id="bon">
                      Bon-Appetit!
                  </div>
              </b-row>
          </b-container>
</template>

<script scoped>
export default {
    name: "FamilyComponent",
    data(){
        return{
            message: ""
        }
    },
    props:{
        recipe:{
            type: Object,
            required: true
        }
    },
    methods:{
        async addToMeal(recipe_id){
            try {
                this.message="";
                this.$root.store.AddToMeal(recipe_id);
                const response = await this.axios.post(
                "http://localhost:3000/profile/addToMeal",
                {
                    recipe_id: recipe_id,
                },
                {withCredentials: true}
                );
                this.$root.store.number = this.$root.store.number+1;
                this.message="The recipe has been added to your meal!"
            } catch (err) {
                console.log(err.response);
                if(err.response.data == "this recipe is already in your meal"){
                this.message="The recipe is already in your meal!"
                }
                if(err.response.data.message === 'unauthorized'){
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
                // this.addToMeal(recipe_id);
            }
            this.$router.push({ name: "Prepare", params:{recipeId:recipe_id}});
            }
            catch (err) {
            console.log(err.response);
            this.form.submitError = err.response.data.message;
            }
        },
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
  height: 300px;
  width: auto;
  border-radius: 8px;
  margin-bottom: 30px;
  display: inline-block;
}
img:active {
  -webkit-transform: scale(2);
  transform: scale(2);

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