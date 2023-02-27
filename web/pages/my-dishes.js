import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ethers } from "ethers";
import { useState, useEffect } from "react";

// ABI
import PlatziFood from "../utils/abi/PlatziFood.json";
import { abiPlatziFoodAddress } from "./../config";

export default function MyDishes() {
	const [comidas, setComidas] = useState([]);

	// Obtener las comidas
	const obtenerComidas = async () => {
		const { ethereum } = window;
		if (ethereum) {
			let provider = new ethers.providers.Web3Provider(ethereum);
			console.log("Provider", provider);
			let signer = provider.getSigner();
			console.log("Signer", signer);
			let contract = new ethers.Contract(abiPlatziFoodAddress, PlatziFood.abi, signer);
			console.log("Contrato", contract);
			let trans = await contract.getPlatziFoodsByOwner();
			console.log("trans", trans);

			setComidas([...trans]);
		}
	};

	useEffect(() => {
		obtenerComidas();
	}, []);

	return (
		<div className="flex justify-center">
			<div className="px-4" style={{ maxWidth: "1600px" }}>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
					{comidas.map((food, i) => (
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
