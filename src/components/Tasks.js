// @flow
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Table, Button } from 'react-bootstrap';
import TaskCreator from './TaskCreator';

import './Tasks.scss';

type Importance = 'normal' | 'important' | 'critical';

interface Task {
  name: string,
  discription: string,
  importance: Importance,
  dueDate: string | null;
  dueTime: number | null;
}

interface TaskProps{}

interface TaskState{
    creatingNewOne: boolean;
    tasks: Task[];
}

export default class Tasks extends React.Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      creatingNewOne: false,
      tasks: [
        {
          name: 'первая', discription: 'Реализовать, используя библиотеку React.js или фреймворк React Native, приложение со следующим функционалом:', importance: 'normal', dueDate: Date(), dueTime: 10
        },
        {
          name: 'вторая', discription: 'описание2', importance: 'important', dueDate: Date(), dueTime: 11,
        },
      ],
    };
  }

  cancelCreating = () => this.setState({ ...this.state, creatingNewOne: false });

  createNew = () => this.setState({ ...this.state, creatingNewOne: true });

  render() {
    const { creatingNewOne, tasks } = this.state;

    return (
      <Col id='main' lg={{ span: 10, offset: 1 }}>
        <Table>
          <thead>
            <tr>
              <td>Название</td>
              <td>Описание</td>
              <td>Важность</td>
              <td>Время создания</td>
              <td>Изменить</td>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i}>
                <td >{t.name}</td>
                <td >{t.discription}</td>
                <td >{t.importance}</td>
                <td >{t.dueDate}</td>
                <td >
                <Button>Редактировать</Button> {' '}
                <Button>Удалить</Button>
                </td>
              </tr>
            ))}
            {creatingNewOne
              ? <TaskCreator />
              : <tr>
                  <td >
                    <Button onClick={() => this.createNew()}>Создать</Button>
                  </td>
                  <td ></td>
                  <td ></td>
                  <td ></td>
                  <td></td>
              </tr>}
          </tbody>
        </Table>
      </Col>
    );
  }
}

Tasks.propTypes = {
};
