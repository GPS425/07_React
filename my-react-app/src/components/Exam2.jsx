import { useEffect, useState } from "react";

// 함수형 컴포넌트 예제
const Exam2 = (props) => { // 매개변수 자리 : {mihyun, test}
  // 상태 정의
  const [count, setCount] = useState(0);

  // useEffect() : 함수형 컴포넌트에서 렌더링 이후 실행되는 코드(부수효과)를
  // 작성할 때 사용하는 Hook
  // 클래스형 컴포넌트의 
  // componentDidMount, componentDidUpdate, componentWillUnmount
  // 와 같은 기능 사용 가능
  useEffect(() => {
    // 이 안의 코드는 컴포넌트가 렌더링 된 후 실행됨(부수 효과 == side effect)
    console.log("마운트 완료 또는 업데이트 됨"); 
    // componentDidMount or componentDidUpdate 기능

    return () => {
      // clean-up 코드 : 언마운트 시 실행(componentWillUnmount 기능)
      console.log("언마운트 됨");
    }
  }, [count]); // 의존성 배열
  // 경우 1) 의존성 배열 작성이 아예 없을 시 : 
  // 컴포넌트가 리렌더링될 때 마다 매번 실행(무분별한 렌더링으로 인한 성능 저하)
  // 경우 2) 빈 배열 작성 시 : 마운트 시 1회 실행 + 언마운트 시 return 구문 1회 실행됨
  // 경우 3) 배열에 값 작성 시 : 배열에 있는 값이 변경될 때 마다 아래 과정 수행
  // 1) 이전 Effect 정리(clean-up:언마운트)
  // 2) 그 다음 새로운 Effect 실행(마운트)

  const handleClick = () => {
    setCount(count + 1);
  };

  // 렌더링
  return (
    <div>
      <h1>Count : {count}</h1>
      <button onClick={handleClick}>증가 버튼</button>
      <h2>부모가 준거 : {props.mihyun} {props.test}</h2>
      {/* <h2>부모가 준거 : {mihyun} {test}</h2> */}
    </div>
  )
}

export default Exam2;