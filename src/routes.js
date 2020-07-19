import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/personalRecipe/:recipeId",
    name: "personalRecipe",
    component: () => import("./pages/PersonalViewPage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage.vue"),
  },
  {
    path:"/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritePage.vue"),
  },
  {
    path:"/personal",
    name: "personal",
    component: () => import("./pages/PersonalPage.vue"),
  },
  {
    path:"/family",
    name: "family",
    component: () => import("./pages/FamilyPage.vue"),
  },
  {
    path:"/meal",
    name: "meal",
    component: () => import("./pages/PlanMealPage.vue"),
  },
  {
    path:"/Prepare/:recipeId",
    name: "Prepare",
    component: () => import("./pages/preperationPage.vue")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
