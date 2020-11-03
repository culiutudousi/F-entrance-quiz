import React, { Component } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';
import './App.scss';
import StudentList from './components/StudentList';
import StudentGroup from './components/StudentGroup';

// TODO GTB-1: * 页面样式有一定的还原度，但还可以加强
// TODO GTB-1: * 完成所有需求
// TODO GTB-2: * 没有测试
// TODO GTB-3: * 有划分分组列表和学员列表组件，可以进步进行组件的拆分和复用
// TODO GTB-3: * 语义化标签使用可以加强
// TODO GTB-3: * 没有使用flex布局，没有使用scss，写了一些基础样式
// TODO GTB-3: * 运用了ES6+语法及fetch，部分写法可以优化
// TODO GTB-3: * 运用React知识点
// TODO GTB-3: * 引入了antd组件库，但就我们使用但需求而言没有必要，太重了
// TODO GTB-4: * 有小步提交，提交message可以优化一下
// TODO GTB-4: * 没有抽出Api请求层
// TODO GTB-4: * 组件的拆分和复用需要加强
// TODO GTB-4: * 分组列表返回数据的设计有点问题
// TODO GTB-4: * 存在较多lint error，需要fix
class App extends Component {
  state = {
    students: [],
    group: [],
  };

  setStudents = (students) => {
    this.setState({
      students,
    });
  };

  setGroup = (group) => {
    this.setState({
      group,
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
        <StudentList students={this.state.students} setStudents={this.setStudents} />
      </div>
    );
  }
}

export default App;
