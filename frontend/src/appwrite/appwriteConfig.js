import {Client, Account, Databases, Storage} from 'appwrite'

const client = new Client()

client.setEndpoint('https://appwrite.firstcleveland.org/v1').setProject('fcm-appwrite')

export const account = new Account(client)


//Database
export const db = new Databases(client, 'firstClevelandMasjidDB')


//Storage
export const storage = new Storage(client)