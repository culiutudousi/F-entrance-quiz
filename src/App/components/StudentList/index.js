import React, { Component } from 'react';
import { Tag, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.css';

class StudentList extends Component {
    state = {
        inputVisible: false,
        inputValue: ''
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        const { students } = this.props;
        this.setState({ 
            inputVisible: false,
            inputValue: ''
        });
        if (!inputValue) { return; }
        fetch(`http://localhost:8080/student?studentName=${inputValue}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        }).then((responce) => {
            return responce.json();
        }).then((id) => {
            students.push({
                id: id,
                name: inputValue
            })
            this.props.setStudents(students);
        }).catch((error) => {
            message.error('添加学员失败');
            console.log(error);
        });
    };

    handleInputCancel = () => {
        this.setState({ inputVisible: false });
    };

    saveInputRef = input => {
        this.input = input;
    };

    getStudents = () => {
        fetch('http://localhost:8080/student', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then((responce) => {
            return responce.json();
        }).then((students) => {
            this.props.setStudents(students);
        }).catch((error) => {
            message.error('获取学员失败');
            console.log(error);
        });
    }

    componentDidMount() {
        this.getStudents();
    }

    render() {
        const { inputVisible, inputValue } = this.state;
        return (
            <>
                <h2>学员列表</h2>
                {this.props.students.map((student) => {
                    const name = `${student.id}. ${student.name}`;
                    return (
                        <Tag
                            className="edit-tag"
                            key={name}
                            closable={false}
                        >
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
                        <PlusOutlined />添加学员
                    </Tag>
                )}
            </>
        );
    }
}

export default StudentList;
