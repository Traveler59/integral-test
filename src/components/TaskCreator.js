// @flow
import React from 'react';
import moment from 'moment';
import {
  Button, FormControl, Dropdown, OverlayTrigger, Popover,
} from 'react-bootstrap';

import { DayPicker } from 'react-day-picker';

import '../../style-libs/react-day-picker.css';

import type { Task, Importance, ChangeEvent } from '../libs/types';

import { newUniqueId, importanceToText } from '../libs/helpers';


interface TaskCreatorProps{
  addTask: (task: Task) => void;
}

interface TaskCreatorState{
  taskName: string,
  taskDiscription: string,
  importance: Importance;
  dueDate: Date | null;
  dueTimeHours: number | null;
  dueTimeMinutes: number | null;
}

export default class TaskCreator extends React.Component<TaskCreatorProps, TaskCreatorState> {
  overlay: null | OverlayTrigger;

  onChangeName = (e: ChangeEvent) => this.setState(
    { ...this.state, taskName: e.target.value },
  )

  onChangeDiscription =(e: ChangeEvent) => this.setState(
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

  addTask = () => {
    const { dueDate, dueTimeHours, dueTimeMinutes } = this.state;

    const dueTimeMoment: moment | null = (dueDate && dueTimeHours && dueTimeMinutes)
      ? moment(dueDate.setHours(dueTimeHours)).minutes(dueTimeMinutes)
      : null;
    this.props.addTask({
      name: this.state.taskName,
      discription: this.state.taskDiscription,
      importance: this.state.importance,
      dueDateTime: dueTimeMoment,
      id: newUniqueId(),
      doneDateTime: null,
    });
  }

  isRequiredFieldsSet = () => this.state.taskName !== ''
  && this.state.taskDiscription !== ''
  && (this.state.dueTimeHours === null
    || (this.state.dueTimeHours < 24 && this.state.dueTimeHours > 0))
  && (this.state.dueTimeMinutes === null
    || (this.state.dueTimeMinutes < 60 && this.state.dueTimeMinutes > 0));

  constructor(props: TaskCreatorProps) {
    super(props);

    const dueDate: Date | null = null;
    const dueTimeHours: number | null = null;
    const dueTimeMinutes: number | null = null;
    this.state = {
      taskName: '',
      taskDiscription: '',
      importance: 'normal',
      dueDate,
      dueTimeHours,
      dueTimeMinutes,
    };
  }

  render() {
    const {
      taskName, taskDiscription, importance, dueDate, dueTimeHours, dueTimeMinutes,
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
            <Popover id='calendar-popover'>
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
        <td/>
        <td>
          <Button disabled={!this.isRequiredFieldsSet()} onClick={() => { this.addTask(); }}>
            Сохранить
          </Button>
        </td>
      </tr>
    );
  }
}
