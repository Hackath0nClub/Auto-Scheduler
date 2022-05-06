/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const withTM = require("next-transpile-modules")([
  "frappe-gantt-react",
  "frappe-gantt",
]);

module.exports = withTM({});
