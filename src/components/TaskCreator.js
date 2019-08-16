// @flow
import React from 'react';
import moment from 'moment';
import {
  Button, FormControl, Dropdown, OverlayTrigger, Popover,
} from 'react-bootstrap';

import { DayPicker } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import type { Task, Importance, ChangeEvent } from '../libs/types';

import { newUniqueId, importanceToText, hoursInDayRange } from '../libs/helpers';


interface TaskCreatorProps{
  addTask: (task: Task) => void;
}

interface TaskCreatorState{
  taskName: string,
  taskDiscription: string,
  importance: Importance;
  dueDate: Date | null;
  dueTime: number | null;
}

export default class TaskCreator extends React.Component<TaskCreatorProps, TaskCreatorState> {
  overlay: any;

  onChangeName = (e: ChangeEvent) => this.setState(
    { ...this.state, taskName: e.target.value },
  )

  onChangeDiscription =(e: ChangeEvent) => this.setState(
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

  addTask = () => {
    const { dueDate, dueTime } = this.state;

    const dueTimeMoment: moment | null = (dueDate && dueTime)
      ? moment(dueDate.setHours(dueTime))
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

  isRequiredFieldsSet = () => this.state.taskName !== '' && this.state.taskDiscription !== '';

  constructor(props: TaskCreatorProps) {
    super(props);

    const dueDate: Date | null = null;
    const dueTime: number | null = null;
    this.state = {
      taskName: '',
      taskDiscription: '',
      importance: 'normal',
      dueDate,
      dueTime,
    };
  }

  render() {
    const {
      taskName, taskDiscription, importance, dueTime, dueDate,
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
