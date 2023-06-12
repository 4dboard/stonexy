import withPreconstruct from "@preconstruct/next";

process.setMaxListeners(0);
export default withPreconstruct({
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [{source: "/(.*)", destination: "/api/proxy"}];
    },
    experimental: {
        // without this, 'Error: Expected Upload to be a GraphQL nullable type.'
        serverComponentsExternalPackages: ["graphql"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
});
