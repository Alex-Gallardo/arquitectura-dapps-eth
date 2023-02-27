import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
	solidity: "0.8.17",
	// CONECTARSE A ALCHEMY
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337
		},
		goerli: {
			url: process.env.STAGING_ALCHEMY_KEY,
			accounts: [process.env.PRIVATE_KEY!]
		}
	}
};

// PARA DESPLEGAR EL CONTRATO
// npx hardhat run --network goerli scripts/deploy.ts

export default config;
