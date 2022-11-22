import {createApp} from 'vue';
import App from './App.vue';
import router from "./router";
import Keycloak from "keycloak-js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './registerServiceWorker';


let initOptions = {
    url: 'http://localhost:8484/', realm: 'workouttracking', clientId: 'frontend-service', onLoad:'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then(async (auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        await keycloak.loadUserInfo();
        await keycloak.loadUserProfile();
        localStorage.setItem("vue-token", keycloak.token);

        const app = createApp(App);
        app.config.globalProperties.$keycloak = keycloak;
        app.use(router).mount('#app');
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
}).catch(() =>{
    console.log("Authenticated Failed");
});

