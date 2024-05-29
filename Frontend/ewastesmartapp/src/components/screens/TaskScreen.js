import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, Container, ListGroup } from "react-bootstrap";
import { listTaskDetails } from "../../actions/tasksActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";

function TaskScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const taskDetails = useSelector((state) => state.taskDetails);
  const { error, loading, task } = taskDetails;

  useEffect(() => {
    dispatch(listTaskDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              {task && <Image src={task.image} alt={task.activityname} fluid />}
            </Col>
            <Col md={6}>
              {task && (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>Activity: {task.activityname}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>Location: {task.tasklocation}</ListGroup.Item>
                  <ListGroup.Item>
                    Man Power required: {task.volunteersrequired}
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default TaskScreen;
