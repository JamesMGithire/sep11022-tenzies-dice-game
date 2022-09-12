import './App.css';
import Title from './Title'
import Tile from './Tile'
import React from 'react';
// import { ReactDOM } from 'react';
function App() {
  let newArr = () => {
    let randomArr = [];
    for (let i = 0; i < 10; i++) {
      let randomNo = Math.ceil(Math.random() * 6);
      randomArr.push(
        <Tile
          key={i}
          newKey={i}
          number={randomNo}
          click={handleClick}
          selected={false}
        />)
    }
    return randomArr;
  }
  const [dice, setDice] = React.useState(newArr);
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const allHeld = dice.every(die => die.props.selected);
    const allSameValue = dice.every(die => die.props.number === dice[0].props.number)
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);
  function handleClick(event) {
    setDice(prevArr => {
      let changedArr = [];
      let selectedId = parseInt(event.target.id);
      for (let i = 0; i < prevArr.length; i++) {
        if (selectedId === i) {
          changedArr.push(
            <Tile
              key={i}
              newKey={i}
              number={parseInt(event.target.textContent)}
              click={handleClick}
              selected={!prevArr[selectedId].props.selected}
            />)
        }
        else {
          changedArr.push(prevArr[i])
        }
      }
      return changedArr;
    })
  }

  function Button(props) {
    return (<button
      id='roll'
      key={"roll"}
      className='Button bradius9'
      onClick={props.click}
    >
      {props.btnText}
    </button>
    )
  }
  function handleRoll(e) {
    if (!tenzies) {
      setDice(prevArr => {
        let rolled = [];
        prevArr.map((el) => {
          if (el.props.selected) {
            rolled.push(el);
          }
          else {
            let randomNo = Math.ceil(Math.random() * 6);
            const keyInt = parseInt(el.key);
            rolled.push(
              <Tile
                key={keyInt}
                newKey={keyInt}
                number={randomNo}
                click={handleClick}
                selected={false}
              />)

          }
          return rolled;
        })
        return rolled;
      })
    }
    else {
      setTenzies(false)
      setDice(newArr());
    }
  }

  return (
    <div className="App">
      <div className='Tenzies bradius9'>
      {tenzies &&<div className='overlay'><h2 className='won'>You Win</h2></div>}
        <Title />
        <div>{dice}</div>
        <Button
          btnText={tenzies ? "New\nGame" : "Roll"}
          click={handleRoll}
        />

      </div>
    </div>
  );
}
export default App;
