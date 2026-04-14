import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import dougie from './assets/dougie_drag.png'
import heroImg from './assets/hero.png'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  const [apiData, setApiData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    fetch("http://localhost:5065/api/Customers")
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <section id="center">
        <div className="marquee">
          <div className="marquee-content">
            <img src={dougie} className="logo" alt="Dougie logo" />
          </div>
        </div>
        <div>
          <h1>This is my cool lab app</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <button
          className="counter"
          onClick={() => setCount((count) => count - 1)}
        >
          Subtract the count
        </button>

        <div style={{marginTop: "1rem"}}>
          {error && <p style={{color: "red"}}>Error: {error}</p>}
          {apiData && (
            <pre style={{textAlign: "left", backgroundColor: "#f0f0f0", padding: "1rem"}}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          )
          }
        </div>

        {count === 67 && <p>OMG IT'S 67</p>}
      </section>

      <div className="ticks"></div>

      <div>
        {count === 67 && <p>AMBATUKAM</p>}
      </div>
      
    </>
  )
}

export default App
