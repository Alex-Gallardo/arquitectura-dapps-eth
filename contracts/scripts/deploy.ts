import { ethers } from "hardhat";
const fs = require("fs");

async function main() {
	// const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	// const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
	// const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

	// const lockedAmount = ethers.utils.parseEther("1");

	const Lock = await ethers.getContractFactory("PlatziFood");
	const lock = await Lock.deploy();

	await lock.deployed();

	console.log(`deployed to ${lock.address}`);

	// Funcionalidad para que copie el archivo abi
	let config = `export const abiPlatziFoodAddress = "${lock.address}"
	`;

	let data = JSON.stringify(config);
	fs.writeFileSync("../web/config.js", JSON.parse(data));

	fs.copyFile("./artifacts/contracts/PlatziFood.sol/PlatziFood.json", "../web/utils/abi/PlatziFood.json", (err: any) => {
		if (err) {
			console.log("Error Occurred", err);
		}
	});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
