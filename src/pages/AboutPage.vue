<template>
  <b-container>
    <b-row id=container style="text-align: center;">
      <!-- <div id=container> -->
        About
        <div id=flip>
          <div><div>Our Families</div></div>
          <div><div>Us</div></div>
          <div><div>The Project</div></div>
        </div>
    </b-row>
    <b-row>
      <b-col class="TEXT" style="background-color: #48f1da2d">
        <div class="TITLE1">
          About Us.
        </div>
      </b-col>
      <b-col class="TEXT" style="background-color: #48f1da2d">
        <div>
          The creators of this website are Marina Botvinnik and Dor Elkabetz.
        </div>
        <div>
          Each one of us worked really hard on this website to make it look great, 
          and work great as well! We enjoyed taking this course a lot. 
          It gave us the opportunity not only to code the back-end as we usually do but to decorate and style the front-end so the final result will not only work well but look like an (almost) real website!
          <div><u>Here are some links to our previous assignments:</u></div>
        </div>
        <li> <a href="https://sise-web-development-environments.github.io/204096242/" target="_blank"><b>Dors website</b></a> </li>
        <li> <a href="https://sise-web-development-environments.github.io/317522605/" target="_blank"><b>Marinas website</b></a> </li>
        <li> <a href="https://sise-web-development-environments.github.io/assignment2-dor-marina/" target="_blank"><b>Our pacman game</b></a> </li>
        <li> <a href="https://github.com/SISE-Web-Development-Environments/assignment3-1-dor_marina" target="_blank"><b>API assignment</b></a> </li>
        <li> <a href="https://github.com/SISE-Web-Development-Environments/assignment-3-2-dor_marina" target="_blank"><b>Back-end assignment</b></a> </li>
      </b-col>
    </b-row>
     <b-row>
       <b-col class="TEXT" style="background-color:#f3b94e49 ;">
        <div>
          For the family recipes, we asked Dors's mom and Marina's grandmother.
        </div>
        <div>
          We have taken the recipes that most characterized by our family's daily life.
        </div>
        <div>
          <b>Marina:</b> One of the most common food that we eat at home is borscht, 
          and my gramma makes the pest borscht I have ever tasted! 
          I asked her to make me a portion and later I will show her how cool her recipe looks on the website. 
          The next two recipes were her choice. Draniki are an easy and super tasty pancakes that made from potatoes, 
          kinda like Levivot. The coffee is my grandma favorite drink, she makes it in a special way. Hope you enjoy it all!
        </div>
        <div>
          <b>Dor:</b> I asked my mom to choose 3 recipes that will be fun for her to make. 
          She chose to do a Moroccan fish, that we love to eat on Friday evening meals when I come home. 
          Another recipe is spaghetti bolognese. It's actually not from my culture, but my mom makes the best bolognese! 
          All of my friends hope that I will bring a portion for them when I'm visiting my family. the least recipe she chose is matbuha, 
          just because it goes great with everything. You should try every one of the recipes in your free time, A great meal guaranteed!
        </div>
      </b-col>
      <b-col class="TEXT" style="background-color:#f3b94e49 ;">
        <div class="TITLE2">
          About Our Families.
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="TEXT" style="background-color:#e240603f ;">
        <div class="TITLE3">
          About The Project.
        </div>
      </b-col>
      <b-col class="TEXT"  style="background-color:#e240603f ;">
        <div>
          We had a lot of fun (even with the stress of the exams and the corona) to make this website. 
          The backend was the hardest part for us to understand, while the frontend maybe was difficult in some points but much more enjoyable to make. 
          Overall we think the idea of the project fitted us perfectly, mainly because we both <u>love</u> food! The part where we constantly saw yummy recipes was a pleasure mixed with suffering, and besides learning to be a full-stack developer, we learned a recipe or two :-)
        </div>
      </b-col>
    </b-row>
    <b-row style="text-align: center;">
      <img src="../assets/dog.gif">
    </b-row>
  </b-container>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:700');

img{
  display:block;
  margin-left: 32%;
  margin-top: 30px;
  margin-bottom: 20px;
}
.TITLE1{
  font-size: 40px;
  margin-top: 30%;
  text-align: center;
  
}
.TITLE2{
  font-size: 40px;
  margin-top: 55%;
  text-align: center;
  
}
.TITLE3{
  font-size: 40px;
  margin-top: 20%;
  text-align: center;
  
}
.TEXT{
  text-align: left;
   font-family: Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace;
   font-size: large;
   margin-top:50px;;
}

#container {
  color:rgb(95, 95, 95);
  text-transform: uppercase;
  font-size:36px;
  font-weight:bold;
  /* font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
  /* padding-top:200px;   */
  /* position:fixed; */
  width:100%;
  /* bottom:10%; */
  display:inline-block;
  font-family:'Roboto';
  text-align:center;
}

#flip {
  height:50px;
  overflow:hidden;
}

#flip > div > div {
  color:rgb(255, 255, 255);
  padding:4px 12px;
  height:45px;
  margin-bottom:45px;
  display:inline-block;
}

#flip div:first-child {
  animation: show 5s linear infinite;
}

#flip div div {
  background:#48f1db;
}
#flip div:first-child div {
  background:#f3b94e;
  
}
#flip div:last-child div {
  background:#e24060;
}

@keyframes show {
  0% {margin-top:-270px;}
  5% {margin-top:-180px;}
  33% {margin-top:-180px;}
  38% {margin-top:-90px;}
  66% {margin-top:-90px;}
  71% {margin-top:0px;}
  99.99% {margin-top:0px;}
  100% {margin-top:-270px;}
}

</style>