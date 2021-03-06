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
  app.get('/workoutlist/:id/:user_id', controllerCallbacks.showSingleWorkout);
  app.put('/workoutlist/:id/:user_id', controllerCallbacks.updateWorkout);
  

  app.get('monthly/:id', controllerCallbacks.getMonthly)
  app.get('/history/:id', controllerCallbacks.getHistory)
  app.get('/all', controllerCallbacks.getAllExercise);
  app.get('/chest/2',controllerCallbacks.getExercise)
  app.get('/back/4',controllerCallbacks.getExercise)
  app.get('/legs/1',controllerCallbacks.getExercise)

 
};
