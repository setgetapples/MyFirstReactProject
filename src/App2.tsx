import { useEffect, useState } from 'react'
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
      <section>
        <div>
          <h1>Front End</h1>
        </div>

        <div style={{marginTop: "1rem"}}>
          {apiData && (
            <pre style={{textAlign: "left", backgroundColor: "#f0f0f0", padding: "1rem"}}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          )
          }
        </div>
      </section>

      <div className="ticks"></div>
      
    </>
  )
}

export default App
