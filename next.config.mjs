/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "motorbiketourexpert.com",
      "rentabikevn.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "cdn.riderly.com",
    ],
  },
};

export default nextConfig;
