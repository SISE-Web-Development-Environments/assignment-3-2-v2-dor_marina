var express = require("express");
var router = express.Router();
const DButils = require("../modules/DButils");

router.use(function requireLogin(req, res, next) {
  if (!req.session.user_id) {
    next({ status: 401, message: "unauthorized" });
  } else {
    next();
  }
});

router.post("/addToMeal", async (req, res, next) => {
      try{
        let dupCheck = (await DButils.execQuery(`SELECT * FROM MealRecipes WHERE recipe_id = '${req.body.recipe_id}' AND user_id='${req.session.user_id}'`))
        if(dupCheck.length!=0){
          res.status(401).send("this recipe is already in your meal");
        }
        else{
          DButils.execQuery(`INSERT INTO MealRecipes VALUES (${req.session.user_id},${req.body.recipe_id})`);
          res.status(200).send({ message: "Recipe added to favorites successfully", success: true });
        }
  } catch (error) {
    next(error);
  }
});

router.get('/getNumberInMeal', async (req, res, next) => {
  try{
  const watched = ( await DButils.execQuery( `SELECT recipe_id FROM MealRecipes WHERE user_id = '${req.session.user_id}' `)) 
  const length = watched.length;
  res.status(200).send(length.toString());
  }
  catch(error){
    next(error)
  }
});

router.get('/getMealRecipes', async (req, res, next) => {
  try{
  const watched = ( await DButils.execQuery( `SELECT recipe_id FROM MealRecipes WHERE user_id = '${req.session.user_id}'`)) 
  if(watched.length ===0){
    res.status(401).send("there is no meal recipes by this user");
  }
  else{
  res.status(200).send(watched);
  }
  }
  catch(error){
    next(error)
  }
});

router.delete('/deleteRecipeFromMeal/:recipeID', async (req, res, next) => {
  try{
    await DButils.execQuery( `DELETE FROM MealRecipes WHERE recipe_id = '${req.params.recipeID}' and user_id = '${req.session.user_id}'`);
    res.status(200).send({message: "the recipe removed correctly",success: true});
  }
  catch(error){
    next(error)
  }
});

router.delete('/deleteAllFromMeal', async (req, res, next) => {
  try{
    await DButils.execQuery( `DELETE FROM MealRecipes WHERE user_id = '${req.session.user_id}'`);
    res.status(200).send({message: "all recipes removed correctly",success: true});
  }
  catch(error){
    next(error)
  }
});

router.get('/last3watched', async (req, res, next) => {
  try{
  const watched = ( await DButils.execQuery( `SELECT TOP 3 recipe_watched FROM recipesWatched WHERE user_id = '${req.session.user_id}' ORDER BY watched_at desc`)) 
  if(watched.length ===0){
    res.status(401).send("there is no recipes watched by this user");
  }
  else{
  res.status(200).send(watched);
  }
  }
  catch(error){
    next(error)
  }
});

router.get('/favorites', async (req, res, next) => {
  try{
  const fav = ( await DButils.execQuery( `SELECT recipe_id FROM FavoritesRecipes WHERE user_id = '${req.session.user_id}'`)) 
  if(fav.length ===0){
    res.status(403).send("there is no favorite recipes by this user");
  }
  else{
  res.status(200).send(fav);
  }
  }
  catch(error){
    next(error)
  }
});

router.get('/familyRecipesWhole', async (req, res, next) => {
  try{
    const family = ( await DButils.execQuery( `SELECT * FROM FamilyRecipes WHERE user_id = '${req.session.user_id}'`)) 
    if(family.length ===0){
      res.status(401).send("there is no family recipes for this user");
    }
    else{
      res.status(200).send(family);
    }
  }
  catch(error){
    next(error)
  }
});

router.get('/familyRecipesPreview', async (req, res, next) => {
  try{
    const family = ( await DButils.execQuery( `SELECT image,recipe_name,durationTime,vegetarian,vegan,gluten
    FROM FamilyRecipes WHERE user_id = '${req.session.user_id}'`)) 
    if(family.length ===0){
      res.status(401).send("there is no family recipes for this user");
    }
    else{
      res.status(200).send(family);
    }
  }
  catch(error){
    next(error)
  }
});

router.get('/personalRecipesWhole', async (req, res, next) => {
  try{
    const personal = ( await DButils.execQuery( `SELECT * FROM PersonalRecipes WHERE user_id = '${req.session.user_id}'`)) 
    if(personal.length ===0){
      res.status(401).send("there is no personal recipes for this user");
    }
    else{
      res.status(200).send(personal);
    }
  }
  catch(error){
    next(error)
  }
});

router.get('/personalRecipesPreview', async (req, res, next) => {
  try{
    const personal = ( await DButils.execQuery( `SELECT image,recipe_name,durationTime,vegetarian,vegan,gluten
     FROM PersonalRecipes WHERE user_id = '${req.session.user_id}'`)) 
    if(personal.length ===0){
      res.status(401).send("there is no personal recipes for this user");
    }
    else{
      res.status(200).send(personal);
    }
  }
  catch(error){
    next(error)
  }
});

//#endregion

module.exports = router;
