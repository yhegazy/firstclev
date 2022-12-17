import {Client, Account, Databases, Storage} from 'appwrite'

const client = new Client()

client.setEndpoint('http://206.189.255.163/v1').setProject('firstClevelandMasjidDB')

export const account = new Account(client)


//Database
export const db = new Databases(client, 'firstClevelandMasjidDB')


//Storage
export const storage = new Storage(client)