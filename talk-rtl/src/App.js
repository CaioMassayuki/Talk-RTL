import React from 'react'
import './App.css'
import FormComp from './FormComponent/FormComponent'

const App = () => {
  const [number, setNumber] = React.useState(1)
  return (
    <div className="App">
      <button onClick={() => setNumber(number + 1)}>+</button>
      <FormComp number={number} />
    </div>
  )
}

export default App
