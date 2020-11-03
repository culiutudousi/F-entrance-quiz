### 完成度：

- 页面样式有一定的还原度，但还可以加强
- 完成所有需求

**Details:**

### 测试：

- 没有测试

**Details:**

### 知识点：

- 有划分分组列表和学员列表组件，可以进步进行组件的拆分和复用
- 语义化标签使用可以加强
- 没有使用 flex 布局，没有使用 scss，写了一些基础样式
- 运用了 ES6+语法及 fetch，部分写法可以优化
- 运用 React 知识点
- 引入了 antd 组件库，但就我们使用但需求而言没有必要，太重了

**Details:**

- \- 加强语义化标签的使用
- \- 可以尝试使用 scss

### 工程实践：

- 有小步提交，提交 message 可以优化一下
- 没有抽出 Api 请求层
- 组件的拆分和复用需要加强
- 分组列表返回数据的设计有点问题
- 存在较多 lint error，需要 fix

**Details:**

- \- 没有必要双向绑定，所以 inputValue state 比较冗余
- \- 同 inputValue，handleInputChange 冗余，下面涉及到 inputValue 都比较冗余
- \- 这个方法但 event 可以拿到输入的 value，没必要作为 state
- \- 请求相关可以抽取成 api 请求层，解耦请求与渲染
- \- 注意缩进
- \- 没必要 const，直接在 key 里写模板字符串会更加简洁易读
- \- 组数应该是 api 返回决定的
- \- 这里返回数据及逻辑设计的过于复杂了，分组数据直接返回带有 id 和姓名的列表，直接使用后端返回的分组数据进行渲染即可