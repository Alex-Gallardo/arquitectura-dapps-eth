import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { abiPlatziFoodAddress } from "./../config";

import PlatziFood from "../utils/abi/PlatziFood.json";

export default function AddDish() {
	const router = useRouter();
	const [formInput, updateFormInput] = useState({ fileUrl: "", name: "", originCountry: "" });

	// Agregar comida
	const addDish = async () => {
		// Verificamos Ethereum
		const { ethereum } = window;
		if (ethereum) {
			// Buscamos el proveedor
			const provider = new ethers.providers.Web3Provider(ethereum);
			// Obtenemos el signer
			const signer = provider.getSigner();
			// Obtenemos el contrato
			console.log("dat", PlatziFood);
			const contract = new ethers.Contract(abiPlatziFoodAddress, PlatziFood.abi, signer);
			// Transaccion realizada
			const transaction = await contract.addPlatziFood(formInput.fileUrl, formInput.name, formInput.originCountry);
			// Llamamos la transaccion y esperamos
			transaction.wait();
			router.push("/");
		}
	};

	return (
		<div className="flex justify-center">
			<div className="w-1/2 flex flex-col pb-12">
				<input placeholder="URL de comida" className="mt-8 border rounded p-4" onChange={(e) => updateFormInput({ ...formInput, fileUrl: e.target.value })} />
				<input placeholder="Nombre de comida" className="mt-8 border rounded p-4" onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })} />
				<input placeholder="Paiz de origen" className="mt-8 border rounded p-4" onChange={(e) => updateFormInput({ ...formInput, originCountry: e.target.value })} />
				<button onClick={addDish} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 ">
					Agregar comida
				</button>
			</div>
		</div>
	);
}
