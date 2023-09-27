// Copyright 2023 Ziad Malik
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@nuxtjs/supabase"],
    supabase: {
        redirectOptions: { 
            login: "/login",
            callback: "/",
            exclude: ["/"] 
        },
    },
});
