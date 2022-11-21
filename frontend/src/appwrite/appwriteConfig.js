import {Client, Account, Databases, Storage} from 'appwrite'

const client = new Client()

client.setEndpoint('http://localhost:8081/v1').setProject('63727265943de07bc770')

export const account = new Account(client)

//Database
export const db = new Databases(client, '637278aa811fb8962b16')

//Storage
export const storage = new Storage(client)