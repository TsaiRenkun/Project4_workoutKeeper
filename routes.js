module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const controllerCallbacks = require('./controllers/project')(allModels);



  app.get('/register', controllerCallbacks.showRegisterPage);
  app.get('/login', controllerCallbacks.showLoginPage);
  app.post('/register', controllerCallbacks.registerUser);
  app.post('/login', controllerCallbacks.loginUser);
  
  //app.get('/pokemons/:id', pokemons.getPokemon);
};
