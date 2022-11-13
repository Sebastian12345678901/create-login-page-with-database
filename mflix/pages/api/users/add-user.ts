// using typescript and client create a post request to the database
//
import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
// Path: api/users/add-user.tsx

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('something happening here?')
  const client = await clientPromise;

  const db = client.db('users');

  const collection = db.collection('users');

  const { username, password } = req.body;

  const user = await collection.insertOne({
    username,
    password,
  })

  res.status(200).json({ user })
}
