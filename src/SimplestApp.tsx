import { useEffect, useState } from 'react'
import './App.css'

// including useEffect to fetch data from the API when the app loads
// useState included to be able to fill in data from the API and to handle any errors that may occur

function App() {

  const [apiData, setApiData] = useState<any>(null) // state to hold the data from the API, becomes null if fetch fails
  const [error, setError] = useState<string | null>(null) // state to hold any error messages, becomes null if fetch works

  useEffect(() => { // useEffect runs when the app runs, we fetch data from the API here
    fetch("http://localhost:5065/api/Customers") // "fetch first from this url"
      .then((res) => res.json()) // "then take the data and turn it into json"
      .then((data) => setApiData(data)) // "then take that json data and put it in our apiData state"
      .catch((err) => setError(err.message)); // "if we get an error, we catch it and have it in this err variable"
  }, []);

  return (
    <>
      <section>
        <div>
          <h1>Front End</h1>
        </div>

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
export default App // run the App function, App()