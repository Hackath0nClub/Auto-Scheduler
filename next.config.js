/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$"
})

module.exports = removeImports({
  webpack(nextConfig, options) {
    return nextConfig
  },
})

const withTM = require('next-transpile-modules')([
  'frappe-gantt-react'
])

module.exports = withTM({});

