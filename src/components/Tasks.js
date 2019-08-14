// @flow
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Tasks.scss';

type Importance = 'normal' | 'important' | 'critical';

interface Task {
  name: string,
  discription: string,
  importance: Importance,
  dueTime: moment;
}

interface TaskProps{}

interface TaskState{
    address: string,
    selectors: string,
}

export default class Tasks extends React.Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      address: '',
      selectors: '',
    };
  }

  render() {
    const tasks: Task[] = [
      {
        name: 'первая', discription: 'описание1', importance: 'normal', dueTime: moment(),
      },
      {
        name: 'вторая', discription: 'описание2', importance: 'normal', dueTime: moment(),
      },
    ];

    return (
      <div id='main'>
        <table>
          <thead>
            <tr>
              <td>Название</td>
              <td>Описание</td>
              <td>Важность</td>
              <td>Время создания</td>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i}>
                <td >{t.name}</td>
                <td >{t.discription}</td>
                <td >{t.importance}</td>
                <td >{t.dueTime.format('DD MM')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Tasks.propTypes = {
};
