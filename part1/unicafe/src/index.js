import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const DisplayTitle = ({ text }) => <h1>{text}</h1>

const DisplayResults = ({ text, value }) => <p>{text} {value}</p>

const Button = ( props ) => {
    console.log('Props look like this:', props);
    let {onClick, text} = props;
    return (
        <button onClick={onClick}>
        {text}
        </button>
    ) 
}

  const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

   
    return (
      <div>
        <div>
          <DisplayTitle text='Give Feedback'/>
          <p></p>
          <Button onClick={handleGoodClick} text='good' />
          <Button onClick={handleNeutralClick} text='neutral' />
          <Button onClick={handleBadClick} text='bad' />
          <DisplayTitle text='Statistics' />
          <DisplayResults text='good' value={good}/>
          <DisplayResults text='neutral' value={neutral}/>
          <DisplayResults text='bad' value={bad}/>
        </div>
      </div>
    )
  }

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)