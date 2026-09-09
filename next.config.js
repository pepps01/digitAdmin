/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "easy.unikmarketing.org",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "backendapi.flip.onl",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "backendapi.flip.onl",
        port: "",
        pathname: "/product-category/**",
      },
      {
        protocol: "https",
        hostname: "easy.unikmarketing.org",
        port: "",
        pathname: "/product-category/**",
      },
      {
        protocol: "https",
        hostname: "afri-health-bucket.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/product-category/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/product-category/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/service-category/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dufkdra3z/**",
      },
    ],
  },

  // redirects: async () =>{
  //   returyar de                           n [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: 'false'
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
