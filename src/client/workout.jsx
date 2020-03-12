import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Workoutlist from './workoutlist.jsx'
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';

class Workout extends React.Component {

    createWorkout(key,data,clearlist,updatelist){
        console.log(key)
        axios.post('/workout', {
            userId: key
          })
          .then(function (response) {

            updatelist(response.data.rows[0])
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
                <Paper style={{display: "flex", justifyContent: "space-between",alignItems: "center", width: "400px",height: "65px"}}>
                <h5 class="card-title">{exercise.name}</h5>
                <p><CloseIcon key={index} onClick ={()=>{this.props.removeExercise({index})}}>Remove</CloseIcon></p>
                </Paper>
                </div>
            )
        })

        return(
        <div>
            {exercises}
            <button className = "btn btn-primary mt-2"type="Submit"  onClick ={()=>{this.createWorkout(this.props.cookieId.userId, this.props.workList, this.props.clear, this.props.updatingWorkout)}}>Submit</button>
        </div>
        )
    }
}
export default Workout