export default defineNuxtRouteMiddleware(async () => {
    if (import.meta.server) return

    const { $auth } = useNuxtApp()
    await new Promise((resolve) => {
        const unsub = $auth.onAuthStateChanged(() => {
            unsub()
            resolve(true)
        })
    })

    const user = $auth.currentUser
    if (user) {
        return navigateTo('/dashboard')
    }
})
