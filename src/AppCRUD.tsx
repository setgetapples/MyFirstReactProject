import { useState } from 'react'
import './App.css'


function App() {


  // GET one
  const [customerIdToGet, setCustomerIdToGet] = useState<number>(0)


  // ADD
  const [addName, setAddName] = useState("")
  const [addEmail, setAddEmail] = useState("")


  // UPDATE
  const [customerId, setCustomerId] = useState<number>(0)
  const [updateName, setUpdateName] = useState("")
  const [updateEmail, setUpdateEmail] = useState("")


  // DELETE
  const [deleteId, setDeleteId] = useState<number>(0)


  // API response & error
  const [apiData, setApiData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)


  // GET ALL
  const getCustomers = () => {
    fetch("http://localhost:5065/api/Customers")
      .then(res => res.json())
      .then(data => setApiData(data))
      .catch(err => setError(err.message))
  }


  // GET ONE
  const getCustomer = () => {
    fetch(`http://localhost:5065/api/Customers/${customerIdToGet}`)
      .then(res => res.json())
      .then(data => setApiData(data))
      .catch(err => setError(err.message))
  }


  // CREATE
  const addCustomer = () => {
    fetch("http://localhost:5065/api/Customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addName,
        email: addEmail
      })
    })
      .then(res => res.json())
      .then(() => {
        setAddName("")
        setAddEmail("")
        getCustomers() // refresh list
      })
  }


  // UPDATE
  const updateCustomer = () => {
    fetch(`http://localhost:5065/api/Customers/${customerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: customerId,
        name: updateName,
        email: updateEmail
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed")
        getCustomers()
      })
      .catch(err => alert(err.message))
  }


  // DELETE
  const deleteCustomer = () => {
    fetch(`http://localhost:5065/api/Customers/${deleteId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Delete failed")
        }
        getCustomers()
      })
      .catch(err => setError(err.message))
  }


  return (
    <section>
      <h1>Front End</h1>


      {/* GET ONE */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Get Customer</h3>
        <input
          type="number"
          placeholder="Customer ID"
          value={customerIdToGet}
          onChange={(e) => setCustomerIdToGet(Number(e.target.value))}
        />
        <button onClick={getCustomer}>Get One</button>
      </div>


      {/* GET ALL */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Get All Customers</h3>
        <button onClick={getCustomers}>Get All</button>
      </div>


      {/* ADD */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Add Customer</h3>
        <input
          type="text"
          placeholder="Name"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.value)}
        />
        <button onClick={addCustomer}>Add</button>
      </div>


      {/* UPDATE */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Update Customer</h3>
        <input
          type="number"
          placeholder="ID"
          value={customerId}
          onChange={(e) => setCustomerId(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={updateEmail}
          onChange={(e) => setUpdateEmail(e.target.value)}
        />
        <button onClick={updateCustomer}>Update</button>
      </div>


      {/* DELETE */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Delete Customer</h3>
        <input
          type="number"
          placeholder="Customer ID"
          value={deleteId}
          onChange={(e) => setDeleteId(Number(e.target.value))}
        />
        <button onClick={deleteCustomer}>Delete</button>
      </div>


      {/* OUTPUT */}
      <div style={{ marginTop: "1rem" }}>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {apiData && (
          <pre style={{ textAlign: "left", background: "#f0f0f0", padding: "1rem" }}>
            {JSON.stringify(apiData, null, 2)}
          </pre>
        )}
      </div>
    </section>
  )
}


export default App
