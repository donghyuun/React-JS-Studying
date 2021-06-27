import React, { Component } from 'react';
//react라이브러리에서 Component클래스를 로딩, 앞에 "React,"는 그냥 필수적인것으로 생각하고 무조건 넣어라

class ReadContent extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
	    </article>
    );
  }
}

export default ReadContent;
