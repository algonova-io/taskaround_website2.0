export const usePublicApi = () => {
    const config = useRuntimeConfig()
    const baseUrl = `https://${config.public.firebaseRegion}-${config.public.firebaseProjectId}.cloudfunctions.net`

    const fetchPublicListings = async () => {
        return useFetch(`${baseUrl}/listListings`)
    }

    const fetchPublicTasks = async () => {
        return useFetch(`${baseUrl}/listTasks`)
    }

    return { fetchPublicListings, fetchPublicTasks }
}