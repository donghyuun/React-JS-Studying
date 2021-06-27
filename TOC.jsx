import React, { Component } from 'react';
//react라이브러리에서 Component클래스를 로딩, 앞에 "React,"는 그냥 필수적인것으로 생각하고 무조건 넣어라

class TOC extends Component {
  shouldComponentUpdate(newProps, newState){
    //props,state가 바뀌었을때 바뀐값을 받는다
    console.log('===> TOC render shouldComponentUpdate'
    ,newProps.data//새로 들어온 data
    ,this.props.data//기존의 data
    );
    if(this.props.data === newProps.data){
      return false;//reder함수의 호출을 거부함. true면 render함수가 호출됨
    } 
    return true;
    
  }//shouldComponentUpdate는 새로 들어온 값과 기존의 값에 접근할 수 있다.
  render() {
    console.log('===> TOC render');
    var lists = [];
    var data = this.props.data;//contents배열이 들어옴
    var i = 0;
    while(i < data.length){
      lists.push(
        <li key={data[i].id}>{/*배열 각 요소들의 id값*/}
        <a href={"/content/"+data[i].id}
          data-id={data[i].id}
          //data-라는 접두사로 시작되는 속상은 dataset이라는 특수한 것을 통해 접근할 수 있다
          onClick={function(e){
            //e.target은 event가(를) 소재(소유)하고 있는, 위의 예시로는 a태그를 가리킨다
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)}
        >
          {data[i].title}
        </a>
        </li>);
      i = i + 1;
      //key={data[i].id}는 우리가 만드는 application에서 사용하는게 아니라 React가 내부적으로 필요해서 요청하는것. 그려러니 하고 입력해주면 됨
    }
    //위 코드를 통해 data를 바꿀 때 logic을 안바꿔도 된다.
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}
export default TOC;
{/*data-속성안쓰고 하는 법
<a href={"/content/"+data[i].id}
          onClick={function(id, e){
            //e.target은 event가(를) 소재(소유)하고 있는, 위의 예시로는 a태그를 가리킨다
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this, data[i].id)}
        >
*/}