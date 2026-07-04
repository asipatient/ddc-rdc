/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" pour Congo Cloud (Node.js). Netlify utilise son propre
  // adaptateur OpenNext et definit NETLIFY=true pendant le build.
  ...(process.env.NETLIFY ? {} : { output: "standalone" }),
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
