import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


class ExerciseShow extends React.Component {

    addToWorkout(key){
        
        const url = '/exercises/' + key;
          axios.get(url)
            .then((response) => {
              console.response
              const data = response.data
             
              this.props.addingExercise(data)
        
            }).catch((error)=>{
              console.log(error);
            })
      
      }

    render(){
        const exercisesid = this.props.exerciseShow.map((exercise)=>{
           return( 
            <div class="card" style={{width: "18rem"}}>
            <Paper onClick ={()=>{this.addToWorkout(exercise.id)}}>
                <div class="card-body">
                    <h5 class="card-title">{exercise.name}</h5>
                </div>
            </Paper>
            </div>
           )
         })
        return(
            <div>
            {exercisesid}
            </div>
            )
       
    }
}
export default ExerciseShow
