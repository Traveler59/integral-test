// @flow
import type moment from 'moment';

export type Importance = 'normal' | 'important' | 'critical';

export type Task = {
  name: string,
  discription: string,
  importance: Importance,
  dueDateTime: moment | null;
  doneDateTime: moment | null;
  id: string;
}

export type State = {
  tasks: Task[];
}

export type ChangeEvent = {
  target: { value: string };
}
