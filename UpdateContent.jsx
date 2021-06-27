import React, { Component } from 'react';
//react라이브러리에서 Component클래스를 로딩, 앞에 "React,"는 그냥 필수적인것으로 생각하고 무조건 넣어라

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }
  render() {
    console.log(this.props.data);
    console.log('UpdateContent render');
    return (
      <article>
        <h2>Update</h2>
        <form action="/create_process" method="post"
        onSubmit={function(e){
          e.preventDefault();//원래 action이 가리키는 page로 이동함
          this.props.onSubmit(
            this.state.id,
            this.state.title,//name='title'
            this.state.desc//name='desc'
          );
        }.bind(this)}>
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input 
              type="text" 
              name="title" 
              placeholder="title"
              //value={this.props.data.title}
              //props는 read only이기 때문에 props를 이용한 값을 바꾸려 하면 react가 개입한다
              value={this.state.title}
              onChange={this.inputFormHandler}
              //따라서 props에 접근할 수 있게 state화 시켜 setState로 접근한다
            ></input>
          </p>
          <p>
            <textarea 
             name="desc" 
             placeholder="description"
             value={this.state.desc}
             onChange={this.inputFormHandler}
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
	    </article>
    );
  }
}
//form태그에 onSubmit이라는 event를 설치해놓고, submit버튼을 클릭했을대 submit버튼을 포함하고 있는 form태그에 onSubmit가 있다면 그것을 실행한다(html의 form태그가 가지고 있는 고유기능)
export default UpdateContent;
