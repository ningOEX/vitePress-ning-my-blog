import DefaultTheme from 'vitepress/theme';

// components
import UpdatedTime from '../../components/widgets/UpdatedTime.vue';
import WordCount from '../../components/widgets/WordCount.vue';
import Home from '../../components/layout/Home.vue';
import Layout from '../../components/layout/Layout.vue';
import navContent from "../../components/nav/index.vue"
import ElementPlus from 'element-plus'
import ImagesView  from '../../components/widgets/imgaesView.vue'
import iconTop from "../../components/icons/iconTop.vue"
import iconBottom from "../../components/icons/iconBottom.vue"
import navItem from '../../components/nav/navItem.vue';
import collectItem from '../../components/nav/collectItem.vue';
import tmdbMovie from "../../components/works/index.vue"

// css
import '@fortawesome/fontawesome-free/css/all.css';
import '../style.css'; // 引入 Tailwind CSS
import 'element-plus/dist/index.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('UpdatedTime', UpdatedTime);
        app.component('WordCount', WordCount);
        app.component('Home', Home);
        app.component('Layout', Layout);
        app.component('navContent', navContent);
        app.component('ImagesView',ImagesView);
        app.component('iconTop',iconTop);
        app.component('iconBottom',iconBottom);
        app.component('navItem',navItem);
        app.component('collectItem',collectItem);
        app.component('tmdbMovie',tmdbMovie)
        app.use(ElementPlus);
    },
};