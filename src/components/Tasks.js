// @flow
import React from 'react';
import { Col, Table, Button } from 'react-bootstrap';
import type Moment from 'moment';
import moment from 'moment';

import TaskCreator from './TaskCreator';
import TaskEditor from './TaskEditor';

import type { Task } from '../libs/types';
import { importanceToText } from '../libs/helpers';

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
}

export default class Tasks extends React.Component<Props, TaskState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      creatingNewOne: false,
      editingTaskId: '',
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

  render() {
    const { creatingNewOne, editingTaskId } = this.state;
    const { tasks } = this.props;
    console.log(tasks);

    return (
      <Col id='main' lg={{ span: 10, offset: 1 }}>
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
            {tasks.map((t) => (t.id === editingTaskId
              ? <TaskEditor key={t.id} task={t} editTask={this.editTask}/>
              : <tr key={t.id}>
                <td >{t.name}</td>
                <td >{t.discription}</td>
                <td >{importanceToText(t.importance)}</td>
                <td >{!!t.dueDateTime && t.dueDateTime.format('DD MM   HH:mm:ss')}</td>
                <td >{t.doneDateTime
                  ? t.doneDateTime.format('DD MM   HH:mm:ss')
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
