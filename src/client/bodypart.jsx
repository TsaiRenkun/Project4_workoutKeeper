import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

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
            <div key = {index}>
            <p>id: {body.id} || name: {body.name} </p>
            <button key={body.id} onClick ={()=>{this.showExercises(body.id)}}>Show</button>
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
