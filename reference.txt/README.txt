<화면에 보이는 부분>
index.html

<component>
App.jsx
- 여기서 render함수를 이용해 html구현
- App component를 사용하기 위해 index.jsx안에서 App태그를 사용함
--------------------------------
<props & state>
props
- 사용자가 component를 사용하는 입장에서 중요
- props를 통해 사용자가 component를 조작할수 있다
- 자신에게 전달된 props를 바꾸는 것은 금지되어 있다
state
- props의 값에 따라 내부에 구현에 필요한 data들(사용자들은 모르는 component 내부적으로 사용되는 것들)을 관리한다 
- 실제로 component를 구현할때 좀 더 복합적으로 , 좀더 다양한 일들을 하는 component를 만들때 필요한 필수적인 요소

공통
- props와 state모두 render라는 함수 호출을 유발한다. props와 state를 적당히 잘 수정하는 과정을 통해 UI를 바꿀 수 있다

=> React가 component를 만들고 component가 좋은 부품이 되기 위해서는 component를 사용하는 외부의 props와 props에 따라 그 component를 실제로 구현하는 내부의 state라는 정보가 철저하게 분리되어 있어야 한다. 그래서 양쪽의 편의성을 각자 도모해야 함
--------------------------------
상위 컴포넌트가 하위 컴포넌트를 명령할 땐 props사용

하위 컴포넌트가 상위 컴포넌트를 명령할 땐 event사용(여기선 onChnagePage event함수)
------------------------------
push: 원본 배열을 바꿈
concat: 원본 배열을 바꾸지 않고, 새로운 배열(복제본)을 만듬

어려움!!
state에 값을 추가할때.  original data를 변경하는 방법(예 push)을 쓰지말고, new data을 추가(예 concat)하는 방법을 써라
------------------------------
처음에 페이지가 load될때 모든 컴포넌트의 render함수가 호출된다.



~~~~19.6 2021 06/23 23:22