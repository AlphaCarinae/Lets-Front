<<<<<<< HEAD
import React, { Component } from 'react'

class Event extends Component {
  render () {
    return (
      <div />
=======
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const SERVER_URL = "http://localhost:3000/"


class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {},
      event_id: this.props.match.params.id,
      users: [],
      group: {}
    }


  const fetchEvent = () => {
    let url = SERVER_URL + 'events/'+ this.state.event_id  +'.json';


    axios.get(url).then( event => {
      console.log(event);
      this.setState({
        event: event.data,
        users: event.data.users,
        group: event.data.group
      })

    }).catch( (errors) => {
      console.log(errors);
    })
  }

  fetchEvent();
  }


  render() {
    return (
      <div>
        <h2>{this.state.event.name}</h2>
        <p>on {this.state.event.date} at {this.state.event.time}</p>
        <h4>Venue : {this.state.event.location}</h4>
        <p> {this.state.users.length } {this.state.group.nickname}s going</p>
        <hr></hr>

        <p>Info : {this.state.event.description}</p>

      </div>
>>>>>>> 3baffc628ed3de17aadf924db651c8adaac752b7
    )
  }
}

export default Event
