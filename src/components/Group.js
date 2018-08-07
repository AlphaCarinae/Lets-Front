import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { Link } from 'react-router-dom'


const GROUP_SERVER_URL = 'http://localhost:3000/groups/'

class Api extends Component {
  constructor (props) {
    super(props)
    this.state = {
      group: [],
      events: [],
      interests: []
    }

    const fetchGroup = () => {
      axios.get(GROUP_SERVER_URL + this.props.id + '.json').then((results) => {
        this.setState({
          group: results.data,
          events: results.data.events,
          interests: results.data.interests
        })
      })
    }
    fetchGroup()
  }

  render () {
    const { group } = this.state.group
    return (
      <div >
        <h2>{this.state.group.name}</h2>
        <p>{this.state.group.description}</p>
        <img src={this.state.group.image} alt="Logo" />
        <h4>Location: {this.state.group.location}</h4>
        <h4>{this.state.group.nickname}</h4>
        <h4>Events: {this.state.events.map((x) => <Link to={`/events/${x.id}`}>{x.name}</Link>)}</h4>
        <h4>Interests: {this.state.interests.map((x) => <li><Link to={{pathname: '/groups', search: `?filterBy=${x.name}`}}>{x.name}</Link></li>)}</h4>
        <Link to={`/groups/${this.props.id}/edit`}>Edit</Link>
        <Link to={{pathname: '/newevent', state: {group_id: this.state.group.id}}}>New Event</Link>
    
      </div>
    )
  }
}

class Group extends Component {
  render () {
    return (
      <div >
        <Header />
        <h1>Group single</h1>
        <Api id={this.props.match.params.id} />
      </div>
    )
  }
}

export default Group
