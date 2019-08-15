// @flow
import type { TaskActionTypes } from '../actions/types';

import type { Task } from '../types/types';

import {
  ADD_TASK, EDIT_TASK, DELETE_TASK, MARK_AS_DONE_TASK,
} from '../actions/types';

const initialState = {
  tasks: [],
};

interface AppState {
  tasks: Task[]
}


const tasksReducer = (state: AppState = initialState, action: TaskActionTypes) => {
  const { tasks } = state;
  switch (action.type) {
    case ADD_TASK: {
      const newTasks = [...tasks, action.task];
      return { ...state, tasks: newTasks };
    }
    case EDIT_TASK: {
      const i = tasks.findIndex((t) => t.id === action.task.id);
      tasks[i] = action.task;
      return { ...state, tasks };
    }
    case DELETE_TASK: {
      const newTasks: Task[] = tasks.filter((t) => t.id !== action.id);
      return { ...state, tasks: newTasks };
    }
    case MARK_AS_DONE_TASK: {
      const i = tasks.findIndex((t) => t.id === action.task.id);
      const doneTask: Task = { ...tasks[i], doneDateTime: action.task.time };
      tasks[i] = doneTask;
      return { ...state, tasks: [...tasks] };
    }
    default:
      return state;
  }
};

export default tasksReducer;
