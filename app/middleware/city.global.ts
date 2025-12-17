export default defineNuxtRouteMiddleware((to) => {
    const defaultCity = 'karlsruhe'

    // prevent infinite loop
    if (to.path === '/') {
        return navigateTo(`/${defaultCity}`)
    }

    const segments = to.path.split('/').filter(Boolean)

    // If the first segment is NOT a city → rewrite route
    const knownCities = ['karlsruhe'] // future extendable
    const city = segments[0]

    if (!knownCities.includes(city!.toLowerCase())) {
        return navigateTo(`/${defaultCity}${to.fullPath}`)
    }
})
