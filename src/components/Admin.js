import React from 'react'
import {Jumbotron, Button, Form, FormGroup, Label, Input} from 'reactstrap'


const Admin = () => {
    return (
        <article >
        <Jumbotron className="jumbotron bg-dark-mode mbr-white why">
            <Form inline className="m-5">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="username" placeholder="username" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" placeholder="password" />
                </FormGroup>
                <Button color="danger">Submit</Button>
            </Form>
        </Jumbotron>
        </article>
    )
}

export default Admin
