import {Client, Account, Databases, Storage} from 'appwrite'

const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6585ce45185a5ef8b25e')

export const account = new Account(client)


//Database
export const db = new Databases(client, 'fcmdb') 

//Storage
export const storage = new Storage(client)