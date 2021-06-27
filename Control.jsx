import React, {Component} from 'react';
//react라이브러리에서 Component클래스를 로딩, 앞에 "React,"는 그냥 필수적인것으로 생각하고 무조건 넣어라

class Control extends Component {
  render() {
    return (
      <ul>
          <li><a href="/create" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>
          <li><a href="/update" onClick={function(e){
             e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>
          <li><input type="button" value="delete" onClick={function(e){
             e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)}></input></li>
        </ul>
    );
  }
}

export default Control;