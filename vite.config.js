export default {
    server: {
        proxy: {
            '/NxiaoTan': {
                target: 'https://blog.csdn.net/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
};