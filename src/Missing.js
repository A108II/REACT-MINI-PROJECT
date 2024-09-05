import React from 'react'
import { Link } from 'react-router-dom'
const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Could not find the page!</h2>
      <p>
        <Link to="/">Return to homepage</Link>
      </p>
    </main>
  )
}

export default Missing
