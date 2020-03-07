import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


class Workout extends React.Component {

    createWorkout(key,data,clearlist){
        console.log("YOU ARE CREATE ASIOSSOXOCSOXOS  WORKOUY")
        console.log(key)
        axios.post('/workout', {
            userId: key
          })
          .then(function (response) {
              console.log("LOADINg MORE StuUFF")
              console.log(data, "THIS IS LIST OF THINGS SO FK YOU")
            data.map((exercise)=>{
                axios.post('/workout/' + response.data.rows[0].id, {
                    exerciseId: exercise.id,
                    userId: response.data.rows[0].user_id
                  })
                  .then(function (response) {
                    console.log(response);
                    clearlist();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            })
          })
          .catch(function (error) {
            console.log(error);
          });
          
      }

    render(){

        let exercises = this.props.workList.map((exercise,index)=>{
            return (
                <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                <h5 class="card-title">{exercise.name}</h5>
                <button key={index} onClick ={()=>{this.props.removeExercise({index})}}>Remove</button>
                </div>
            </div>
            )
        })

        return(
        <div>
            HELLO
            {exercises}
            
            <button type="Submit"  onClick ={()=>{this.createWorkout(this.props.cookieId.userId, this.props.workList, this.props.clear)}}>Submit</button>
        </div>
        )
    }
}
export default Workout