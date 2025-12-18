import { httpsCallable } from 'firebase/functions'
import type { ListingDTO, TaskApplicationData } from '~/models/backend'

export const useBackend = () => {
    const { $functions } = useNuxtApp()

    /**
     * Generic helper to call Firebase Functions
     */
    const call = async <T = any, R = any>(name: string, data?: T): Promise<R> => {
        try {
            const fn = httpsCallable<T, R>($functions, name)
            const result = await fn(data)
            return result.data
        } catch (error: any) {
            console.error(`Firebase Function Error (${name}):`, error.message)
            throw error
        }
    }

    // --- 1. TASKS ---
    const getTasks = () => call('getTasks')

    const applyToTask = (taskId: string, userId: string, data: TaskApplicationData) =>
        call('applyToTask', { taskId, userId, data })

    const withdrawApplication = (taskId: string, userId: string, applicationId: string) =>
        call('withdrawApplication', { taskId, userId, applicationId })

    // --- 2. LISTINGS ---
    const getListings = () => call('getListings')

    const createListing = (listing: ListingDTO) =>
        call('createListing', listing)

    const updateListing = (listing: ListingDTO) =>
        call('updateListing', listing)

    const deleteListing = (id: string) =>
        call('deleteListing', { id })

    // --- 3. PAYMENTS ---
    const getPaymentAccountInfo = (userId: string) =>
        call('getPaymentAccountInfo', { userId })

    const getTaskPaymentHistory = (userId: string) =>
        call('getTaskPaymentHistory', { userId })

    const getTaskPayoutHistory = (userId: string) =>
        call('getTaskPayoutHistory', { userId })

    const getPaymentIntent = (data: any) =>
        call('getPaymentIntent', data)

    const validateVoucher = (code: string, userId: string) =>
        call('validateVoucher', { code, userId })

    // --- 4. USER ---
    const deleteUserAccount = () => call('deleteUserAccount')

    const sendEmailVerification = (userId: string) =>
        call('sendEmailVerification', { userId })

    const syncTaskerPlan = (userId: string) =>
        call('syncTaskerPlan', { userId })

    return {
        getTasks,
        applyToTask,
        withdrawApplication,
        getListings,
        createListing,
        updateListing,
        deleteListing,
        getPaymentAccountInfo,
        getTaskPaymentHistory,
        getTaskPayoutHistory,
        getPaymentIntent,
        validateVoucher,
        deleteUserAccount,
        sendEmailVerification,
        syncTaskerPlan
    }
}