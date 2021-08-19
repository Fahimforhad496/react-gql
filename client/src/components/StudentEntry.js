import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { request, gql } from "graphql-request";

const StudentEntry = () => {
    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({ ...form, [field]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const mutation = gql`
            mutation AddStudent (
                $name: String!
                $email: String!
                $phone: String!
                $dateOfBirth: String!
            ) {
                addStudent(
                    name: $name
                    email: $email
                    phone: $phone
                    dateOfBirth: $dateOfBirth
                ) {
                    id
                }
            }
        `;
        request(
            "http://localhost:8000/graphql",
            mutation, {
                "name": "test1", "email": "email1", "phone": "phone1", "dateOfBirth": "date1"
            }            
        ).then((data) => console.log(data));
        console.log(form);
    };
    return (
        <Container>
            <h1>Student Entry</h1>
            <Form name="StudentEntry" onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Full Name"
                                onChange={(e) =>
                                    setField("name", e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Email
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="email"
                                placeholder="Enter Email Address"
                                onChange={(e) =>
                                    setField("email", e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Phone
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Enter Phone Number"
                                onChange={(e) =>
                                    setField("phone", e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default StudentEntry;