import React, {Component} from 'react';
//react라이브러리에서 Component클래스를 로딩, 앞에 "React,"는 그냥 필수적인것으로 생각하고 무조건 넣어라

class Subject extends Component {
  render() {
    return (
      <header>
        <h1><a href="/" onClick={function(e){
          e.preventDefault();
          this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
        {this.props.sub}
	    </header>
    );
  }
}

export default Subject;