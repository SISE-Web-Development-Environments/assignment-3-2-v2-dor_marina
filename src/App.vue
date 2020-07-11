<template>
  <div id="app">
    <nav id="nav">
      <span id="title" :to="{ name: 'main' }">Recipes For You</span>
      <router-link :to="{ name: 'main' }" tag="a" class="a" >Home</router-link>
      <router-link :to="{ name: 'search' } " tag="a" class="a">Search</router-link>
      <router-link :to="{ name: 'about' } " tag="a" class="a">About</router-link>
      <span class="isLogged">
        <span v-if="!$root.store.username">
          <a class="a" style="color:white; font-weight: 300;"> hello guest!</a>
          <router-link :to="{ name: 'register' }" tag="a" class="a">Register</router-link>
          <router-link :to="{ name: 'login' }" tag="a" class="a">Login</router-link>
        </span>
        <span v-else>
          <b-dropdown id="dropdown-1"  class="m-md-2">
            <template v-slot:button-content>
                {{$root.store.username}}
            </template>
            <b-dropdown-item :to="{ name: 'favorites' }">Favorites</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'personal' }" >Personal</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family' }">Family</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'createNew' }">Create Recipe</b-dropdown-item>
            <!-- <div class="dropdown-divider"></div> -->
            <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
          </b-dropdown>
          <!-- <button @click="Logout">Logout</button> -->
        </span>
      </span>
    </nav>
    <router-view id="add"/>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style>
@import url('/src/assets/style.css');

@font-face {
  font-family: gentleFont;
  src: url('./assets/Amsterdam-VwYy.ttf');
}
#drop{
  font-size: 10px;
  overflow: hidden;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url('./assets/wood6.jpg');
  background-size: 100% 100%;
}
.isLogged{
 float:right;
 margin-right: 5%;
}



#nav a.router-link-exact-active {
  color:rgba(255, 253, 128, 0.5);
  text-shadow: 4px 4px 0px #462319af;
}

#add{
  background: rgba(245, 245, 245, 0.5);
  background-size:cover;
}

nav
{
    padding: 30px;
    background: #462319af;
    width:100%;
}


#title{
  display:inline;
  font-family: gentleFont;
  font-size: 30px;
  background: -webkit-linear-gradient(rgb(245, 243, 147), #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 15%;

}

.a
{
    float: left;
    position: relative;
    /* width: 33.333%; */
    text-align: center;
    color: #cacaca;
    text-decoration: none;
     font-family: 'Droid serif', serif; font-size: 30px; font-weight: 600; font-style: italic; margin: 0 0 3px;
    padding: 1px 20px;
    transition: 0.2s ease color;
     text-shadow: 2px 2px 0px #0d2507, 
                  3px 3px 0px #7a2518;
}
/* 
.text{
  color: #cacaca;
  text-decoration: none;
  font-family: 'Droid serif', serif; font-size: 20px; font-weight: 300; font-style: italic; line-height: 44px; margin: 0 0 12px;
} */
nav a:before, nav a:after
{
    content: "";
    position: absolute;
    border-radius: 100%;
    transform: scale(0);
    transition: 0.2s ease transform;
}

nav a:before
{
    top: 0;
    left: 10px;
    width: 5px;
    height: 5px;
}

nav a:after
{
    top: 8px;
    left: 18px;
    width: 3px;
    height: 3px;
}


nav a:nth-child(2):before
{
    background-color: rgb(245, 243, 147);
}

nav a:nth-child(2):after
{
    background-color: #333;
}

nav a:hover
{
    color: rgba(255, 253, 128, 0.644);
}

nav a:hover:before, nav a:hover:after
{
    transform: scale(2);
}

</style>
