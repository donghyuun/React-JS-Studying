import React, { Component } from 'react';
//react라이브러리에서 Component클래스를 로딩, 앞에 "React,"는 그냥 필수적인것으로 생각하고 무조건 넣어라

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form action="/create_process" method="post"
        onSubmit={function(e){
          e.preventDefault();//원래 action이 가리키는 page로 이동함
          this.props.onSubmit(
            e.target.title.value,//name='title'
            e.target.desc.value//name='desc'
          );
        }.bind(this)}>
          <p><input type="text" name="title" placeholder="title"></input></p>
          <p><textarea name="desc" placeholder="description"></textarea></p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
	    </article>
    );
  }
}
//form태그에 onSubmit이라는 event를 설치해놓고, submit버튼을 클릭했을대 submit버튼을 포함하고 있는 form태그에 onSubmit가 있다면 그것을 실행한다(html의 form태그가 가지고 있는 고유기능)
export default CreateContent;
