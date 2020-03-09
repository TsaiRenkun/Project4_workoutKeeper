import React from 'react';
import { hot } from 'react-hot-loader';
import Cookies from 'universal-cookie';
import BodyPart from './bodypart.jsx'
import Nav from './Nav.jsx';
import Exercise from './exercise.jsx';
import Workout from './workout.jsx';
import Workoutlist from './workoutlist.jsx'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

class App extends React.Component {

  constructor(){
    console.log("constructing");
      super()
    this.state = {
      cookie: "",
      exercise :[],
      workout: [],
      workoutList: [],
      } 
    }

    componentDidMount(){
      console.log("Done rendering stuff")
      const cookies = new Cookies();
      cookies.get();
      if(cookies){
      this.setState({cookie: cookies.cookies})
      console.log(cookies.cookies.userId)
      this.getAllWorkout(cookies.cookies.userId)
      }
    }

    getAllWorkout(key) {
      const url = "/workoutlist/" + key;
      console.log(url)
      axios
        .get(url)
        .then(response => {
          console.log("WE ARE FKING IN thE WORK OUT LIST MOSTHER FKER");
            console.log(response)
          const data = response.data;
          console.log(data.rows);
          this.setState({ workoutList: data.rows });
        })
        .catch(error => {
          console.log(error);
        });
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

    const clearWorkout = () => {
      let array = []
      this.setState({workout : array})
    }

    const getCookie = () => {
      const cookies = new Cookies();
      cookies.get('');
      if(cookies){
        return cookies.cookies.userId
      }
    }

    const addWorkout = (workout) => {
      this.setState({workoutList: [workout, ...this.state.workoutList]})
      console.log(this.state.workoutList , "STATE STATE STATE")
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
                <Workout workList ={this.state.workout} removeExercise = {removeFromWorkout} cookieId = {this.state.cookie} clear = {clearWorkout} addingWorkoutList = {addWorkout}/>
              </div>
          </div>
      </div>
      <div>
          <Workoutlist cookieId = {getCookie()} workoutList = {this.state.workoutList} />
      </div>
    </div>
    );
  }
}

export default hot(module)(App);
