import React, { Component } from 'react'

export default class Brand extends Component {
  constructor() {
    super();
    this.state = {
      brandList: [
        {
          id: 1,
          name: '兰博基尼',
          time: new Date()
        },
        {
          id: 2,
          name: '雪佛兰',
          time: new Date()
        }
      ],
      content: {},
    }
  }

  //回车提交
  submit(e) {
    if (e.keyCode === 13) {
      let name = e.target.value;
      if (name === '') {
        alert('请输入品牌名称')
        return
      }
      //判断操作为修改还是添加
      if (this.state.content.id) {
        this.update(this.state.content, name)
      }
      else {
        this.add(name);
      }
      // 将输入框中value值清空
      e.target.value = '';
    }
  }
  // 添加
  add(name) {
    const { brandList } = this.state;
    let id = brandList.length > 0 ? brandList[brandList.length - 1].id + 1 : 1;
    let time = new Date();
    let car = {
      id,
      name,
      time
    }
    brandList.push(car);
    this.setState({ brandList })
  }

  // 编辑
  edit(item) {
    document.querySelector('input').value = item.name;
    this.state.content.id = item.id;
    // console.log(this.state.content.id);
  }
  //修改
  update(row, name) {
    const { brandList } = this.state;
    const newList = brandList.map(item => {
      if (item.id === row.id) {
        return {
          ...item,
          name: name
        }
      }
      else {
        return item
      }
    })
    this.setState({ brandList: newList });
    this.setState({ current: {} });
  }

  //删除
  del(index) {
    this.state.brandList.splice(index, 1);
    // console.log(this.state.brandList);
    this.setState({ brandList: this.state.brandList })
  }
  render() {
    return (
      <div className="container">
        <h1>品牌管理案例</h1>
        <div className="well">
          <input className="form-control" type="text" placeholder="请输入品牌名称" onKeyUp={e => this.submit(e)} />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>序号</th>
              <th>品牌名称</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {this.state.brandList.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.time.toLocaleString()}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => this.edit(item)}>编辑</button>
                  <button className="btn btn-danger" onClick={() => this.del(index)}>删除</button>
                </td>
              </tr>))}
          </tbody>
        </table>

      </div>
    )
  }
}
