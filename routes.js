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
  app.get('/logout', controllerCallbacks.logOut);

  app.get('/bodyparts',controllerCallbacks.getBodyPart);
  app.get('/bodyparts/:id',controllerCallbacks.getExercise);

  app.get('/exercises/:id', controllerCallbacks.getSingleExercise);

  app.post('/workout', controllerCallbacks.createWorkout);
  
  app.post('/workout/:id', controllerCallbacks.addExercise);
  app.get('/workoutlist/:id', controllerCallbacks.showWorkoutList);
  app.put('/workoutlist/:id/update', controllerCallbacks.UpdateWorkout);
  app.get('/workoutlist/:id/:user_id', controllerCallbacks.showSingleWorkout);
  app.put('/workoutlist/:id/:user_id', controllerCallbacks.updateWorkout);

  app.get('user/')

  app.get('/arms')
  app.get('/chest')
  app.get('/back')
  app.get('/legs')
  app.get('/arms')
 
};
