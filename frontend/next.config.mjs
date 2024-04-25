/** @type {import('next').NextConfig} */
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

const from = "node_modules/bootstrap-italia/dist/";
const to = path.join(process.cwd(), "./public/bootstrap-italia/dist");

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
            new CopyPlugin({
                patterns: [{ from, to }],
            })
        );
        return config;
    },
};

export default nextConfig;
