import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PlatziFood", function () {
	it("Add new dish", async function () {
		const [owner, ads1] = await ethers.getSigners();
		const PlatziFood = await ethers.getContractFactory("PlatziFood");
		const platziFood = await PlatziFood.deploy();

		// Usamos la primera funcion
		var addFood = await platziFood.addPlatziFood("https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg", "Chino", "China");

		// simula el tiempo de agregacion del bloque
		await addFood.wait();

		// Lo conectamos con otra cuenta
		var addFood2 = await platziFood.connect(ads1).addPlatziFood("xd", "xdd", "xddd");

		// Prueba #1
		var foods = await platziFood.getAllPlatziFoods();
		expect(foods.length).to.equal(2);

		// Prueba #2
		var existFood = await platziFood.getPlatziFoodsByOwner();
		expect(existFood.length).to.equal(1);
	});
});
