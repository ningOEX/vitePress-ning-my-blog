import DefaultTheme from 'vitepress/theme';


// components
import UpdatedTime from '../../components/UpdatedTime.vue';
import WordCount from '../../components/WordCount.vue';
import Home from '../../components/Home.vue';
import Layout from '../../components/Layout.vue';
import { ElDivider, ElTag, ElPagination } from 'element-plus';
// css
import '@fortawesome/fontawesome-free/css/all.css';
import '../style.css'; // 引入 Tailwind CSS
import 'element-plus/es/components/divider/style/css';
import 'element-plus/es/components/tag/style/css';
import 'element-plus/es/components/pagination/style/css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('UpdatedTime', UpdatedTime);
        app.component('WordCount', WordCount);
        app.component('Home', Home);
        app.component('Layout', Layout);
        app.component(ElDivider.name, ElDivider); // 注册组件
        app.component(ElTag.name, ElTag); // 注册组件
        app.component(ElPagination.name, ElPagination); // 注册组件
    },
};