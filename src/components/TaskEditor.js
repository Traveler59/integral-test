// @flow
import React from 'react';
import moment from 'moment';
import {
  Button, FormControl, Dropdown, OverlayTrigger, Popover
} from 'react-bootstrap';

import { DayPicker } from 'react-day-picker';

import '../../style-libs/react-day-picker.css';

import type { Task, Importance, ChangeEvent } from '../libs/types';

import { importanceToText, timeFormat, hoursInDayRange } from '../libs/helpers';

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
  overlay: any;

  onChangeName = (e: ChangeEvent) => this.setState(
    { ...this.state, taskName: e.target.value },
  )

  onChangeDiscription = (e: ChangeEvent) => this.setState(
    { ...this.state, taskDiscription: e.target.value },
  )

  setImportance = (i: Importance) => this.setState({ ...this.state, importance: i })

  onDayClick = (d: Date) => {
    this.overlay.hide();
    this.setState({ ...this.state, dueDate: d });
  }

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

  isRequiredFieldsSet = () => this.state.taskName !== '' && this.state.taskDiscription !== '';

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
      taskName, taskDiscription, importance, dueTime, dueDate, doneDateTime,
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
          <OverlayTrigger ref={(overlay: any) => { this.overlay = overlay; }} trigger='click' placement='bottom' overlay={
            <Popover id='calendar-popover'>
              <DayPicker onDayClick={this.onDayClick} />
            </Popover>}>
            <Button >{dueDate ? moment(dueDate).format('DD:MM:YY') : 'Выберите дату'}</Button>
          </OverlayTrigger>
          <br/>
          <br/>

          <Dropdown>
            <Dropdown.Toggle>
              {!!dueTime ? `${dueTime} часов` : 'Выберите время'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {hoursInDayRange.map((i) => (
                <Dropdown.Item key={i} onClick={() => this.setHours(i)}>{i}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </td>
        <td >{!!doneDateTime && doneDateTime.format(timeFormat)}</td>
        <td>
          <Button disabled={!this.isRequiredFieldsSet()} onClick={() => { this.editTask(); }}>
            Сохранить
          </Button>
        </td>
      </tr>
    );
  }
}
