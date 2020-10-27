import React, { Component } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';
import './App.scss';
import StudentList from './components/StudentList';
import StudentGroup from './components/StudentGroup';

class App extends Component {
  state = {
    students: [],
    group: []
  }

  setStudents = (students) => {
    this.setState({
      students: students
    });
  };

  setGroup = (group) => {
    this.setState({
      group: group
    });
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <StudentGroup 
          students={this.state.students}
          group={this.state.group}
          setGroup={this.setGroup}
        />
        <StudentList 
          students={this.state.students} 
          setStudents={this.setStudents} 
        />
      </div>
    );
  }
}

export default App;
