import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import"],
    includePaths: [path.join(process.cwd(), "node_modules")],
  },
};

export default nextConfig;
