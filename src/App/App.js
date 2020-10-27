import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import StudentList from './components/StudentList';

class App extends Component {
  state = {
    students: [],
    group: []
  }
  render() {
    return (
      <div data-testid="app" className="App">
        <StudentList />
      </div>
    );
  }
}

export default App;
