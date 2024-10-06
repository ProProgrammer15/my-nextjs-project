import i18nConfig from './next-i18next.config.js';

const nextConfig = {
    reactStrictMode: true,
    basePath: '/my-app',
    i18n: i18nConfig.i18n, // Pass the i18n config here
    experimental: {
        appDir: true, // Using appDir experimental feature
    },
};

export default nextConfig;
