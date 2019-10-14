import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const DisplayTitle = ({ text }) => <h2>{text}</h2>

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ( {onClick, text} ) => 
        <button onClick={onClick}>
        {text}
        </button>

const Statistics = ({good, neutral, bad}) => {

    if (good === 0 && neutral === 0 && bad === 0 ) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    const all = good + bad + neutral;
    const average = (all === 0) ? 0 : (good - bad) / all;
    const positive = (all === 0) ? '' : (good * 100) / all + '%';

    return (
        <table>
            <Statistic text='good' value={good}/>
            <Statistic text='neutral' value={neutral}/>
            <Statistic text='bad' value={bad}/>
            <Statistic text='all' value={all}/>
            <Statistic text='average' value={average}/>
            <Statistic text='positive' value={positive}/>
        </table>
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