import Web3 from "web3";

import { ethers } from "ethers";

import abi from "./abi.json";

const isBrowser = () => typeof window !== "undefined";

const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const contract_address = "0x5eBBBCAC1a01bE778370B9d398A197F0e461D7bd";

export const Mint = async () => {
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);

  const tx = await contract.mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmaTtKUBUhcuNXwcy9WYo4dmdndh6Z6a7aHwXLcMv78RTW"
  );

  await tx.wait();

  console.log("tx", tx);

  return tx;
};
