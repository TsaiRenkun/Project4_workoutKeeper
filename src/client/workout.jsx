import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Workoutlist from './workoutlist.jsx'
import CloseIcon from '@material-ui/icons/Close';

class Workout extends React.Component {

    createWorkout(key,data,clearlist){
        console.log(key)
        axios.post('/workout', {
            userId: key
          })
          .then(function (response) {
              console.log(response.data.rows[0])
              console.log(data)
              
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
                <div>
                <h5 class="card-title">{exercise.name}<CloseIcon key={index} onClick ={()=>{this.props.removeExercise({index})}}>Remove</CloseIcon></h5>
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