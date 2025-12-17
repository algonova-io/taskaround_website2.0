
export type PlaceType = 'city' | 'address' | 'establishment'

export interface PlacePrediction {
    placeId: string
    text: { text: string }
    description?: string
    mainText?: { text: string }
    secondaryText?: { text: string }
}

export interface AutocompleteSuggestionResult {
    placePrediction: PlacePrediction
}

export interface AutocompleteRequest {
    input: string
    sessionToken?: object
    includedPrimaryTypes: string[]
}

export interface PlacesLibrary {
    AutocompleteSuggestion: {
        fetchAutocompleteSuggestions: (request: AutocompleteRequest) => Promise<{ suggestions: AutocompleteSuggestionResult[] }>
    }
    AutocompleteSessionToken: new () => object
}

export interface PlaceOption {
    id: string
    label: string
    description: string
    main_text: string
    secondary_text: string
}

