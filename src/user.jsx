import NFTUserItem from "./components/UI/NFTUserItem";
import down from "./assets/down.png";
import connect from "./assets/plug.png";
import profile from "./assets/profile.png";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { addressShortener } from "./utils";
import { ethers } from "ethers";
import tokenContractAbi from "./contracts/tokens_abi.json";
import nftConrtactAbi from "./contracts/nft_abi.json";
import DomainOption from "./components/UI/SelectPrimaryDomain";
const { getNFTsByAddress } = require("sns-namechecker");

const User = () => {
  const { address, isConnected } = useAccount();
  const [primary, setprimary] = useState("cryptodaddy.inu");
  const [tokenBalance, setTokenBalance] = useState();
  const [userNfts, setUserNfts] = useState();
  const [primaryDomain, setPrimaryDomain] = useState();

  const { data: signer } = useSigner();

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
  );

  const tokenAddress = "0xEa4a2327E75252517535fd013b7C6706609819DB";
  const tokenAbi = tokenContractAbi;

  const nftContractAddress = "0x56212890b11F448A0c689747A2e74C051cA4f028";
  const nftAbi = nftConrtactAbi;

  const readTokenContract = new ethers.Contract(
    tokenAddress,
    tokenAbi,
    staticProvider
  );

  const writeNftContract = new ethers.Contract(
    nftContractAddress,
    nftAbi,
    signer
  );

  useEffect(() => {
    // const getBalance = async () => {
    //   const balance = await readTokenContract.balanceOf(address);
    //   const formatedBalance = ethers.utils.formatUnits(balance, 18);

    //   setTokenBalance(
    //     Number(Number(formatedBalance).toFixed(0)).toLocaleString()
    //   );
    // };

    const fetchUserNfts = async () => {
      const nfts = await getNFTsByAddress(
        "0x689f654f452cbe147e870d290f84e6ad479f48a0"
      );

      setUserNfts(nfts);
    };

    const fetchPrimaryDomain = async () => {
      const primaryFetch = await writeNftContract.getPrimaryDomain(
        "0x689f654f452cbe147e870d290f84e6ad479f48a0"
      );
      console.log("primaryFetch");
    };

    // getBalance();
    fetchUserNfts();
    // fetchPrimaryDomain();
  }, []);

  const changePrimary = (e) => {
    setprimary(e.target.textContent);
  };

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        <div className="flex flex-wrap justify-center gap-5 md:gap-10 lg:gap-40 xl:gap-52 max-w-7xl w-full mt-20 sm:mt-44">
          {/* Profile */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* Avatar */}
            <div className="w-36 p-2 h-36 rounded-xl bg-[#fef0bc] border-2 border-[#8B6E48]">
              <img src={profile} alt="" />
            </div>

            {/* Data */}
            {false ? (
              <ul className="flex justify-center text-[#78572d] border-2 border-[#8B6E48] bg-[#fef0bc] w-[350px] h-36 flex-col text-center sm:text-start text-lg sm:text-xl font-bold p-3 rounded-xl">
                <li>Name: Crypto Daddy (demo)</li>
                <li>
                  Address:{" "}
                  {isConnected
                    ? addressShortener(address)
                    : "0x322..sdf2 (demo)"}
                </li>
                <li>Primary: {primary}</li>
                <li>
                  SNS Balance: {isConnected ? tokenBalance : "100.000 (demo)"}
                </li>
              </ul>
            ) : (
              <ul className="flex justify-center items-center text-[#78572d] border-2 border-[#8B6E48] bg-[#fef0bc] w-[350px] h-36 flex-col text-center sm:text-start text-lg sm:text-xl font-bold p-3 rounded-xl">
                <h2 className="text-center max-w-[90%]">
                  Please, connect wallet to display your user info.
                </h2>
              </ul>
            )}
          </div>

          {/* Change Primary Domain */}
          <div className="flex flex-col gap-2">
            {/* Dropdown */}
            <div className="bg-[#A48253] w-82 py-4 rounded-xl flex flex-col gap-1 justify-center items-center">
              <h3 className="text-lg font-sans text-[#fff2e1] font-bold text-center">
                Select Primary Domain
              </h3>

              {/* Dropdown */}
              {true ? (
                <div className="flex justify-center w-full">
                  <div className="w-[90%]">
                    <div className="relative" data-te-dropdown-ref>
                      <button
                        className="gap-2 w-full px-4 bg-[#FFECA7] font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl"
                        data-te-dropdown-toggle-ref
                      >
                        {primary}
                        <img src={down} alt="down" className="w-5" />
                      </button>
                      <ul
                        className="absolute w-full z-[1000] text-[#78572d] font-bold p-4 hidden list-none overflow-x-hidden overflow-scroll max-h-[400px] rounded-lg border-none bg-[#FFECA7] shadow-lg [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenu"
                        data-te-dropdown-menu-ref
                      >
                        {userNfts?.map((item) => (
                          <DomainOption
                            onClick={changePrimary}
                            domain={item.title}
                            key={item.tokenId}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gap-2 w-[90%] px-4 bg-[#FFECA7] font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl">
                  Not available
                  <img src={connect} alt="plug" className="w-5" />
                </div>
              )}
            </div>

            {/* Redirec Buttons */}
            <div className="flex gap-2">
              <a href="https://app.dogtag.id/" target="_blank" rel="noreferrer">
                <button className="bg-[#FFECA7] font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl">
                  New Domain
                </button>
              </a>
              <a
                href="https://app.uniswap.org/0xEa4a2327E75252517535fd013b7C6706609819DB#/tokens/ethereum/0xea4a2327e75252517535fd013b7c6706609819db"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-[#FFECA7] font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl">
                  Buy SNS
                </button>
              </a>
              <a
                href="https://opensea.io/collection/dogtags-inu"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-[#FFECA7] font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl">
                  Open Sea
                </button>
              </a>
            </div>
          </div>
        </div>

        <h2 className="flex text-[#78572d] text-4xl font-bold mb-10 mt-20 text-center">
          Your Domains
        </h2>
        <ul className="flex sm:p-2 mb-10 flex-wrap gap-4 justify-center max-w-7xl w-full">
          {userNfts?.map((nft) => (
            <a
              key={nft.tokenId}
              className="flex text-sm md:text-lg text-[#FEE8CB] font-bold justify-center items-center gap-2"
              href={`https://opensea.io/assets/ethereum/0x56212890b11f448a0c689747a2e74c051ca4f028/${nft.tokenId}`}
              target="_blank"
              rel="noreferrer"
            >
              <NFTUserItem
                domain={nft.title}
                id={nft.tokenId}
                image={nft.image}
              />
            </a>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default User;
