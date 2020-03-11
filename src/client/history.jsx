import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Workoutlist from './workoutlist.jsx'
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';

class History extends React.Component {
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

    componentDidMount(){
        console.log("HISTORY Done rendering stuff")
        this.getHistory(this.props.cookieId, this.props.gettingHistory, this.props.missHistory)
      }

    getHistory(key, pastWorkout, missedArray) {
        const url = '/history/' + key;
        console.log(url)
        axios
          .get(url)
          .then(response => {
            console.log("HOSTROY GISTOROY HISTORY HISTORY");
              console.log(response)
            const data = response.data;
            
                pastWorkout(data.completed)
                missedArray(data.missed)
            
          })
          .catch(error => {
            console.log(error);
          });
      }

    render(){

    const exerciseslist = this.state.exercises.map((exercise)=>{
        return(
            <div>
                <p>name: {exercise.name}</p>
            </div>
            )
        })


        let completed = this.props.completed.map((workout,index)=>{
            let targeturl = "exampleModalCenter" + workout.id;
            let targetting = "#exampleModalCenter" + workout.id;
            return (
                <Box p ={2}>
                    <div key= {index} class="card" style={{ width: "18rem" }}>
                      <div class="card-body">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </Box>
            )
        })

        let missed = this.props.missed.map((workout,index)=>{
            let targeturl = "exampleModalCenter" + workout.id;
            let targetting = "#exampleModalCenter" + workout.id;
            return (
                <Box p ={2}>
                    <div key= {index} class="card" style={{ width: "18rem" }}>
                      <div class="card-body">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </Box>
            )
        })


        return(
        <div>
            <h1 class="display-2">Completed</h1>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
                >{completed}</Grid>
            <h1 class="display-2">Missed</h1>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
                >{missed}</Grid>
        </div>
        )
    }
}
export default History