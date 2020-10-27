import React, { Component } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';
import './App.scss';
import StudentList from './components/StudentList';

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

  render() {
    return (
      <div data-testid="app" className="App">
        <StudentList 
          students={this.state.students} 
          setStudents={this.setStudents} 
        />
      </div>
    );
  }
}

export default App;
