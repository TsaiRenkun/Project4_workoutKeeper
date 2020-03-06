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

    console.log("getting different Exercises");

    let data = {
      keyId: request.params.id
    }

    db.key.findExercise(data, (err,results)=>{
      response.send(results.rows)
      console.log(results.rows, "Returning the first set of things")
    })

  }

  const getSingleExercise = (request,response) => {
    console.log( "DATADATA DATADADADAD")

    let data = {
      keyId: request.params.id
    }
    
    db.key.findSingleExercise(data,(err,results)=>{
      response.send(results.rows[0])
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
  };

}
