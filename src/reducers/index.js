// @flow
import { combineReducers } from 'redux';
import tasks from './tasks';
import type { TaskActionTypes } from '../actions/types';

const reducers = {
  tasks,
};
export type Reducers = typeof reducers;
export default combineReducers<Reducers, TaskActionTypes>(reducers);
