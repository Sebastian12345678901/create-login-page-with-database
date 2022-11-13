import clientPromise from '../lib/mongodb'
import post from './fetch/post.ts'

import React, { useState, useRef } from 'react'

export async function getServerSideProps() {
  try {
    await clientPromise

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home() {
  const [newUser, setNewUser] = useState({ username: '', password: '' })

  // create a Ref for username and password
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (usernameRef.current && passwordRef.current) {
      setNewUser({ username: usernameRef.current.value, password: passwordRef.current.value })
      console.log(usernameRef.current.value)
      console.log(passwordRef.current.value)
      console.log(newUser)

      fetch('/api/users/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
    }
  }

  return (
    <div className="container">
      <h1> {`Try to create a post call to some database :)`} </h1>
      <input ref={usernameRef} id='username' type='text' placeholder='username' />
      <input ref={passwordRef} id='password' type='text' placeholder='password' />
      <button onClick={handleSubmit}>Click me to post some shit</button>
    </div>
  )
}
