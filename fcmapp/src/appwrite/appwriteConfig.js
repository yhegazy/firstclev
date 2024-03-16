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


//These 2 sections are duplicates, find a way to switch between events and images without losing your mind.
export const getEvents =  await storage.listFiles("events")
export const getEventsPreview =  ()  => {
    const gallery = getEvents.files.map((img) => img.$id)
    return gallery.map((image) => storage.getFilePreview("events", image))
}

//this doesn't want to work which is stupid.
export const getGallery =  await storage.listFiles("images")
export const getGalleryPreview = () => {
    const gallery = getGallery.files.map((img) => img.$id)
    return gallery.map((image) => storage.getFilePreview("images", image))

}


export const getVideo = await db.getDocument("fcmdb", "archives", "6586ad389ff1f7159562")


