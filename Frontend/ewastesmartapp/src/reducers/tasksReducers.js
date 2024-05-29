import {
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
} from "../constants/tasksConstants";

export const taskListReducers = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_LIST_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const taskDetailsReducers = (state = { task: [] }, action) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
