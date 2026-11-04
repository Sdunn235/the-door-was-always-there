// Composition root: create the Vue app and attach it to <div id="app"> in index.html.
// Kept thin on purpose (LucentForge's main.py lesson): wiring only, no game logic here.
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
