// @flow
import type { Task } from '../types/types';

export const ADD_TASK = 'ADD_TASK';

export const EDIT_TASK = 'EDIT_TASK';

export const DELETE_TASK = 'DELETE_TASK';

export interface AddTaskAction {
  type: typeof ADD_TASK;
  task: Task;
}

export interface EditTaskAction {
  type: typeof EDIT_TASK;
  task: Task;
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  id: string;
}

export type TaskActionTypes = AddTaskAction | EditTaskAction | DeleteTaskAction;
