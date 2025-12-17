import { ref } from 'vue'
import { type AutocompleteRequest, type PlaceOption, type PlacesLibrary, type PlaceType} from "~/models/google";

declare var google: {
    maps: {
        importLibrary: (libraryName: string) => Promise<PlacesLibrary>
    }
}
export function usePlacesAutocomplete() {
    const suggestions = ref<PlaceOption[]>([])
    const isLoading = ref(false)
    const error = ref<unknown>(null)

    let AutocompleteSuggestion: PlacesLibrary['AutocompleteSuggestion'] | null = null
    let SessionToken: PlacesLibrary['AutocompleteSessionToken'] | null = null
    let sessionTokenInstance: object | null = null
    let isInitialized = false

    const initPlaces = async () => {
        if (isInitialized) return

        if (typeof google === 'undefined') {
            return
        }

        try {
            const lib = await google.maps.importLibrary("places")
            AutocompleteSuggestion = lib.AutocompleteSuggestion
            SessionToken = lib.AutocompleteSessionToken
            sessionTokenInstance = new SessionToken()
            isInitialized = true
        } catch (e) {
            error.value = e
        }
    }

    const search = async (query: string, type: PlaceType = 'city') => {
        if (!query || query.length < 2) {
            suggestions.value = []
            return
        }

        if (!isInitialized) {
            await initPlaces()
            if (!isInitialized) return
        }

        isLoading.value = true
        error.value = null

        try {
            let types: string[] = []

            switch (type) {
                case 'city':
                    types = ['locality', 'administrative_area_level_1', 'administrative_area_level_2']
                    break
                case 'address':
                    types = ['street_address', 'route', 'premise', 'subpremise']
                    break
                case 'establishment':
                    types = ['establishment']
                    break
                default:
                    types = ['geocode']
            }

            if (AutocompleteSuggestion && sessionTokenInstance) {
                const request: AutocompleteRequest = {
                    input: query,
                    sessionToken: sessionTokenInstance,
                    includedPrimaryTypes: types
                }

                console.log(request)

                const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request)

                console.log(results)

                suggestions.value = results.map((s) => {
                    const prediction = s.placePrediction
                    const fullText = prediction.text?.text || prediction.description || ''
                    const mainText = prediction.mainText?.text || fullText
                    const secondaryText = prediction.secondaryText?.text || ''

                    return {
                        id: prediction.placeId,
                        label: fullText,
                        description: fullText,
                        main_text: mainText,
                        secondary_text: secondaryText
                    }
                })
            }
        } catch (e) {
            suggestions.value = []
            error.value = e
        } finally {
            isLoading.value = false
        }
    }

    return {
        suggestions,
        isLoading,
        error,
        search,
        initPlaces
    }
}