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

  const postWorkout = (data , callback)=>{
    let values = [data.userId];
    let query = "INSERT into workout (user_id) VALUES ($1) RETURNING *"
    
    Pool.query(query,values,(err,res)=>{
      if(err){
          callback(err,null)
      } else {
          callback(null,res)
      }
    })
  }

  const insertExercises = (data, callback)=>{
    let values = [data.workoutId, data.exerciseId, data.userId]
    let query = "INSERT into exercise_workout (workout_id, exercise_id, user_id) VALUES ($1, $2, $3) RETURNING *"

    Pool.query(query,values,(err,res)=>{
      if(err){
          callback(err,null)
      } else {
          callback(null,res)
      }
    })
  }

  const getWorkoutList = (data,callback) => {
    let values = [data.userId]
    let query = "SELECT workout.id, workout.user_id, workout.completed, workout.missed , workout.expire_at, workout.created_at from workout INNER JOIN users ON (workout.user_id = users.id) WHERE users.id = $1";
    Pool.query(query,values,(err,res)=>{
      if(err){
          callback(err,null)
      } else {
          callback(null,res)
      }
    })
  }

  const getExerciseinWorkout = (data, callback) => {
    let values = [data.workoutId, data.userId]
    let query = "SELECT * from exercise_workout INNER JOIN workout ON(exercise_workout.workout_id = workout.id) INNER JOIN exercise ON(exercise_workout.exercise_id = exercise.id) WHERE (workout.id = $1 AND exercise_workout.user_id = $2)";

    Pool.query(query,values,(err,res)=>{
      if(err){
          console.log(err)
          callback(err,null)
      } else {
          console.log(res)
          callback(null,res)
      }
    })
  }

  const getSingleWorkout = (data, callback) => {
    let values = [data.workoutId, data.userId]
    let query = "SELECT * FROM workout WHERE id= $1 AND user_id = $2";

    Pool.query(query,values,(err,res)=>{
      if(err){
          console.log(err)
          callback(err,null)
      } else {
          console.log(res)
          callback(null,res)
      }
    })
  }


  const markAsCompleted = (data, callback) => {
    let values = [data.workoutId, data.userId]
    let query = "UPDATE workout SET completed = 'true' WHERE id= $1 AND user_id = $2 RETURNING *";

    Pool.query(query,values,(err,res)=>{
      if(err){
          console.log(err)
          callback(err,null)
      } else {
          console.log(res)
          callback(null,res)
      }
    })
  }

  const markAsMissed = (data, callback) => {
    getSingleWorkout(data, (err,results)=>{
      console.log(results.data.rows)
    })
  }



  return {
    newUser,
    verifyUser,
    findUser,
    findBodyPart,
    findExercise,
    findSingleExercise,
    postWorkout,
    insertExercises,
    getWorkoutList,
    getExerciseinWorkout,
    markAsCompleted,
    markAsMissed,
    getSingleWorkout,
  };
};
