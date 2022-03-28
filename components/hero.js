import React, { useEffect, useState } from "react";
import abi from "../utils/WavePortal.json";
import { ethers } from "ethers";
require('dotenv').config();


const Hero = () => {
  const [currentAccount, setCurrentAccount] = useState("");
   const [allWaves, setAllWaves] = useState([]);
const contractAddress = process.env.REACT_APP_CONTRACTADDRESS;

const [waves,setWaves] = useState([])


  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
  const { ethereum } = window;

  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      const waves = await wavePortalContract.getAllWaves();

      let wavesCleaned = [];
       waves.forEach(wave => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message
        });
      });

      setAllWaves(wavesCleaned);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};
  


const contractABI = abi.abi;
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
               /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.wave("This is a message");
        console.log("Mining...", waveTxn.hash);
       

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
    
       
  
       
     
       count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
}

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const handleChange = (e) => {
    setWaves({
        ...wave,
        [e.target.name]: e.target.value
    });
};

 return (
    <div className="mainContainer">
      <div className="p-8">
        <div className="flex flex-col ">
        <div className="w-full">
          <div className=" text-glow text-6xl">
          Hola, Mateo here!
        </div>

        <div className=" text-gradient text-2xl">
          I am so happy to start my web3 journey ,I hope I can learn a lot
        </div>
        <form>
        <input
                class="shadow m-8 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="message"
                value={wave.message}
                onChange={handleChange}
                type="text"
                required
                autofocus
                placeholder="Say Hi"
              />
        </form>
        <button className="waveButton btn-glow btn-primary btn-semi-transparent" onClick={wave}>
          Wave at Me
        </button>
        <button className="waveButton btn-ghlow btn-primary btn-semi-transparent" onClick={getAllWaves}>Get all Waves</button>

        {!currentAccount && (
          <button className="waveButton btn-glow btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
          </div>
          <div className="w-full">
          <div className="">
        {allWaves.map((wave, index) => {
          return (
            <div key={index} className="glass rounded-md flex sm:flex-row flex-col mb-8  p-4 " >
              <div className="">
                <img src="/user.png" className="w-20 rounded-full  " />
                </div>
                <div className="items-center ml-2">

              <p className="text-3xl text-left text-white">{wave.address}</p>
              <p className="text-2xl text-left text-white">{wave.message}</p>
              <p className="text-lg text-left text-white">{wave.timestamp.toString()}</p>
                </div>
            </div>)
        })}
      </div>
          </div>
          

        </div>

      </div>
      
    </div>
  );
}

export default Hero