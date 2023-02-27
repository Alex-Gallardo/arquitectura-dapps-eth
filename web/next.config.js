/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		STAGING_ALCHEMY_KEY: "https://eth-goerli.g.alchemy.com/v2/S47qoLRNHOMkbRMJhuXjwXWjk-R42gC9"
	}
};

// Variables de ambiente propias de Next

module.exports = nextConfig;
