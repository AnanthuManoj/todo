import React from 'react'
import { Col, Row } from 'react-bootstrap'
import AddTodo from '../Components/AddTodo'
import ViewTodo from '../Components/ViewTodo'

function Home() {
  return (
    <div className='container-fluid'>
        <Row >
            <Col className='d-none d-md-block '>
              <AddTodo/>
            </Col>
            <Col>
              <ViewTodo/>
            </Col>
        </Row>
    </div>
  )
}

export default Home