import "../styles/globals.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {
	const [walletAccount, setWalletAccount] = useState("");
	const [connected, setConnected] = useState(false);

	// Valida que el browser tenga instalado Metamask
	const checkIfMetamaskIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log("Metamask NO se encuentra instalado");
		} else {
			console.log("Metamask habilitado!");
			// Metodo de Metamask cuando cambiamos de RED (Cadena)
			// ethereum.on()
			if (ethereum.networkVersion == 5) setConnected(true);

			ethereum.on("chainChanged", (networkID) => {
				console.log("NetworkEthereum", networkID, parseInt(networkID));
				if (parseInt(networkID) == 5) setConnected(true);
			});
		}

		// eth_accounts : Verifica si existen cuentas
		const accounts = await ethereum.request({ method: "eth_accounts" });
		// Obtenemos el contenido
		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner();
		// Validamos
		if (accounts.length != 0) {
			setWalletAccount(accounts[0]);
		} else {
			console.log("No se encuentra una cuenta autorizada");
		}
	};

	useEffect(() => {
		checkIfMetamaskIsConnected();
	}, []);

	// Funcion para conectar Metamask
	const connectMetamask = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				alert("Conecta Metamask");
				return;
			}

			// eth_requestAccounts: Solicita las cuentas Metamask
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log(accounts[0]);
			setWalletAccount(accounts[0]);
		} catch (err) {
			console.log("Ha ocurrido un error", err);
		}
	};

	return (
		<div>
			{!connected && (
				<div className={styles.container}>
					<div className={styles.wrongNetwork}>
						<h1>Red equivocada</h1>
						<p>Por favor conectarse a la red Goerli</p>
					</div>
				</div>
			)}

			{!walletAccount && (
				<div className={styles.container}>
					<button className={styles.walletButton} onClick={connectMetamask}>
						Log in
					</button>
				</div>
			)}

			{walletAccount && (
				<div>
					<main>
						<nav className="border-b p-6">
							<p className="text-4xl font-bold">Platzi Eaters</p>
							<div className="flex mt-4">
								<Link href="/">
									<a className="mr-4 text-pink-500">Inicio</a>
								</Link>
								<Link href="/add-dish">
									<a className="mr-6 text-pink-500">Agregar platillos</a>
								</Link>
								<Link href="/my-dishes">
									<a className="mr-6 text-pink-500">Mis platillos</a>
								</Link>
							</div>
						</nav>
					</main>
					<Component {...pageProps} />
				</div>
			)}
		</div>
	);
}

export default MyApp;
