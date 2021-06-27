import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';


//App Component이다.
class App extends Component {//Component클래스로부터 상속받음 
  constructor(props) {
    super(props);
    this.max_content_id = 3;//UI에 영향을 전혀 주지 않기 때문에 state값으로 할 필요가 없다. 또한 불필요한 rendering발생가능
    this.state = {
      mode: 'welcome',//초기값을 줌으로써 초기화면 설정
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS sis for design' },
        { id: 3, title: 'JAVASCRIPT', desc: 'JAVASCRIPT is for interactive' }
      ]
    }//state(or props)값이 바뀌면 state(or props)를 가지고 있는 component의 render함수가 다시 호출된다. 그리고 그 render함수가 다시 호출됨에 따라 render함수 하위에 있는 component들의 render함수도 다시 호출된다. => 화면 재구성. 
    //따라서 state내의 mode를 바꾸면 자신 및 자식의 render함수가 호출됨
    //render함수가 하는 일은 어떤 html을 그릴것인가를 결정함
  }//컴포넌트를 초기화 시키기 위한 코드로 constructor안에다가 작성하고 컴포넌트가 실행될 때 제일 먼저 실행된다
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent() {
    console.log('App render');
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      //var _content = this.getReadContent();//contents객체배열을 받음
      //_article = <ReadContent title={_content._title} desc={_content._desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {//onSubmit을 props로 전달함
        //add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        //this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc}); push는 원본을 바꿔버리기 때문에 TOC의  shouldComponentUpdate함수에 인자로 받는 새로 들어온 값과 원본의 값이 완전히 똑같아 버린다. 따라서 shouldComponentUpdate함수내에 return false가 실행되고, 값을 새로 create하여도 render함수가 호출되지 않아 값이 추가되지 않는다.

        //대신에 push를 쓰는 대신 Array.from을 이용하여
        var newContents = Array.from(this.state.contents);//contents가 배열인 경우, 객체라면 Object.assign을 이용한다
        newContents.push({ id: this.max_content_id, title: _title, desc: _desc });
        this.setState({
          contents: newContents,
          mode: 'read',
          selected_content_id: this.max_content_id
        });

        //var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc})
        //this.setState({ contents: _contents
        /*push쓸때, {contents:this.state.contents}*/
        //});//concat을 통해 기존의 값이 새로운 data로 replace된다. 이 방법이 더 좋음

        //=> 객체나 배열을 수정하려 할때, 그 값을 복제하고 그 복제한 값을 수정하여 원본과 교체한다 (유지보수 효율성 증가)
      }.bind(this)}></CreateContent>
    }
    else if (this.state.mode === 'update') {
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {//onSubmit을 props로 전달함
        //add content to this.state.contents

        //this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc}); push는 원본을 바꿔버리기 때문에 TOC의  shouldComponentUpdate함수에 인자로 받는 새로 들어온 값과 원본의 값이 완전히 똑같아 버린다. 따라서 shouldComponentUpdate함수내에 return false가 실행되고, 값을 새로 create하여도 render함수가 호출되지 않아 값이 추가되지 않는다.

        //대신에 push를 쓰는 대신 Array.from을 이용하여
        var _contents = Array.from(this.state.contents);//원본을 수정하지않고 새로운 값을 만들어서 교체한다 => immutable, good for modifing
        var i = 0;
        while (i < _contents.length) {
          if (_contents[i].id === _id) {
            _contents[i] = { id: _id, title: _title, desc: _desc };
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents: _contents,
          mode: 'read'
        });
      }.bind(this)}></UpdateContent>
    }
    //render함수안에서 this는 render함수가 속해있는 component자체를 가리킨다
    return _article;
  }
  //render메소드를 가지고 있음
  render() {
    console.log('App render');
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            //이벤트를 우리가 만듬
            this.setState({ mode: 'welcome' });
            //함수도 props로 넘길 수 있다
          }.bind(this)}
        //이 component안에서 link를 클릭했을때, 이 event(onChangePage)에 설치된 함수를 호출하도록 만듬
        >
        </Subject>
        {/*
      <header>
        <h1><a href="/" onClick={function(e){
          console.log(e);
          e.preventDefault();
          //this.state.mode = 'welcome';
          this.setState({
            mode:'welcome'
          });
          //이벤트가 실행됬을때 호출되는 함수 안에서는 this의 값이 component 자기자신을 가리키지 않고, 아무값도 세팅되어있지 않다. 따라서 bind(this)를 해줘야 함
          //이미 컴포넌트가 생성이 끝난 다음에 동적으로 state값을 바꿀때는, setState함수를 사용하여 변경하고 싶은 값을 객체형태로 전달한다. 그냥 바꾸면 바뀐것을 react가 알지 못한다.
        }.bind(this)}>{this.state.subject.title}</a></h1>
          { this.state.subject.sub }
	      </header >
      */}
        <TOC
          onChangePage={function(id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          //이 이벤트가 trigger됬을때 상위컴포넌트의 state값을 호출하는것을 통해 상위컴포넌트의 state를 바꿀 수 있다
          data={this.state.contents}>
        </TOC>
        {/*TOC에 이름이 data인 props를 준다*/}
        <Control onChangeMode={function(_mode) {
          if (_mode === 'delete') {
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);//복사
              var i = 0;
              while(i < this.state.contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div >
      //부모인 App.jsx입장에서는 내부정보인 state를 사용했고 자식에게 전달할때는 props를 통해 전달한다
    );
  }
}

export default App;

/*-------------중요!!--------------
react에서는 링크를 클릭하면 다른 url을 타고 이동하는 개념이 아니라,
event를 발생시켜서 state와 props를 변경함으로써
페이지 전체가 re-rendering(re-load 아님!!) 되면서 페이지가 state와 props에 맞게 다시 출력될 뿐이다
*/
/*
- 클래스안에 소속된 함수(method)는 "function"생략
- 컴포넌트를 만들때 컴포넌트는 반드시 하나의 최상위 태그로 시작, 만들어야 한다
- 리액트가 최종적으로 html코드를 공급해주기 때문에 웹브라우저는 리액트가 있는지 모른다.
- 리팩토링을 사용하여 똑같이 동작하지만 속성을 받아서 그것을 바탕으로 서로 다른 결과를 만들어내는 훨씬 더 똑똑한 Component를 만들 수 있다.
- reactjs.org를 참조하도록 하자
- React Developer Tools를 다운받아 개발자도구에서 쓸 수 있음(필수)
- Component들을 파일로 쪼개고 그것들을 모아서 정리하면 찾아서 사용하기 쉽다.
*/
/*
상위 component인 App의 상태를 하위 component로 전달하고 싶을 때, 상위 component의 state를 하위 component의 props의 값으로 전달한다.
*/
/*immutable을 이용해 처리를 개선함으로서 성능향상 가능*/