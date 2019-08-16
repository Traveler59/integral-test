// @flow
import type moment from 'moment';

import type { Task } from '../libs/types';

export const ADD_TASK: 'ADD_TASK' = 'ADD_TASK';

export const EDIT_TASK: 'EDIT_TASK' = 'EDIT_TASK';

export const DELETE_TASK: 'DELETE_TASK' = 'DELETE_TASK';

export const MARK_AS_DONE_TASK: 'MARK_AS_DONE_TASK' = 'MARK_AS_DONE_TASK';

export const REHYDRATE: 'persist/REHYDRATE' = 'persist/REHYDRATE';

export interface AddTaskAction {
  type: typeof ADD_TASK;
  task: Task;
}

export interface EditTaskAction {
  type: typeof EDIT_TASK;
  editedTask: Task;
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  id: string;
}

export interface MarkAsDoneTaskAction {
  type: typeof MARK_AS_DONE_TASK;
  task: { time: moment, id: string };
}

export interface RehydrateAction {
  type: typeof REHYDRATE;
  payload: { tasks:{ tasks: Task[] } };
}

export type TaskActionTypes = AddTaskAction
| EditTaskAction
| DeleteTaskAction
| MarkAsDoneTaskAction
| RehydrateAction;
