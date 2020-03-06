import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

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
            <div class="card-body">
                <h5 class="card-title">{exercise.name}</h5>
                <button key={exercise.id} onClick ={()=>{this.addToWorkout(exercise.id)}}>Add to Workout</button>
                </div>
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
