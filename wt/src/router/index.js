import HomePage from '@/HomePage'
import AboutPage from '@/AboutPage'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
