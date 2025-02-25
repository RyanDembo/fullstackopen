import { useState } from 'react'

import "./App.css"

const FeedbackButton = ({text, onClick}) => {

  return (
    <button onClick={onClick}>{text}</button>
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
        break;
    
      case 'bad':
        return () => setBad(bad + 1);

        break;

      case 'neutral':
        return () => setNeutral(neutral + 1);
        break;
    } 
  }

  return (
    <>
      <h1>give feedback</h1>
      <FeedbackButton text="good" onClick={handleFeedback("good")} />
      <FeedbackButton text="neutral" onClick={handleFeedback("neutral")} />
      <FeedbackButton text="bad" onClick={handleFeedback("bad")} />
    </>
  )
}

export default App