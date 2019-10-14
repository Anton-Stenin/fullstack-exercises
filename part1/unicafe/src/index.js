import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const DisplayTitle = ({ text }) => <h2>{text}</h2>

const DisplayResults = ({ text, value }) => <p>{text} {value}</p>

const Button = ( {onClick, text} ) => 
        <button onClick={onClick}>
        {text}
        </button>

const Statistics = ({good, neutral, bad}) => {
    const all = good + bad + neutral;
    const average = (all === 0) ? 0 : (good - bad) / all;
    const positive = (all === 0) ? '' : (good * 100) / all + '%';

    return (
        <>
            <DisplayResults text='good' value={good}/>
            <DisplayResults text='neutral' value={neutral}/>
            <DisplayResults text='bad' value={bad}/>
            <DisplayResults text='all' value={all}/>
            <DisplayResults text='average' value={average}/>
            <DisplayResults text='positive' value={positive}/>
        </>
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
          <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
      </div>
    )
  }

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)