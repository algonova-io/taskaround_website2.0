// Based on the code you shared
export interface ListingDTO {
    id?: string
    title: string
    description: string
}

export interface TaskApplicationData {
    pitch: string
    price: number
}

export interface PaymentIntentRequest {
    userId: string
    currency: string
    amount: number
    targetId: string
    type: 'TASK' | 'SUBSCRIPTION' // etc
}