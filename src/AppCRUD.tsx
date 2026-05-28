import { useEffect, useState } from 'react'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  const [apiData, setApiData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  const getCustomers = () => {
    fetch("http://localhost:5056/api/Customers/2")
    .then(res => res.json())
    .then(data => setApiData(data))
    .catch(err => setError(err.message));
  };

  const getAllCustomers = () => {
  fetch("http://localhost:5065/api/Customers")
    .then(res => res.json())
    .then(data => setApiData(data))
    .catch(err => setError(err.message));
  };

  useEffect(() => {
    fetch("http://localhost:5065/api/Customers/2")
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
        <button className="counter" onClick={getCustomers}>Get Customer #2</button>
        <button className="counter" onClick={getAllCustomers}>Get All Customers</button>
        <div style={{marginTop: "1rem"}}>
          {error && <p style={{color: "red"}}>Error: {error}</p>}
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
