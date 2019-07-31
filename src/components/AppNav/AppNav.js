import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap'
import history from '../../history'
import './AppNav.css'

function AppNav(props) {
  const handleSearch = (event) => {
    event.preventDefault()
    const textInput = event.target.elements.q.value
    props.setSearchInput(textInput)
    event.target.elements.q.value = ""
    history.push(`/search?q=${textInput}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    props.setToken('')
    props.setUsername('')
  }

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="justify-content-between">
      <Navbar.Brand><Link to="/" className="navBrand">VIDEO GAME RECOMMENDER</Link></Navbar.Brand>
      <Form inline className="p-2 mr-auto" onSubmit={handleSearch}>
        <FormControl name="q" type="text" placeholder="Search" />
        <Button variant="info" type="submit"><i className="fas fa-search"></i></Button>
      </Form>
      <Nav className="justify-content-end">
        {props.username ? 
          <>
          <Nav.Item className="p-2 ml-2"><Link className="navText" to="/recommendations">RECOMMEND ME GAMES</Link></Nav.Item>
          <Nav.Item className="p-2 ml-2"><Link className="navText" to="/my-ratings">MY RATINGS</Link></Nav.Item>
          <Navbar.Text className="navText p-2 ml-2">
            SIGNED IN AS: {props.username}
          </Navbar.Text> 
          <Nav.Item><Nav.Link className="navText font-weight-bold ml-2" onClick={handleLogout}>LOGOUT</Nav.Link></Nav.Item>
          </>
          :
          <>
          <Nav.Item className="p-2 ml-2"><Link className="navText" to="/signup">SIGN UP</Link></Nav.Item>
          <Nav.Item className="p-2 ml-2"><Link className="navText" to="/login">LOG IN</Link></Nav.Item>
          </>
        }
      </Nav>
    </Navbar>
  )
}

export default AppNav
