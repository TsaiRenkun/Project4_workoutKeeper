const sha256 = require('js-sha256');

module.exports = (db) => {
  
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let showRegisterPage = (request, response) => {
        response.render('users/register');
  };

  let showLoginPage = (request, response) => {
    response.render('users/login');
};

  let registerUser = (request,response) => {
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

  let loginUser = (request,response)=> {

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

  let getBodyPart = (request,response) => {
    console.log("HELLEAWEWLEAE")
    db.key.findBodyPart((err,results)=>{
      response.send(results.rows)
    })
  }

  let logOut = (req, res) => {
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
  };

}
