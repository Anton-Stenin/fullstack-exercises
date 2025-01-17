import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const App = ( props ) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [topVoted, setTopVoted] = useState(0)

  const nextAnecdoteHandler = () => setSelected( Math.floor( Math.random() * anecdotes.length ) );

  const voteHandler = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1

    let maxVotes = 0;
    let topVoteIndex = 0;
    
    for (let i = 0; i < votesCopy.length; i ++) {
      if (maxVotes < votesCopy[i] ) {
        maxVotes = votesCopy[i]
        topVoteIndex = i;
      }
    }
    setVotes(votesCopy)
    setTopVoted(topVoteIndex)
  }


  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <Button text="next anecdote" clickHandler={nextAnecdoteHandler} />
      <Button text="vote" clickHandler={voteHandler} />
      <h2>Anecdote with most votes</h2>
      <div>
        {props.anecdotes[topVoted]}
      </div>
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
