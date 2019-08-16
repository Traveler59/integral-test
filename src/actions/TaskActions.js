// @flow
import type {
  Store,
  Dispatch,
} from 'redux';

import type moment from 'moment';

import type { Task } from '../libs/types';

import {
  ADD_TASK, EDIT_TASK, DELETE_TASK, MARK_AS_DONE_TASK,
} from './types';

import type {
  TaskActionTypes,
} from './types';


export const addTask = (task: Task): TaskActionTypes => ({
  type: ADD_TASK,
  task,
});

export const editTask = (editedTask: Task): TaskActionTypes => ({
  type: EDIT_TASK,
  editedTask,
});

export const deleteTask = (id: string): TaskActionTypes => ({
  type: DELETE_TASK,
  id,
});

export const markTaskAsDone = (doneDateTime: moment, taskId: string): TaskActionTypes => ({
  type: MARK_AS_DONE_TASK,
  task: { time: doneDateTime, id: taskId },
});
