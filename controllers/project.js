const sha256 = require('js-sha256');

module.exports = (db) => {
  
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const showRegisterPage = (request, response) => {
        response.render('users/register');
  };

  const showLoginPage = (request, response) => {
    response.render('users/login');
};

  const registerUser = (request,response) => {
    let data = {
        username: request.body.username,
        password: request.body.password,
    }
    db.key.newUser(data, (error,result,cookie)=>{
        let user_id = result.rows[0].id
        response.cookie('loggedIn', cookie);
        response.cookie('userId', user_id);
        response.redirect('/');
    })
  }

  const loginUser = (request,response)=> {

    console.log(request.body.username)

    let data = {
        name: request.body.username
    }

    db.key.findUser(data,(err,result,cookie)=>{
        if(result.rows.length === 0){
            console.log("adjhaskdhsakjdhsajkdsa", err);
            response.redirect('/register');
        } else {
            console.log(result.rows);
            let hashedPw = sha256(request.body.password + result.rows[0].salt)
            if(result.rows[0].password === hashedPw){
                let user_id = result.rows[0].id
                response.cookie('loggedIn', cookie);
                response.cookie('userId', user_id);
                response.redirect('/');
            }
        }
    })
  }

  const getBodyPart = (request,response) => {
    db.key.findBodyPart((err,results)=>{
      response.send(results.rows)
    })
  }

  const getExercise = (request,response) => {
    let data = {
      keyId: request.params.id
    }

    db.key.findExercise(data, (err,results)=>{
      response.send(results.rows)
    })

  }

  const getSingleExercise = (request,response) => {
    let data = {
      keyId: request.params.id
    }
    
    db.key.findSingleExercise(data,(err,results)=>{
      response.send(results.rows[0])
    })
  }


  const createWorkout = (request,response) => {
    let data = {
      userId: request.body.userId
    }
    console.log("YOU ARE INSIDE WORKOUY")
    console.log(data)

    db.key.postWorkout(data, (err,results)=>{
      response.send(results)
    })
  }

  const addExercise = (request,response)=>{
    let data = {
      workoutId: request.params.id,
      exerciseId: request.body.exerciseId,
      userId: request.body.userId
    }
    
    console.log("YOU ARE INSIDE ADDDING STUFF IN WORKO OYUOUADFBJHSADSAYGSDGGUYSJADJASDGYDSADSADSGYJDAS")
    console.log(data)

    db.key.insertExercises(data, (err,results)=>{
      response.send(results)
    })
  }

  const showWorkoutList = (request,response)=>{

    let data = {
      userId: request.params.id,
    }

    console.log("INSDIE SHOWING WORKOUT LIST AND STUFF SO FK YOU UNDERSTNS S", data)

    db.key.getWorkoutList(data, (err,results)=>{
      response.send(results)
    })
  }

  const showSingleWorkout = (request,response)=>{

    let data = {
      userId: request.params.user_id,
      workoutId: request.params.id
    }
    
    console.log("WE ARE HERE INSDE EACH WORKOJUT ONEO ON EOENOENOENOE " , data)
    db.key.getExerciseinWorkout(data, (err,results)=>{
      response.send(results)
    })
  }

  const updateWorkout = (request,response) => {

    let data = {
      userId: request.body.user_id,
      workoutId: request.body.id
    }

    console.log(data , "UPDAREING COMPLETED")
    db.key.markAsCompleted(data, (err,results)=>{
      response.send(results.rows)
    })
  }

  const logOut = (req, res) => {
    res.clearCookie("loggedIn");
    res.clearCookie("userId");
    res.redirect('/');
  };

  


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    showLoginPage,
    showRegisterPage,
    registerUser,
    loginUser,
    getBodyPart,
    logOut,
    getExercise,
    getSingleExercise,
    createWorkout,
    addExercise,
    showWorkoutList,
    showSingleWorkout,
    updateWorkout,
  };

}
