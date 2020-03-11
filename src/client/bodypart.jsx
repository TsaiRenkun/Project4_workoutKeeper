import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';


class BodyPart extends React.Component {
  constructor(){
    console.log("constructing");
      super()
    this.state = {
      bodyparts: []
      } 
    }

  componentDidMount(){
      console.log("Done rendering stuff")
      this.getAllBodyPart()
    }

  getAllBodyPart(){
    const url = '/bodyparts';
    axios.get(url)
    .then((response) => {
      console.log("WE ARE FKING HERE BOY")
      console.log(response)
      const data = response.data
      this.setState({ bodyparts : data })
    }).catch((error)=>{
      console.log(error);
    })
  }

  showExercises(key){
    const url = '/bodyparts/' + key;
    console.log(url)
    console.log("ASHJKKJWHDSDHKJASDHSAKJDHSDKSAJHDKASDHKDKAHDKJSA")
      axios.get(url)
        .then((response) => {
          
          const data = response.data
          console.log(data)
          this.props.exerciseCallback(data)
    
        }).catch((error)=>{
          console.log(error);
        })
  }

  render() {

      let bodypart = this.state.bodyparts

      const bodyArray = this.state.bodyparts.map((body,index)=>{
        return (
          <div key = {index} class="card" style={{width: "18rem"}}>
            <Paper onClick ={()=>{this.showExercises(body.id)}}>
            <div class="card-body">
                    <h5 class="card-title">{body.name}<VisibilityIcon key={body.id}>Show</VisibilityIcon></h5>
              </div>
            </Paper>
            </div>
            )
    })

    return (
      <div>
        {bodyArray}
      </div>
    );
  }
}

export default BodyPart;
