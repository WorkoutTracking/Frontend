import HomePage from '@/HomePage'
import StatsPage from '@/StatsPage'
import Workout from "@/components/Workout";
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
    },
    {
        path: '/workout/:id',
        name: 'WorkoutComponent',
        component: Workout
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
