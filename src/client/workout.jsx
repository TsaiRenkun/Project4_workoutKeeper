import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


class Workout extends React.Component {
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
        </div>
        )
    }
}
export default Workout