import React from 'react'
import { Redirect } from 'react-router-dom'
import UsersAPI from '../api/UsersAPI'
import { Form, Button } from 'react-bootstrap'
import './LoginPage.css'

function signup(props) {
  const {token, setUsername, setToken, loginError, setLoginError} = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const credentialInfo = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value
    }

    UsersAPI.signup(credentialInfo)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw true
        }
      })
      .then(jsonResponse => {
        localStorage.setItem('token', jsonResponse.token)
        localStorage.setItem('username', credentialInfo.username)
        setUsername(credentialInfo.username)
        setToken(jsonResponse.token)
      })
      .catch(_error => setLoginError('Please try again.'))
  }

  return (
    <div className="formPage mt-5 mx-5 text-left">
      {token && <Redirect to="/" />}
      <h2>Sign Up</h2>
      {loginError}
      <Form className="py-4" onSubmit={handleSubmit}>
        <Form.Label className="pt-3">Username: </Form.Label>
        <Form.Control className="form-input" name="username" type="text" placeholder="Enter username" required />
        <Form.Label className="pt-4">Password: </Form.Label>
        <Form.Control className="form-input" name="password" type="password" placeholder="Enter password" required />
        <Button className="mt-5 font-weight-bold" variant="light" type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default signup
