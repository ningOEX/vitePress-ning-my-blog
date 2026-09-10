export default {
    server: {
        proxy: {
            '/NxiaoTan': {
                target: 'https://blog.csdn.net/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'element-plus': ['element-plus'],
                    'vendor': ['@fortawesome/fontawesome-free']
                }
            }
        },
        chunkSizeWarningLimit: 600
    }
};