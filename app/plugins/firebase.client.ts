
import { initializeApp } from 'firebase/app'
import { getFunctions } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const firebaseConfig : {
        apiKey: string,
        authDomain: string,
        projectId: string
    } = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)

    const functions = getFunctions(app, config.public.firebaseRegion)

    return {
        provide: {
            firebaseApp: app,
            auth,
            db,
            functions
        }
    }
})