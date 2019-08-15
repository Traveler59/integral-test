// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTask, editTask, deleteTask } from '../actions/TaskActions';
import Tasks from '../components/Tasks';
import type { State, Task } from '../types/types';


interface Props {
  tasks: Task[];
  addNewTask: (task: Task) => void;
  changeTask: (task: Task) => void;
  removeTask: (id: string) => void;
}

class App extends React.Component<Props, {}> {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    addNewTask: PropTypes.func.isRequired,
    changeTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
  }

  render() {
    const {
      tasks, addNewTask, changeTask, removeTask,
    } = this.props;
    return <div>
      <Tasks tasks={tasks} addTask={addNewTask} editTask={changeTask} deleteTask={removeTask} />
    </div>;
  }
}


const mapStateToProps = (state: *) => ({
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = (dispatch: *) => ({
  addNewTask: bindActionCreators(addTask, dispatch),
  changeTask: bindActionCreators(editTask, dispatch),
  removeTask: bindActionCreators(deleteTask, dispatch),
});

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
