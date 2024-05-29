import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import InputGroup from "react-bootstrap/InputGroup";
import { validPassword } from "./Rejex";
import { signup } from "../../actions/userActions";

function SignupScreen() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const [show, changeshow] = useState("fa fa-eye-slash");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.details);
      setFname("");
      setLname("");
      setEmail("");
      setPass1("");
      setPass2("");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      setMessage("Password do not match");
      navigate("/signup");
    } else if (!validPassword.test(pass1)) {
      setMessage("Your password does not meet set password criteria");
    } else {
      dispatch(signup(fname, lname, email, pass1));
      setMessage("You have signup successfully");
      navigate("/login");
    }
  };
  const showPassword = () => {
    var x = document.getElementById("pass1");
    var z = document.getElementById("pass2");
    if (x.type === "password" && z.type === "password") {
      x.type = "text";
      z.type = "text";
      changeshow("fa fa-eye");
    } else {
      x.type = "password";
      z.type = "password";
      changeshow("fa fa-eye-slash");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Signup
              </Card.Header>
              <Card.Body>
                {message && <Message variant="danger">{message}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Last Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      <span>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span>
                        <i className={show}></i>
                      </span>
                      Password
                    </Form.Label>

                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox onClick={showPassword} />{" "}
                      <Form.Control
                        placeholder="Enter password"
                        required
                        type="password"
                        id="pass1"
                        value={pass1}
                        onChange={(e) => setPass1(e.target.value)}
                      />
                      <small>
                        password must include atleast[1-9][a-z][A-Z][_$@*!.] & 5
                        Characters
                      </small>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span>
                        <i className={show}></i>
                      </span>
                      Confirm Password
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox onClick={showPassword} />{" "}
                      <Form.Control
                        placeholder="Confirm password"
                        required
                        type="password"
                        id="pass2"
                        value={pass2}
                        onChange={(e) => setPass2(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <br />
                  <div className="d-grid gap-2">
                    <Button className="btn btn-md btn-success" type="submit">
                      Signup
                    </Button>
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>
                    Already User?
                    <Link to="/login">Login</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default SignupScreen;
