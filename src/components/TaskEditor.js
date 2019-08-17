// @flow
import React from 'react';
import moment from 'moment';
import {
  Button, FormControl, Dropdown, OverlayTrigger, Popover,
} from 'react-bootstrap';

import { DayPicker } from 'react-day-picker';

import '../../style-libs/react-day-picker.css';

import type { Task, Importance, ChangeEvent } from '../libs/types';

import { importanceToText, timeFormat } from '../libs/helpers';

interface TaskEditorProps{
  task: Task;
  editTask: (task: Task) => void;
}

interface TaskEditorState{
  taskName: string,
  taskDiscription: string,
  importance: Importance;
  dueDate: Date | null;
  dueTimeHours: number | null;
  dueTimeMinutes: number | null;
  doneDateTime: moment | null;
  id: string;
}

export default class TaskEditor extends React.Component<TaskEditorProps, TaskEditorState> {
  overlay: null | OverlayTrigger;

  onChangeName = (e: ChangeEvent) => this.setState(
    { ...this.state, taskName: e.target.value },
  )

  onChangeDiscription = (e: ChangeEvent) => this.setState(
    { ...this.state, taskDiscription: e.target.value },
  )

  setImportance = (i: Importance) => this.setState({ ...this.state, importance: i })

  onDayClick = (d: Date) => {
    if (this.overlay) {
      this.overlay.hide();
    }
    this.setState({ ...this.state, dueDate: d });
  }

  onChangeHours = (e: ChangeEvent) => this.setState(
    { ...this.state, dueTimeHours: e.target.valueAsNumber },
  )

  onChangeMinutes = (e: ChangeEvent) => this.setState(
    { ...this.state, dueTimeMinutes: e.target.valueAsNumber },
  )

  editTask = () => {
    const { dueDate, dueTimeHours, dueTimeMinutes } = this.state;

    const dueTimeMoment: moment | null = (dueDate && dueTimeHours && dueTimeMinutes)
      ? moment(dueDate.setHours(dueTimeHours)).minutes(dueTimeMinutes)
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

  isRequiredFieldsSet = () => this.state.taskName !== ''
    && this.state.taskDiscription !== ''
    && (this.state.dueTimeHours === null
      || (this.state.dueTimeHours < 24 && this.state.dueTimeHours > 0))
    && (this.state.dueTimeMinutes === null
      || (this.state.dueTimeMinutes < 60 && this.state.dueTimeMinutes > 0));

  constructor(props: TaskEditorProps) {
    super(props);
    const { dueDateTime, doneDateTime } = props.task;

    const [dueDate, dueTimeHours, dueTimeMinutes] = dueDateTime
      ? [dueDateTime.toDate(), dueDateTime.hours(), dueDateTime.minutes()]
      : [null, null, null];

    this.state = {
      ...props.task,
      taskName: props.task.name,
      taskDiscription: props.task.discription,
      dueDate,
      dueTimeHours,
      dueTimeMinutes,
      doneDateTime,
    };
  }

  render() {
    const {
      taskName, taskDiscription, importance, dueDate, dueTimeHours, dueTimeMinutes, doneDateTime,
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
          <OverlayTrigger ref={(overlay) => { this.overlay = overlay; }} trigger='click' placement='bottom' overlay={
            <Popover>
              <DayPicker onDayClick={this.onDayClick} />
            </Popover>}>
            <Button >{dueDate ? moment(dueDate).format('DD:MM:YY') : 'Выберите дату'}</Button>
          </OverlayTrigger>
          <br/>
          <br/>

          <div className='timeSetter'>
            <FormControl value={ dueTimeHours } type='number' min='0' max='23' step='1' onChange={ this.onChangeHours }/>
            <span>:</span>
            <FormControl value={ dueTimeMinutes } type='number' min='0' max='59' step='1' onChange={ this.onChangeMinutes }/>
          </div>
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
