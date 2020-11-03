import React, { Component } from 'react';
import { Button, Tag, message } from 'antd';

// TODO GTB-4: - 组数应该是api返回决定的
const GROUP_NUMBER = 6;

class StudentGroup extends Component {
  // TODO GTB-4: - 这里返回数据及逻辑设计的过于复杂了，分组数据直接返回带有id和姓名的列表，直接使用后端返回的分组数据进行渲染即可
  getStudentsOfGroup = (index) => {
    return this.props.group
      .map((group, i) => {
        if (group === index) {
          return this.props.students[i];
        }
      })
      .filter((item) => item);
  };

  renderStudent = (student) => {
    const name = `${student.id}. ${student.name}`;
    return (
      <Tag className="edit-tag" key={name} closable={false}>
        {name}
      </Tag>
    );
  };

  renderGroup = (index) => {
    return (
      <table key={index}>
        <thead>
          <tr>
            <th>{`${index} 组`}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.getStudentsOfGroup(index).map((student) => this.renderStudent(student))}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  renderGroups = () => {
    if (
      !this.props.group ||
      this.props.group.length === 0 ||
      !this.props.students ||
      this.props.students.length === 0
    ) {
      return <></>;
    }
    return [...Array(GROUP_NUMBER).keys()].map((index) => this.renderGroup(index + 1));
  };

  getGroup = () => {
    fetch('http://localhost:8080/group', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((responce) => {
        return responce.json();
      })
      .then((group) => {
        this.props.setGroup(group);
      })
      .catch((error) => {
        message.error('获取分组失败');
        console.log(error);
      });
  };

  redistributeGroup = () => {
    fetch('http://localhost:8080/group', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((responce) => {
        return responce.json();
      })
      .then((group) => {
        this.props.setGroup(group);
      })
      .catch((error) => {
        message.error('重新分组失败');
        console.log(error);
      });
  };

  componentDidMount() {
    this.getGroup();
  }

  render() {
    return (
      <>
        <h2>分组列表</h2>
        <Button type="primary" danger onClick={this.redistributeGroup}>
          分组学员
        </Button>
        {this.renderGroups()}
      </>
    );
  }
}

export default StudentGroup;
