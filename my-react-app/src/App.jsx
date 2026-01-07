import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' // >> CSS import해야 적용 됨
import Exam1 from './components/Exam1'
import Exam2 from './components/Exam2'
import Exam3 from './components/Exam3'

function App() {
  //const [count, setCount] = useState(0)
  const [showExam, setShowExam] = useState(true);

  return (
    // js 주석
    /* js 범위 주석 */
    // <> </> : 빈 태그(Fragments) : html로 렌더링되지 않음
    
    <>
      {/* JSX 주석 */}
      {/*<h1>Hello Vite + React!</h1>*/}
      {/*<button onClick={() => setShowExam(!showExam)}>죽어</button>
      {showExam && <Exam2 ddiyong="hello" test="world"/>}*/}
      {/* 조건부 렌더링 : 조건에 따라 렌더링되는 방법 && 앞에 있는 showExam이 true면 Exam1 렌더링됨
                                                    false면 Exam1 렌더링되지 않음 */}
      <Exam3 />
    </>
  )
}

export default App
