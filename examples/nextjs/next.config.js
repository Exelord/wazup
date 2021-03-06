const withPlugins = require('next-compose-plugins');

const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [
  bundleAnalyzer
];

const config = {};

module.exports = withPlugins([...plugins], config);