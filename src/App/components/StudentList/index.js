import React, { Component } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class StudentList extends Component {
    state = {
        students: [
            {id: 1, name: "成吉思汗"},
            {id: 2, name: "鲁班七号"}
        ],
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
        console.log('add student: ', inputValue);
    };

    saveInputRef = input => {
        this.input = input;
    };

    render() {
        const { students, inputVisible, inputValue } = this.state;
        return (
            <div>
                <h2>学员列表</h2>
                {students.map((student) => {
                    const name = student.name;
                    return (
                        <Tag
                            className="edit-tag"
                            key={name}
                            closable={false}
                        >
                            {student.name}
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
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined />添加学员
                    </Tag>
                )}
            </div>
        );
    }
}

export default StudentList;
