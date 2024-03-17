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


//bucketID options: events, images
const listFiles = async(bucketID) =>  await storage.listFiles(bucketID)
export const listFilesPreview = async(bucketID) => {
    const file = (await listFiles(bucketID)).files.map((img) => img.$id)
    return file.map((item) => storage.getFilePreview(bucketID, item))
}

export const getBackgroundImage = async(bucketID, fileID) => {
    return  storage.getFilePreview(bucketID, fileID)

}


export const getVideo = await db.getDocument("fcmdb", "archives", "6586ad389ff1f7159562")


