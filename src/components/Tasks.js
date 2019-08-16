// @flow
import React from 'react';
import {
  Col, Table, Button, ButtonGroup,
} from 'react-bootstrap';
import type Moment from 'moment';
import moment from 'moment';

import TaskCreator from './TaskCreator';
import TaskEditor from './TaskEditor';

import type { Task, Importance } from '../libs/types';
import { importanceToText, timeFormat } from '../libs/helpers';

import './Tasks.scss';


interface Props {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  markTaskAsDone: (doneDateTime: Moment, taskId: string) => void;
}

interface TaskState{
    creatingNewOne: boolean;
    editingTaskId: string;
    filterValue: Importance | null;
}

export default class Tasks extends React.Component<Props, TaskState> {
  constructor(props: Props) {
    super(props);
    const filter: Importance | null = null;
    this.state = {
      creatingNewOne: false,
      editingTaskId: '',
      filterValue: filter,
    };
  }

  cancelCreating = () => this.setState({ ...this.state, creatingNewOne: false });

  startCreateNew = () => this.setState({ ...this.state, creatingNewOne: true });

  addTask = (task: Task) => {
    this.props.addTask(task);
    this.setState({ ...this.state, creatingNewOne: false });
  }

  startEditTask = (id: string) => this.setState({ ...this.state, editingTaskId: id });

  editTask = (task: Task) => {
    this.props.editTask(task);
    this.setState({ ...this.state, editingTaskId: '' });
  }

  markTaskAsDone = (taskId: string) => {
    this.props.markTaskAsDone(moment(), taskId);
  }

  setFilter = (filter: Importance | null) => {
    this.setState({ ...this.state, filterValue: filter });
  }

  render() {
    const { creatingNewOne, editingTaskId, filterValue } = this.state;
    const { tasks } = this.props;
    const filtredTasks = tasks.filter((t) => filterValue ? t.importance === filterValue : true);

    return (
      <Col id='main' lg={{ span: 10, offset: 1 }}>
        <ButtonGroup>
          <Button onClick={() => this.setFilter('normal')}>Обычные</Button>
          <Button onClick={() => this.setFilter('important')}>Важные</Button>
          <Button onClick={() => this.setFilter('critical')}>Очень Важные</Button>
          <Button onClick={() => this.setFilter(null)}>Все</Button>
        </ButtonGroup>
        <br/><br/><br/>
        <Table>
          <thead>
            <tr>
              <td>Название</td>
              <td>Описание</td>
              <td>Важность</td>
              <td>Выполнить до</td>
              <td>Была выполнена</td>
              <td>Изменить</td>
            </tr>
          </thead>
          <tbody>
            {filtredTasks.map((t) => (t.id === editingTaskId
              ? <TaskEditor key={t.id} task={t} editTask={this.editTask}/>
              : <tr key={t.id}>
                <td >{t.name}</td>
                <td >{t.discription}</td>
                <td >{importanceToText(t.importance)}</td>
                <td className={t.dueDateTime && t.dueDateTime.isBefore(moment()) ? 'overdue' : undefined}
                  title={t.dueDateTime && t.dueDateTime.isBefore(moment()) ? 'Задача просрочена' : undefined}>
                  {!!t.dueDateTime && t.dueDateTime.format(timeFormat)}
                </td>
                <td >{t.doneDateTime
                  ? t.doneDateTime.format(timeFormat)
                  : <Button onClick={() => this.markTaskAsDone(t.id)}>Выполнена</Button>}</td>
                <td >
                  <Button onClick={() => this.startEditTask(t.id)}>Редактировать</Button> {' '}
                  <Button onClick={() => this.props.deleteTask(t.id)}>Удалить</Button>
                </td>
              </tr>
            ))}
            {creatingNewOne
              ? <TaskCreator addTask={this.addTask} />
              : <tr>
                  <td >
                    <Button onClick={() => this.startCreateNew()}>Добавить</Button>
                  </td>
                  <td/>
                  <td/>
                  <td/>
                  <td/>
                  <td/>
              </tr>}
          </tbody>
        </Table>
      </Col>
    );
  }
}
