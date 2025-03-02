import { useState } from 'react'
import './App.css'


const VoteButton = ({onClick, hasVoted}) => {
  if(!hasVoted){
    return (
      <button onClick={onClick}>vote</button>
    )
  }
  else {
    return (
      <span>Thank you for voting!</span>
    )
  }

}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   //selected = index of the current anecdote

  const [selected, setSelected] = useState(0);
  const [voteCount, setVoteCount] = useState(Array(anecdotes.length).fill(0));
  const [hasVoted, setHasVoted] = useState(false);


  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const handleNextAnecdote = () => {

    let randInt = getRandomInt(anecdotes.length);
    while(randInt === selected) {
      // reroll in event random number same as before
      randInt = getRandomInt(anecdotes.length);
    }
    setSelected(randInt);
    setHasVoted(false);
  }
  
  const handleVote = () => {
    const newVoteCount = [...voteCount];
    newVoteCount[selected] += 1;
    setVoteCount(newVoteCount);
    setHasVoted(true);
  }

  const mostVotedQuote = () => {
    //return index of array item with most votes
    const currentVotes = [...voteCount];
    let [currMaxVal,index] = [0,0];
    
    voteCount.forEach((element, i) => {
      if(element >= currMaxVal){
        index = i;
        currMaxVal = element;
      }
    })

    return [index, currMaxVal];
  }
  const [iMax , maxVal] = mostVotedQuote();

  return (
    <div>
      <h1>Anecdote of the Day!</h1>
      {anecdotes[selected]}
      <br />
      <div>has {voteCount[selected]} votes</div>
      <VoteButton onClick={handleVote} hasVoted = {false}/>
      <button onClick={handleNextAnecdote}>next anecdote</button>

      <h1>Anecdote with the most votes!</h1>
      {anecdotes[iMax]}
      <div>has {maxVal} votes</div>
    </div>
  )
}

export default App