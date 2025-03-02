import { useState } from "react";

import "./App.css";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>&nbsp;{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = (feedback) => {
    switch (feedback) {
      case "good":
        return () => setGood(good + 1);

      case "bad":
        return () => setBad(bad + 1);

      case "neutral":
        return () => setNeutral(neutral + 1);
    }
  };

  const totalFeedback = () => good + neutral + bad;
  const calcAverage = () =>
    (good * 1 + neutral * 0 + bad * -1) / totalFeedback();
  const percentPositive = () => (good / totalFeedback()) * 100;

  if (totalFeedback() > 0) {
    return (
      <>
        <h1>give feedback</h1>
        <Button text="good" onClick={handleFeedback("good")} />
        <Button text="neutral" onClick={handleFeedback("neutral")} />
        <Button text="bad" onClick={handleFeedback("bad")} />

        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={totalFeedback()} />
            <StatisticLine text="average" value={calcAverage()} />
            <StatisticLine text="positive" value={percentPositive() + " %"} />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h1>give feedback</h1>
        <Button text="good" onClick={handleFeedback("good")} />
        <Button text="neutral" onClick={handleFeedback("neutral")} />
        <Button text="bad" onClick={handleFeedback("bad")} />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
};

export default App;
