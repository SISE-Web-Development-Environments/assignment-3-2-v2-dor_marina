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
        <div class="TITLES">
          About Us.
        </div>
      </b-col>
      <b-col class="TEXT" style="background-color: #48f1da2d">
        <div>
          The creators of this website are Marina Botvinnik and Dor Elkabetz.
        </div>
        <div>
          Each one of us worked really heard on this website to make it look great, and work great as well!
          We enjoyed to take this course a lot. It gave us oportunity not only to code the "back-end" as we usualy do, 
          but to decorate and style the "front-end" so the final result will not noly work well but look like an (almost) real website!
        </div>
      </b-col>
    </b-row>
     <b-row>
       <b-col class="TEXT" style="background-color:#f3b94e49 ;">
        <div>
          The creators of this website are Marina Botvinnik and Dor Elkabetz.
        </div>
        <div>
          Each one of us worked really heard on this website to make it look great, and work great as well!
          We enjoyed to take this course a lot. It gave us oportunity not only to code the "back-end" as we usualy do, 
          but to decorate and style the "front-end" so the final result will not noly work well but look like an (almost) real website!
        </div>
      </b-col>
      <b-col class="TEXT" style="background-color:#f3b94e49 ;">
        <div class="TITLES">
          About Our Families.
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="TEXT" style="background-color:#e240603f ;">
        <div class="TITLES">
          About The Project.
        </div>
      </b-col>
      <b-col class="TEXT"  style="background-color:#e240603f ;">
        <div>
          The creators of this website are Marina Botvinnik and Dor Elkabetz.
        </div>
        <div>
          Each one of us worked really heard on this website to make it look great, and work great as well!
          We enjoyed to take this course a lot. It gave us oportunity not only to code the "back-end" as we usualy do, 
          but to decorate and style the "front-end" so the final result will not noly work well but look like an (almost) real website!
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

<style >
@import url('https://fonts.googleapis.com/css?family=Roboto:700');

img{
  display:block;
  margin-left: 30%;
  margin-top: 30px;
  margin-bottom: 20px;
}
.TITLES{
  font-size: 40px;
  margin-top: 15%;
  
}
.TEXT{
  text-align: center;
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