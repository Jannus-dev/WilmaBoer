export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return

    const { $auth } = useNuxtApp()
    if (!$auth) return

    // Wacht tot Firebase auth geladen is
    await new Promise((resolve) => {
        const unsub = $auth.onAuthStateChanged(() => {
            unsub()
            resolve(true)
        })
    })

    const user = $auth.currentUser

    // Als niet ingelogd → naar loginpagina
    if (!user) {
        return navigateTo('/login')
    }
})
