import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Cookies from "universal-cookie";

class Workoutlist extends React.Component {
  constructor() {
    console.log("constructing");
    super();
    this.state = {
      workoutList: [],
      exercises: []
    };
  }

  getAllWorkout(key) {
    const url = "/workoutlist/" + key;
    axios
      .get(url)
      .then(response => {
        console.log("WE ARE FKING IN thE WORK OUT LIST MOSTHER FKER");
        //   console.log(response)
        const data = response.data;
        console.log(data.rows);
        this.setState({ workoutList: data.rows });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSingleWorkout(user,workout){
    const url = "/workoutlist/" + workout + "/" + user ;
    axios.post('/workoutlist/' + workout + '/update', {
        userId: key
      })
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

  markAsCompleted(key){
  const url = "/workoutlist/" + workout + "/update" ;
  axios
    .get(url)
    .then(response => {
      console.log("UPDATE WORKOUT STUFF HAHAHAHHA");
        console.log(response)
      const data = response.data;
      console.log(data);
      this.setState({ exercises: data.rows });
    })
    .catch(error => {
      console.log(error);
    });
}

  render() {
    const cookie = this.props.cookieId.userId;
    const exerciseslist = this.state.exercises.map((exercise)=>{
        return(
            <div>
                <p>name: {exercise.name}</p>
            </div>
        )
    })
    const workoutItems = this.state.workoutList.map(workout => {
      return (
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">{workout.id}</h5>
            <button key={workout.id} onClick={() => {}}>
              view to Workout
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => {this.getSingleWorkout(cookie,workout.id)}}
            >
              Show workout
            </button>
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
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
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        HELLLOOO
        <button
          onClick={() => {
            this.getAllWorkout(cookie);
          }}
        >
          view to Workout
        </button>
        {workoutItems}
      </div>
    );
  }
}
export default Workoutlist;
