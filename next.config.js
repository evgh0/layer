/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you are deploying to a GitHub Pages project page (e.g. https://<username>.github.io/<repo-name>/),
  // uncomment the lines below and set them to your repository name.
  // basePath: '/layer',
};

module.exports = nextConfig;
