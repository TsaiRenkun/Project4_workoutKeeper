import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
import Workout from './workout.jsx';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

class Workoutlist extends React.Component {
  constructor() {
    console.log("constructing");
    super();
    this.state = {
      exercises: []
    };
  }

  getSingleWorkout(user,workout){
    const url = "/workoutlist/" + workout + "/" + user ;
    axios
      .get(url)
      .then(response => {
        console.log("WE ARE FKING IN thE FUCK U CB CB CB LIST MOSTHER FKER");
          console.log(response)
        const data = response.data;
        console.log(data);
        this.setState({ exercises: data.rows });
      })
      .catch(error => {
        console.log(error);
      });
  }

  markAsCompleted(user,workout,removeWorkout,index){
  const url = "/workoutlist/" + workout + "/" + user ;
  axios.put(url, {
    user_id: user,
    id: workout
  })
  .then(function (response) {
    console.log(response);

    removeWorkout(index)
  })
  .catch(function (error) {
    console.log(error);
  });
}

  markAsMissed(user,workout){
    const url = "/workoutlist/" + workout + "/" + user + "/miss" ;
    axios.put(url, {
      user_id: user,
      id: workout
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    const cookie = this.props.cookieId;

    const exerciseslist = this.state.exercises.map((exercise)=>{
        return(
            <div>
                <p>name: {exercise.name}</p>
            </div>
        )
    })

    let workoutItems = this.props.workoutList.map((workout,index) => {
    if(workout.completed === null && moment(Date.now()).isBefore(moment(workout.expire_at))){
        let targeturl = "exampleModalCenter" + workout.id;
        let targetting = "#exampleModalCenter" + workout.id;
        let expiredate = moment(workout.expire_at).format('MMMM D, YYYY')
        let daysleft = (moment(workout.expire_at)).diff(moment(Date.now()), 'days')

      return (
        <Box p ={2}>
        <div key= {index} class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <p>Expires on : {expiredate}</p>
            <p>days left : {daysleft}</p>
            <h5 class="card-title">{workout.id}</h5>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target={targetting}
              onClick={() => {this.getSingleWorkout(this.props.cookieId,workout.id)}}
            >
              Show workout
            </button>
    
            
            <div
              class="modal fade"
              id={targeturl}
              tabIndex="index"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">
                      {workout.id}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    {exerciseslist}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button key ={workout.id} type="button" class="btn btn-primary" onClick={() => {this.markAsCompleted(cookie , workout.id, this.props.removeWorkout, index)}}>
                      Mark Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Box>
      );
    }
});

    return (
      <div>
        <Grid
    container
    direction="row"
    justify="space-evenly"
    alignItems="flex-start"
    >{workoutItems}</Grid>
        
      </div>
    );
  }
}
export default Workoutlist;
