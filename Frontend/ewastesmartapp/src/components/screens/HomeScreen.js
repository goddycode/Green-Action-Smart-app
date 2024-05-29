import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import Task from "../Task";
import TaskTodoScreen from "./TaskTodoScreen";
import { listTasks } from "../../actions/tasksActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasksList);
  const { error, loading, tasks } = tasksList;

  useEffect(() => {
    dispatch(listTasks());
  }, [dispatch]);

  return (
    <Container>
      <br />
      <h1>Activities Available</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {tasks.map((task) => (
            <Col key={task._id} sm={12} md={6} lg={4} xl={3}>
              <Task task={task} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default HomeScreen;
