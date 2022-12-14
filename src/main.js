import {createApp} from 'vue';
import App from './App.vue';
import ErrorPage from "./ErrorPage.vue";
import router from "./router";
import Keycloak from "keycloak-js";
import axios from "axios";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

try {
    let initOptions = {
        url: 'http://localhost:8484/', realm: 'workouttracking', clientId: 'frontend-service', onLoad:'login-required'
    }

    let keycloak = new Keycloak(initOptions);

    keycloak.init({ onLoad: initOptions.onLoad }).then(async (auth) => {
        if (!auth) {
            window.location.reload();
        } else {
            await keycloak.loadUserInfo();
            await keycloak.loadUserProfile();
            localStorage.setItem("vue-token", keycloak.token);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + keycloak.token
                }
            };

            try {
                await axios.post(`${process.env.VUE_APP_BACK_END_API_URL}/` + keycloak.profile.username + `/` + keycloak.profile.email, {}, config)
                    .then(async () => {
                        console.log("User is added.")
                        const app = createApp(App);
                        app.config.globalProperties.$keycloak = keycloak;
                        app.use(SnackbarService);
                        app.use(router);
                        app.component("vue3-snackbar", Vue3Snackbar);
                        app.mount('#app');
                    }).catch(async (error) => {
                        if (error.code === 'ERR_NETWORK') {
                            const errorPage = createApp(ErrorPage);
                            errorPage.mount('#app');
                        } else {
                            console.log('User already exists')
                            const app = createApp(App);
                            app.config.globalProperties.$keycloak = keycloak;
                            app.use(SnackbarService);
                            app.use(router);
                            app.component("vue3-snackbar", Vue3Snackbar);
                            app.mount('#app');
                        }
                    });
            } catch (err) {
                console.log('Backend service unavailable')
                const errorPage = createApp(ErrorPage);
                errorPage.mount('#app');
            }
        }

        setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.log('Token refreshed' + refreshed);
                } else {
                    console.log('Token not refreshed, valid for '
                        + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }).catch(() => {
                console.log('Failed to refresh token');
            });
        }, 60000)
    }).catch((error) =>{
        console.log("Authenticated Failed. Error: "+ error.error);
        const errorPage = createApp(ErrorPage);
        errorPage.mount('#app');
    });
} catch (error) {
    const errorPage = createApp(ErrorPage);
    errorPage.mount('#app');
}


