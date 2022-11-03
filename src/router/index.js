import HomePage from '@/HomePage'
import StatsPage from '@/StatsPage'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/stats',
        name: 'StatsPage',
        component: StatsPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
