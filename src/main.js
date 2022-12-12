import {createApp} from 'vue';
import App from './App.vue';
import router from "./router";
import Keycloak from "keycloak-js";
import axios from "axios";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

let initOptions = {
    url: 'http://localhost:8484/', realm: 'workouttracking', clientId: 'frontend-service', onLoad:'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then(async (auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        try {
            await keycloak.loadUserInfo();
            await keycloak.loadUserProfile();
            localStorage.setItem("vue-token", keycloak.token);

            // Create user
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
                    }).catch(async (error) => {
                        if (error.response.status === 304) {
                            console.log("User already exists.")
                        } else {
                            console.log(error)
                        }
                    });
            } catch (error) {
                console.log("axios error: "+error)
            }

            const app = createApp(App);
            app.config.globalProperties.$keycloak = keycloak;
            app.use(SnackbarService);
            app.use(router);
            app.component("vue3-snackbar", Vue3Snackbar);
            app.mount('#app');
        } catch (error) {
            console.log("try catch error: "+error)
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
    console.log("Authenticated Failed. Error: "+ error);
});

