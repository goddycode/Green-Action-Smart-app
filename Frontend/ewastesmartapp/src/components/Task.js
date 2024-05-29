import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Task({ task }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/task/${task._id}`}>
        <Card.Img src={task.image} />
      </Link>
      <Card.Body>
        <Link to={`/task/${task._id}`}>
          <Card.Title as="div">
            <b>{task.activityname}</b>
          </Card.Title>
        </Link>
        <Card.Text as="h3">{task.activityname}</Card.Text>

        <Card.Text as="div">
          <div className="my-3"> Location: {task.tasklocation} </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Task;
