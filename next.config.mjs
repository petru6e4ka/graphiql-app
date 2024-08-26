import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/features/i18n/config/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', 'rc-util', 'rc-pagination', 'rc-picker', '@ant-design/icons', '@ant-design/icons-svg'],
};

export default withNextIntl(nextConfig);
