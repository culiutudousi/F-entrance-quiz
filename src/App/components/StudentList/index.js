import React, { Component } from 'react';
import { Tag, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.css';

class StudentList extends Component {
  state = {
    inputVisible: false,
    // TODO GTB-4: - 没有必要双向绑定，所以inputValue state比较冗余
    inputValue: '',
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  // TODO GTB-4: - 同inputValue，handleInputChange冗余，下面涉及到inputValue都比较冗余
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  // TODO GTB-4: - 这个方法但event可以拿到输入的value，没必要作为state
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const { students } = this.props;
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
    if (!inputValue) {
      return;
    }
    // TODO GTB-4: - 请求相关可以抽取成api请求层，解耦请求与渲染
    fetch(`http://localhost:8080/student?studentName=${inputValue}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((responce) => {
        return responce.json();
      })
      .then((id) => {
        students.push({
          id,
          name: inputValue,
        });
        this.props.setStudents(students);
      })
      .catch((error) => {
        message.error('添加学员失败');
        console.log(error);
      });
  };

  handleInputCancel = () => {
    this.setState({ inputVisible: false });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  getStudents = () => {
    fetch('http://localhost:8080/student', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((responce) => {
        return responce.json();
      })
      .then((students) => {
        this.props.setStudents(students);
      })
      .catch((error) => {
        message.error('获取学员失败');
        console.log(error);
      });
  };

  componentDidMount() {
    this.getStudents();
  }

  render() {
    const { inputVisible, inputValue } = this.state;
    return (
      // TODO GTB-3: - 加强语义化标签的使用
      // TODO GTB-4: - 注意缩进
      <>
        <h2>学员列表</h2>
        {this.props.students.map((student) => {
          // TODO GTB-4: - 没必要const，直接在key里写模板字符串会更加简洁易读
          const name = `${student.id}. ${student.name}`;
          return (
            <Tag className="edit-tag" key={name} closable={false}>
              {name}
            </Tag>
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputCancel}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined />
            添加学员
          </Tag>
        )}
      </>
    );
  }
}

export default StudentList;
