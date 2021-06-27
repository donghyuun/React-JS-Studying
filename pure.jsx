//index.js와 같은 맥락
import React from 'react'
import ReactDOM from 'react-dom'
import './pure.css'
import Nav from './Nav'//App.jsx, 태그명 정의

ReactDOM.render(
  <React.StrictMode>
    <Nav />
  </React.StrictMode>,
  document.getElementById('roottt')
)


