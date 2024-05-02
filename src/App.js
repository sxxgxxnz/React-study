import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// Square 컴포넌트(재사용)
function Square({value, onClick}){ //useState props 가져오기
  return <button className='square' onClick={onClick}>{value}</button> // props로 동적 데이터 수신
}
// Board 함수 컴포넌트 선언
function Board(){
  //props 정의(props가 사용될 부분과 setter초기화
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null))

  // 승자를 결정하기 위한 함수
  function calculateWinner(squares){  //squares 배열을 인자로 받음
    const lines = [ // 승자가 나올 수 있는 케이스 모두 정의 (총 8개)
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    // 마킹된 케이스 중 하나라도 위 빙고 케이스에 해당되면 더이상 마킹을 멈추고 승자 알림
    for(let i=0;i<lines.length;i++){
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b]&&squares[a] === squares[c]){
        // 가장 나중에 마킹한 플레이어가 승리
        console.log("The last player marked is the winner!")
        return squares[a]
      }
    }
    return null;
  }
  // 이벤트 처리 함수
  function handleClick(i){ 
    //square 배열이 유효하거나 승자 결정 함수가 호출되면 이벤트는 정상 처리
    if(squares[i] || calculateWinner(squares)){
      return
    }
    
    const nextSquares = squares.slice(); //squares 배열의 다음 부분으로 넘어가기
    nextSquares[i] = xIsNext ? 'X' : 'O'; // 칸에 마킹이 X가 아니면 X, X이면 O로 마킹

    setSquares(nextSquares); // 다음 부분에 칸 마킹
    setXIsNext(!xIsNext); //마킹된 칸 다음 칸을 마킹
  }
  console.log(squares) // squares 배열 값 출력

    // 클릭시 각 칸의 값이 변경되는 것을 렌더링
    return( // 9개의 게임 칸 만들기 -> Square 컴포넌트로 대체
      <>
        <div className='board-row'>
        <Square value = {squares[0]} onClick={() => handleClick(0)}/>
        <Square value = {squares[1]} onClick={() => handleClick(1)}/>
        <Square value = {squares[2]} onClick={() => handleClick(2)}/>
        </div>
        <div className='board-row'>
        <Square value = {squares[3]} onClick={() => handleClick(3)}/>
        <Square value = {squares[4]} onClick={() => handleClick(4)}/>
        <Square value = {squares[5]} onClick={() => handleClick(5)}/>
        </div>
        <div className='board-row'>
        <Square value = {squares[6]} onClick={() => handleClick(6)}/>
        <Square value = {squares[7]} onClick={() => handleClick(7)}/>
        <Square value = {squares[8]} onClick={() => handleClick(8)}/>
        </div>
      </>
    )
}
function App() {
  return (
    <>
    <Board/>
    </>
  );
}

export default App;
