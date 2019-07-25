import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap'
import history from '../../history'

function AppNav(props) {
  const handleSearch = (event) => {
    event.preventDefault()
    const textInput = event.target.elements.q.value
    props.setSearchInput(textInput)
    event.target.elements.q.value = ""
    history.push(`/search?q=${textInput}`)
  }

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand><Link to="/">Video Game Recommender</Link></Navbar.Brand>
      <Form inline onSubmit={handleSearch}>
        <FormControl name="q" type="text" placeholder="Search" />
        <Button type="submit">submit</Button>
      </Form>
      <Nav className="justify-content-end">
        {props.username ? 
          <>
          <Nav.Item className="p-2 ml-auto"><Link to="/my-ratings">My Ratings</Link></Nav.Item>
          <Navbar.Text>
            Signed in as: {props.username}
          </Navbar.Text> 
          </>
          :
          <>
          <Nav.Item className="p-2 ml-auto"><Link to="/signup">SIGN UP</Link></Nav.Item>
          <Nav.Item className="p-2 ml-auto"><Link to="/login">LOG IN</Link></Nav.Item>
          </>
        }
      </Nav>
    </Navbar>
  )
}

export default AppNav
