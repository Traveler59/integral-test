// @flow
import React from 'react';
import moment from 'moment';
import {
  Button, FormControl, Dropdown,
} from 'react-bootstrap';

import { DayPicker } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import type { Task, Importance } from '../libs/types';

import { importanceToText } from '../libs/helpers';

interface TaskEditorProps{
  task: Task;
  editTask: (task: Task) => void;
}

interface TaskEditorState{
  taskName: string,
  taskDiscription: string,
  importance: Importance;
  dueDate: Date | null;
  dueTime: number | null;
  doneDateTime: moment | null;
  id: string;
}

export default class TaskEditor extends React.Component<TaskEditorProps, TaskEditorState> {
  onChangeName = (e:{ target:{ value: string } }) => this.setState(
    { ...this.state, taskName: e.target.value },
  )

  onChangeDiscription =(e:{ target:{ value: string } }) => this.setState(
    { ...this.state, taskDiscription: e.target.value },
  )

  setImportance = (i: Importance) => this.setState({ ...this.state, importance: i })

  onDayClick = (d: Date) => this.setState(
    { ...this.state, dueDate: d },
  )

  setHours = (t: number) => this.setState(
    { ...this.state, dueTime: t },
  )

  editTask = () => {
    const { dueDate, dueTime } = this.state;

    const dueTimeMoment: moment | null = (dueDate && dueTime)
      ? moment(dueDate.setHours(dueTime))
      : null;
    this.props.editTask({
      name: this.state.taskName,
      discription: this.state.taskDiscription,
      importance: this.state.importance,
      dueDateTime: dueTimeMoment,
      id: this.state.id,
      doneDateTime: this.state.doneDateTime,
    });
  }

  constructor(props: TaskEditorProps) {
    super(props);
    const { dueDateTime, doneDateTime } = props.task;

    const [dueDate, dueTime] = dueDateTime
      ? [dueDateTime.toDate(), dueDateTime.hours()]
      : [null, null];

    this.state = {
      ...props.task,
      taskName: props.task.name,
      taskDiscription: props.task.discription,
      dueDate,
      dueTime,
      doneDateTime,
    };
  }

  render() {
    const {
      taskName, taskDiscription, importance, dueTime, doneDateTime,
    } = this.state;

    const importanceTypes = ['normal', 'important', 'critical'];
    return (
      <tr>
        <td>
          <FormControl
           type='text'
            value={taskName}
            onChange={this.onChangeName} />
        </td>
        <td>
          <FormControl
           type='text'
            value={taskDiscription}
            onChange={this.onChangeDiscription} />
        </td>
        <td>
        <Dropdown>
          <Dropdown.Toggle>
            {importanceToText(importance)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {importanceTypes.map((i) => (
              <Dropdown.Item key={i} onClick={() => this.setImportance(i)}>
                {importanceToText(i)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        </td>
        <td>
          <DayPicker onDayClick={this.onDayClick}/>

          <Dropdown>
          <Dropdown.Toggle>
            {dueTime}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((i) => (
              <Dropdown.Item key={i} onClick={() => this.setHours(i)}>{i}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        </td>
        <td >{!!doneDateTime && doneDateTime.format('DD MM   HH:mm:ss')}</td>
        <td>
          <Button onClick={() => { this.editTask(); }}>Сохранить</Button>
        </td>
      </tr>
    );
  }
}
