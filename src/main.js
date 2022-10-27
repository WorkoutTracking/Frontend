import {createApp} from 'vue';
import App from './App.vue';
import router from "./router";
import './registerServiceWorker';
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.use(router)
    .use(
        createAuth0({
            domain: "dev-vvr65zntgft7vbt4.us.auth0.com",
            client_id: "HYG2eZkXMIPSGMTGSEmMamO9xOT3D984",
            redirect_uri: window.location.origin
        })
    )
    .mount('#app');
