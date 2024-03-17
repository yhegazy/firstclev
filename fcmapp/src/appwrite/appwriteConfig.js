import {Client, Account, Databases, Query, Storage} from 'appwrite'

const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6585ce45185a5ef8b25e')

export const account = new Account(client)

//Database
export const db = new Databases(client, 'fcmdb') 

//Storage
export const storage = new Storage(client)

//CRUD OPERATIONS
export const listEvents = async(limitor) => await db.listDocuments("fcmdb", "events", [Query.limit(limitor)])
export const liveStreamOverride = await db.listDocuments("fcmdb", "settings")


//Switcher options: events, images
const listFiles = async(switcher) =>  await storage.listFiles(switcher)
export const listFilesPreview = async(switcher) => {
    const file = (await listFiles(switcher)).files.map((img) => img.$id)
    return file.map((item) => storage.getFilePreview(switcher, item))
}


export const getVideo = await db.getDocument("fcmdb", "archives", "6586ad389ff1f7159562")


