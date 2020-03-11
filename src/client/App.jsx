import React from 'react';
import { hot } from 'react-hot-loader';
import Cookies from 'universal-cookie';
import BodyPart from './bodypart.jsx'
import Exercise from './exercise.jsx';
import Workout from './workout.jsx';
import Workoutlist from './workoutlist.jsx'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import Drawertable from "./drawer.jsx";
import Grid from '@material-ui/core/Grid';
import History from './history.jsx';
import Pie from './piechart.jsx';
import Line from './linechart.jsx'

class App extends React.Component {

  constructor(){
    console.log("constructing");
      super()
    this.state = {
      page: "Dashboard",
      cookie: "",
      exercise :[],
      workout: [],
      workoutList: [],
      fullBody: [],
      lowerBody: [],
      upperBody: [],
      historyMissed: [],
      historyCompleted: [],
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
      this.getFullBody()
      }
    }
  
    getFullBody() {
      const url = '/all';
      console.log(url)
      axios
        .get(url)
        .then(response => {
            console.log(response)
          const data = response.data;
          this.setState({ fullBody: data.rows });
        })
        .catch(error => {
          console.log(error);
        });
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
          console.log(data, "GETTING ALL WORKOUT")
          this.setState({ workoutList: data.rows });
        })
        .catch(error => {
          console.log(error);
        });
    }

  render() {

    const myCallback = (exercises) => {
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

    const removeFromWorkoutList = (index) => {
      let array = this.state.workoutList
      array.splice(index, 1)
      this.setState({workoutList : array})
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
    }

    const pageFinder = (pageName) => {
      this.setState({page: pageName})
      console.log(this.state.page)
    }

    const getHistory = (completed) => {
      this.setState({historyCompleted: completed})
      console.log(this.state.historyCompleted)
      console.log(this.state.historyMissed)
    }

    const getHistoryMiss = (missed) => {
      this.setState({historyMissed: missed})
      console.log(this.state.historyCompleted)
      console.log(this.state.historyMissed)
    }

    let content;

    if(this.state.page === "Addworkout"){
      content = (
      <div class="container">
      <div class="row">
          <div class="col-sm">
            <h2>BodyPart</h2>
            <BodyPart exerciseCallback = {myCallback} />
        </div>
      <div class="col-sm">
            <h2>Exercises</h2>
            <Exercise exerciseShow = {this.state.exercise} addingExercise = {addExercise}/>
        </div>
      <div class="col-sm">
          <h2>Workout</h2>
          <Workout workList ={this.state.workout} removeExercise = {removeFromWorkout} cookieId = {this.state.cookie} clear = {clearWorkout}/>
        </div>
      </div>
    </div>
      )
    } else if (this.state.page === "History") {
      content = (
      <div class="container">
      <History cookieId = {getCookie()} completed = {this.state.historyCompleted} missed = {this.state.historyMissed} gettingHistory = {getHistory} missHistory = {getHistoryMiss}/> 
      </div>
      )
    } else if (this.state.page === "Dashboard"){
      if(this.state.workoutList.length === 0){
      content = (
        <div>
          <div class="jumbotron">
            <h1 class="display-4">Hello, Your List is Empty!</h1>
            <p class="lead">Get started on building your workout habits!</p>
            <hr class="my-4"/>
            <p>Click the button to Add a Workout!.</p>
            <a class="btn btn-primary btn-lg" onClick = {() => {pageFinder('Addworkout')}} role="button">It's Time</a>
          </div>
      </div>
      )
      } else {
        content = (
          <div>
              <Workoutlist cookieId = {getCookie()} workoutList = {this.state.workoutList} removeWorkout = {removeFromWorkoutList} />
          </div>
        )
      } 
    } else if (this.state.page === "Stats"){
     content = (
        <div>
        <Pie completed = {this.state.historyCompleted} missed = {this.state.historyMissed}/>
        <Line completed = {this.state.historyCompleted}/>
      </div>
     )
    }

    return (
      <div>
        <Drawertable pageFind = {pageFinder} cookiesCheck = {this.state.cookie}>
        {content}
      </Drawertable>
    </div>
    );
  }
}

export default hot(module)(App);
