/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  env: {
    basePath: isProduction ? '/marksheet' : ''
  },
  reactStrictMode: true,
  basePath: isProduction ? '/marksheet' : '',
}
