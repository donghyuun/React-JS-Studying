//index.js와 같은 맥락
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'//App.jsx, 태그명 정의

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

/*우리는 내부적으로 state값에 subject가 있는지 모른다. 외부에서 알 필요가 없는 정보를 철저하게 은닉, 숨기는 것이 좋은 사용성을 만드는 핵심이다. 핸드폰 내 전선, 부품들을 숨기는 것과 마찬가지이다.*/


