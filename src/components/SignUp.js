import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import _ from 'lodash'

const SERVER_URL = 'https://backend-lets.herokuapp.com/'
const LOGIN_SERVER_URL = 'https://backend-lets.herokuapp.com/'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      form_disabled: false,
      message: "Email :",
      users: {},
      user: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }

    this._handleEmailInput = this._handleEmailInput.bind(this)
    this._handlePasswordInput = this._handlePasswordInput.bind(this)
    this._handlePasswordConfirm = this._handlePasswordConfirm.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)

    const fetchUsers = () => {
      axios.get(SERVER_URL + 'users.json').then(result => {
        console.log(result);
        this.setState({ users: result.data.users })
      })
    }

    fetchUsers();
  }





  _handleEmailInput(e) {
    if (_.filter(this.state.users, { email: e.target.value }).length === 0) {
      this.setState({
        user: { ...this.state.user, email: e.target.value },
        message: "Email :",
        form_disabled: false
      })
    } else {
      this.setState({
        message: "Email already registered",
        form_disabled: true
      })
    }
  }


  _handlePasswordInput(e) {
    this.setState({
      user: { ...this.state.user, password: e.target.value }
    })
  }

  _handlePasswordConfirm(e) {
    this.setState({
      user: { ...this.state.user, password_confirmation: e.target.value }
    })
  }

  _handleSubmit(e) {
    e.preventDefault();


    axios.post(SERVER_URL, this.state).then((result) => {
      console.log("Response came back:", result);
      localStorage.setItem("jwt", result.data.jwt);
      localStorage.setItem("username", this.state.auth.email)
    }).catch((errors) => {
      console.log("Errors came back:", errors);
    })

  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <label>
            {this.state.message}
            <input onChange={this._handleEmailInput} type="email" name="email" value={this.state.user.email} autoFocus required></input>
          </label>
          <label>
            Password:
             <input onChange={this._handlePasswordInput} type="password" name="password" value={this.state.user.password} required></input>
          </label>
          <label>
            Password Confirmation:
             <input onChange={this._handlePasswordConfirm} type="password" name="password_confirmation" value={this.state.user.password_confirmation} required></input>
          </label>
          <button type="submit" disabled={this.state.form_disabled}>Sign Up</button>
        </form>
      </div>
    )
  }

}

export default SignUp
