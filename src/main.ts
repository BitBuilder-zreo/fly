
import App from './App.vue';

import { createApp } from 'vue';

//引导函数

async function bootstrap() {

    const app = createApp(App);

    app.mount('#app');

    console.log('app', app);
}

//启动函数
bootstrap();