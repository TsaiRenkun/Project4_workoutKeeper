import React from 'react';
import { hot } from 'react-hot-loader';
import Cookies from 'universal-cookie';
import BodyPart from './bodypart.jsx'
import Nav from './Nav.jsx';
import Exercise from './exercise.jsx';
import Workout from './workout.jsx';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(){
    console.log("constructing");
      super()
    this.state = {
      cookie: "",
      exercise :[],
      workout: []
      } 
    }

    componentDidMount(){
      console.log("Done rendering stuff")
      this.getCookie()
    }

  getCookie(){
    const cookies = new Cookies();
    cookies.get('');
    if(cookies){
    this.setState({cookie: cookies.cookies})
    }
  }
  
  render() {

    const myCallback = (exercises)=>{
      this.setState({exercise: exercises})
    }

    const addExercise = (exercises) => {
      this.setState({workout: [exercises, ...this.state.workout]})
    }

    const removeFromWorkout = (index) => {
      let array = this.state.workout
      array.splice(index, 1)
      this.setState({workout : array})
    }

    return (
      <div>
        <div>
          <Nav cookiesCheck = {this.state.cookie}/>
        </div>
      <div class="container">
            <div class="row">
                <div class="col-sm">
                  <h2>Search for BodyPart</h2>
                  <BodyPart exerciseCallback = {myCallback} />
              </div>
            <div class="col-sm">
                  <h2>Exercises</h2>
                  <Exercise exerciseShow = {this.state.exercise} addingExercise = {addExercise}/>
              </div>
            <div class="col-sm">
                <h2>Workout</h2>
                <Workout workList ={this.state.workout} removeExercise = {removeFromWorkout}/>
              </div>
          </div>
      </div>
    </div>
    );
  }
}

export default hot(module)(App);
