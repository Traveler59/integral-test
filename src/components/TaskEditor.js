// @flow
import React from 'react';
import moment from 'moment';
import {
  Col, Table, Button, FormControl, Dropdown,
} from 'react-bootstrap';

import { DayPicker } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

type Importance = 'normal' | 'important' | 'critical';

interface Task {
  taskName: string,
  taskDiscription: string,
  importance: Importance,
  dueDate: Date | null;
  dueTime: number | null;
}

interface TaskEditorProps{
  task: Task;
}

interface TaskEditorState{
  taskName: string,
  taskDiscription: string,
  importance: Importance;
  dueDate: Date | null;
  dueTime: number | null;
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

  constructor(props: TaskEditorProps) {
    super(props);
    this.state = {
      ...props.task,
    };
  }

  render() {
    const {
      taskName, taskDiscription, importance, dueTime,
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
            {importance}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {importanceTypes.map((i) => (
              <Dropdown.Item key={i} onClick={() => this.setImportance(i)}>{i}</Dropdown.Item>
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
        <td>
          <Button>Сохранить</Button>
        </td>
      </tr>
    );
  }
}
