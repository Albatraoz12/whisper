'use client'
import React, {useState} from 'react'
import RegisterUser from './RegisterUser'

const Admin = () => {
    const [admin, setAdmin] = useState(false)
  return (
    <>
    <div>
        <button onClick={() => setAdmin(true)}>Admin</button>
    </div>
    {admin && <RegisterUser />}
</>
  )
}

export default Admin