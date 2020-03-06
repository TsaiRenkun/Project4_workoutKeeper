/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

const crypto = require('crypto');
const sha256 = require('js-sha256');

module.exports = (Pool) => {

  const verifyUser = (data,callback)=>{
    let values = [data.id]
    let query = 'SELECT * FROM users WHERE id = $1'
    Pool.query(query,values,(err,res,cookie)=>{
        if (err) {
            callback(err,null)
        } else {
            let cookie = res.rows[0].salt
            callback(null,res,cookie)
        }
    })
  }

  const newUser = (data, callback) => {
    console.log("NEW NEW NEWN EWN EWN EWN")
    console.log(data)
    let salt;
    let newPassword;
    crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.log(error)
          throw err;
          }
            salt = buf.toString('hex');
            newPassword = sha256(data.password + salt);
            let values = [data.username, newPassword , salt];
            let query = 'INSERT INTO users (name,password,salt) VALUES ($1,$2,$3) RETURNING *';
            Pool.query(query,values,(err,res,cookie)=>{
            
        if(err){
                callback(err,null,null)
            } else {
                let cookie = salt;
                callback(null,res,cookie)

            }
        });
    })
  }

  const findUser = (data,callback)=> {

    let values = [data.name];
    let query = 'SELECT * from users WHERE name = $1';

    Pool.query(query,values,(err,res,cookie)=>{
        if(err){
            callback(err,null)
        } else {
            let cookie = res.rows[0].salt;
            callback(null,res,cookie)
        }
    })
}

  const findBodyPart = (callback) => {

    let query = 'SELECT * from bodypart';

    Pool.query(query,(err,res)=>{
      if(err){
        callback(err,null)
      } else {
        callback(null,res)
      }
    })
  }

  const findExercise = (data, callback) => {

    let values = [data.keyId];
    let query = 'SELECT * from exercise WHERE bodypart_id = $1'; 

    Pool.query(query,values,(err,res)=>{
      if(err){
          callback(err,null)
      } else {
          callback(null,res)
      }
    })
  }

  const findSingleExercise = (data, callback) =>{

    let values = [data.keyId];
    let query = 'SELECT * from exercise WHERE id = $1';

    Pool.query(query,values,(err,res)=>{
      if(err){
          callback(err,null)
      } else {
          callback(null,res)
      }
    })

  }

  return {
    newUser,
    verifyUser,
    findUser,
    findBodyPart,
    findExercise,
    findSingleExercise,
  };
};
