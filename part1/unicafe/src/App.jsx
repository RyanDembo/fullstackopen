import { useState } from 'react'

import "./App.css"

const FeedbackButton = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (feedback) => {
    switch (feedback) {
      case 'good':
        return () => setGood(good + 1);
    
      case 'bad':
        return () => setBad(bad + 1);

      case 'neutral':
        return () => setNeutral(neutral + 1);
    } 
  }

  return (
    <>
      <h1>give feedback</h1>
      <FeedbackButton text="good" onClick={handleFeedback("good")} />
      <FeedbackButton text="neutral" onClick={handleFeedback("neutral")} />
      <FeedbackButton text="bad" onClick={handleFeedback("bad")} />

      <h1>statistics</h1>
      <StatisticsLine text='good' value = {good}/>
      <StatisticsLine text='neutral' value = {neutral}/>
      <StatisticsLine text='bad' value = {bad}/>
    </>
  )
}

export default App