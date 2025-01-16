import React, { useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  CoinbaseWalletAdapter,
  KeystoneWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  TrezorWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
// import Button from "@mui/material/Button";
// import MetaMaskIcon from "./Icons/MetaMaskIcon";

const WalletConnector: React.FC = () => {
  const [setEthereum] = useState<any>(null);

  // Detect MetaMask
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      setEthereum(window.ethereum);
    }
  }, []);

  // // Connect to MetaMask
  // const connectMetaMask = async () => {
  //   if (ethereum) {
  //     try {
  //       const accounts = await ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       console.log("accounts: ", accounts);
  //     } catch (error) {
  //       console.error("Error connecting to MetaMask:", error);
  //     }
  //   } else {
  //     console.log("Please install MetaMask");
  //   }
  // };

  // Solana Connection Setup
  const endpoint = clusterApiUrl("devnet");
  const wallets = [
    new PhantomWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new TrezorWalletAdapter(),
    new LedgerWalletAdapter(),
    new KeystoneWalletAdapter(),
  ];

  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default WalletConnector;
