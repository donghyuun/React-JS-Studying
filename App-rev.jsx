//max_content_id값 delete될때 변경되야 함

import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    //UI에 영향을 전혀 주지 않기 때문에 state값으로 할 필요가 없다. 또한 불필요한 rendering발생가능
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
    }
  }
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
  }//현재 read모드에서 클릭한 a태그의 id받아와 state의 contents에서 해당 데이터를 찾고 그걸 return한다
  getContent() {
    console.log('App render');
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      //welome모드일때의 값들을 ReadContent의 props로 전달하고 _article을 그 ReadContent로 변경한다
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
      //TOC의 a태그를 클릭함으로서 mode가 read로 변경되고, 클릭한 a태그의 id를 이용해 contents배열에서 해당 태그를 찾고 그 태그의 값들을 ReadContent의 props로 전달하고 _article을 그 ReadContent로 변경한다
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        //현재 this.max_content_id가 3인 상태임
        var newContents = Array.from(this.state.contents);//기존의 배열을 복사하고 
        newContents.push({ id: this.max_content_id, title: _title, desc: _desc });//그 복사한 배열에 created된 값을 push한다.
        this.setState({
          contents: newContents,
          mode: 'read',
          selected_content_id: this.max_content_id//현재 create한 값의 id로 지정한다
        });//setState함수를 이용하여 기존 contents의 값을 새로 교체한다 
      }.bind(this)}></CreateContent>
    }
    else if (this.state.mode === 'update') {
      var _content = this.getReadContent();//select된 a태그의 data를 가져온다
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {
        //_id, _title, _desc는 UpdateContent가 props로 받은 data의 id, title, desc값들임
        // props를 이용해서 하위 컴포넌트에 data를 넘겨주고 하위컴포넌트에서 변경된 값을 다시 상위컴포넌트로 적용시키기 위해 event를 이용한다.
        var _contents = Array.from(this.state.contents);//원본배열을 복사한다
        var i = 0;
        while (i < _contents.length) {
          if (_contents[i].id === _id) {
            _contents[i] = { id: _id, title: _title, desc: _desc };
            //UpdateContent에서 입력된(변경된) 값들을 받아와서 값을 변경한다
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents: _contents,
          mode: 'read'
        });// 클릭(submit)되면 contents를 새로운 배열로 교체하고, read모드로 바뀐다. 바뀔 때 selected_content_id(새로만든 값)이 _article = ReadContent에 나타난다 
      }.bind(this)}></UpdateContent>
    }
    
    return _article;
  }
  //-----------------------------------------------------------//
  render() {
    console.log('App render');
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        >
        </Subject>
        
        <TOC
          onChangePage={function(id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
              //render함수 호출을 통해 read모드일때의 변경사항들이 적용된다
            });
          }.bind(this)}
          //contents배열을 data란 이름의 props로 전달한다
          data={this.state.contents}>
        </TOC>
       
        <Control onChangeMode={function(_mode) {
          if (_mode === 'delete') {
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);//복사
              var i = 0;
              while(i < this.state.contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  //read모드에서 선택된 selected_content_id, delete모드로 바뀌어도 selected_content_id는 바뀌지 않는다
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
            });//delete가 아닐때 그냥 mode 바꿔주면 됨
          }
        }.bind(this)}></Control>
        {this.getContent()}{/*반환되는 _article이 들어간다*/}
      </div >
    );
  }
}

export default App;
