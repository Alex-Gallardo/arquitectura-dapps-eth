import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ethers } from "ethers";
import { useState, useEffect } from "react";

// ABI
import PlatziFood from "../utils/abi/PlatziFood.json";
import { abiPlatziFoodAddress } from "./../config";

export default function Home() {
	// const dishes = [
	// 	{
	// 		url: "https://eatyourworld.com/images/content_images/images/gallo-pinto.jpg",
	// 		name: "Gallo Pinto",
	// 		country: "Comida típica de Costa Rica"
	// 	}
	// ];

	const [dishes, setDishes] = useState([]);

	const getAllDishes = async () => {
		// Obtenemos el provider
		const provider = new ethers.providers.JsonRpcBatchProvider(process.env.STAGING_ALCHEMY_KEY);
		// Creamos el contrato
		const contract = new ethers.Contract(abiPlatziFoodAddress, PlatziFood.abi, provider);
		// Metodo del contrato
		const dishes = await contract.getAllPlatziFoods();
		console.log(dishes);
		setDishes(dishes);
	};

	useEffect(() => {
		getAllDishes();
	}, []);

	return (
		<div className="flex justify-center">
			<div className="px-4" style={{ maxWidth: "1600px" }}>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
					{dishes.map((food, i) => (
						<div key={i} className="border shadow rounded-xl overflow-hidden">
							<img style={{ height: "20rem" }} src={food.foodUrl} />
							<div className="p-4">
								<p style={{ height: "64px" }} className="text-2xl font-semibold">
									{food.foodName}
								</p>
								<div style={{ height: "70px", overflow: "hidden" }}>
									<p>{food.foodName}</p>
									<p className="text-gray-400">{food.originCountry}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
