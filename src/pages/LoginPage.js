import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import UsersAPI from '../api/UsersAPI'
import { Form, Button } from 'react-bootstrap'
import GoogleLogin from 'react-google-login';
import './LoginPage.css'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_KEY

function login(props) {
  const {token, setUsername, setToken, loginError, setLoginError} = props

  const handleSubmit = (event) => {
    event.preventDefault()
    const credentialInfo = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value
    }

    UsersAPI.login(credentialInfo)
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
      .catch(_error => setLoginError('Unable to log in with provided credentials. Please try again.'))
  }

  const responseGoogleS = (response) => {
    const credentialInfo = {
      username: response.profileObj.email,
      password: response.profileObj.googleId
    }
    UsersAPI.login(credentialInfo)
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
    .catch(_error => {
      UsersAPI.signup(credentialInfo)
        .then(response => response.json())
        .then(jsonResponse => {
          localStorage.setItem('token', jsonResponse.token)
          localStorage.setItem('username', credentialInfo.username)
          setUsername(credentialInfo.username)
          setToken(jsonResponse.token)
        })
    })
  }

  const responseGoogleF = (_response) => {
    setLoginError('Unable to log in with your google account. Please try again or create an account with us.')
  }

  return (
    <div className="formPage mt-5 mx-5 text-left">
      {token && <Redirect to="/" />}
      <h2>Login</h2>
      {loginError}
      <Form className="py-4" onSubmit={handleSubmit}>
        <Form.Label className="pt-3">Username: </Form.Label>
        <Form.Control className="form-input" name="username" type="text" placeholder="Enter username" required />
        <Form.Label className="pt-4">Password: </Form.Label>
        <Form.Control className="form-input" name="password" type="password" placeholder="Enter password" required />
        <Button className="mt-5 font-weight-bold" variant="light" type="submit">Submit</Button>
      </Form>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login/Sign up with Google"
        onSuccess={responseGoogleS}
        onFailure={responseGoogleF}
        cookiePolicy={'single_host_origin'}
      />
      <p className="pt-3">Don't have an account?<Link className="signup" to="/signup"> Sign Up</Link></p>
    </div>
  )
}

export default login
