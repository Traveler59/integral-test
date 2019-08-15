// @flow
import type {
  Store,
  Dispatch,
} from 'redux';

import type { Task } from '../types/types';

import {
  ADD_TASK, EDIT_TASK, DELETE_TASK,
} from './types';

import type {
  TaskActionTypes,
} from './types';


export const addTask = (task: Task): TaskActionTypes => ({
  type: ADD_TASK,
  task,
});

export const editTask = (task: Task): TaskActionTypes => ({
  type: EDIT_TASK,
  task,
});

export const deleteTask = (id: string): TaskActionTypes => ({
  type: DELETE_TASK,
  id,
});
