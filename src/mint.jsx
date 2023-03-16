import { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SmallNFTCard from "./components/UI/SmallNFTCard";
import redirect from "./assets/redirect.png";
import MintButton from "./components/UI/MintButton";
import shiba from "./assets/InpuIcon.png";
import tag from "./assets/tag.png";
import copy from "./assets/copy.png";
import done from "./assets/check.png";
import error from "./assets/warning.png";
import fire from "./assets/fire.png";
import nftabi from "./contracts/nft_abi.json";
import tokenabi from "./contracts/token_abi.json";

import { useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import Loading from "./components/UI/Loading";
import axios from "axios";

const Mint = ({ inputReference }) => {
  const [copied, setCopied] = useState(false);
  const [inuptText, setInputText] = useState(inputReference);
  const [available, setAvailable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [nftPrice, setNftPrice] = useState("");
  const [priceState, setPriceState] = useState();
  const [fixedTokenAmount, setFixedTokenAmount] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const [allNfts, setAllNfts] = useState([]);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const handleInputText = (e) => {
    validateAddress(
      e.target.value
        .replace(".", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .trim()
    );

    setInputText(
      e.target.value
        .replace(".", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .trim()
    );
  };

  const changeCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const nftAddress = "0x56212890b11F448A0c689747A2e74C051cA4f028";
  const nftAbi = nftabi;

  const tokenAddress = "0xEa4a2327E75252517535fd013b7C6706609819DB";
  const tokenAbi = tokenabi;

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
  );

  const readOnlyNftContract = new ethers.Contract(
    nftAddress,
    nftAbi,
    staticProvider
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });

    const fetchAllNfts = async () => {
      setLoadingState(true);

      const response = await axios.get("https://sns-server.onrender.com/nfts");
      setAllNfts(response.data.latestNFTs.slice(-8).reverse());

      setLoadingState(false);
    };

    const getPriceState = async () => {
      const priceState = await readOnlyNftContract.priceInUSD();
      setPriceState(priceState);
    };

    const getFixedTokensAmount = async () => {
      const fixedPrice = await readOnlyNftContract.pricePerMintSNS();
      setFixedTokenAmount(fixedPrice);
    };

    const getPrice = async () => {
      const price = await readOnlyNftContract.getPrice();
      const formatedAmount = ethers.utils.formatUnits(price, 18);
      setNftPrice(Math.trunc(formatedAmount));
    };

    getPrice();
    getPriceState();
    getFixedTokensAmount();
    fetchAllNfts();
  }, []);

  const { data: signer } = useSigner();
  const { open } = useWeb3Modal();

  const nfContract = new ethers.Contract(nftAddress, nftAbi, signer);
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  const connectWallet = () => {
    if (chain?.id !== 1) {
      switchNetwork?.(1);
    }

    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  // function calls
  const mint = async () => {
    if (signer === undefined) {
      connectWallet();
    }

    if (chain?.id !== 1) {
      switchNetwork?.(1);
    }

    if (inuptText === "") return;

    try {
      const targetAmount = await nfContract.getPrice();

      const formatedAmount = ethers.utils.formatEther(targetAmount);
      const parsedAmount = ethers.utils.parseEther(
        Number(formatedAmount * 1.15).toString()
      );

      console.log(parsedAmount);

      const approveAmount = priceState
        ? parsedAmount
        : fixedTokenAmount.toString();

      const approve = await tokenContract.approve(nftAddress, approveAmount);

      await approve.wait();
    } catch (error) {
      console.log(error);
    }

    if (validateAddress(inuptText)) {
      try {
        const test = await nfContract.register(inuptText);
        await test.wait();

        setSuccess(true);
        setInterval(() => {
          setSuccess(false);
        }, 15000);
        setInputText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateAddress = async (text) => {
    if (signer === undefined) {
      return;
    }
    const call = await nfContract.getAddress(text);
    setAvailable(call === "0x0000000000000000000000000000000000000000");
    return call === "0x0000000000000000000000000000000000000000";
  };

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl bg-[#fff4ce] px-1 w-full relative flex justify-center items-center">
        <div className="flex flex-col items-center mt-40 gap-2">
          <div className="flex flex-col items-center mb-14">
            <h2 className="max-w-2xl font-extrabold sm:w-full text-[#78572d] text-xl lg:font-extrabold lg:text-2xl text-center">
              SNS will be striving to be the first, widely adopted name service
              for the Shibarium blockchain.
            </h2>
            <h2 className="max-w-2xl font-extrabold sm:w-full text-[#78572d] text-md mt-8 lg:font-extrabold lg:text-lg text-center">
              In order to frontrun the upcoming and momentous launch of
              Shibarium, you will be able to mint your DOGTAG on Ethereum using
              $SNS tokens — it will initially be an ERC721 token that will act
              as your receipt for a .inu domain on Shibarium.
            </h2>
          </div>

          {/* Mint card */}
          <div className="bg-[#fde6a167] max-w-xl w-full z-20 flex flex-col items-center bg-clip-padding backdrop-filter backdrop-blur-md border-[4px] border-[#c1935e] py-3 p-2 sm:p-10 rounded-xl">
            <h2 className="font-extrabold text-center text-xl sm:text-2xl text-[#563d1c]">
              Mint Your Shibarium Domain Today!
            </h2>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-4 mt-2">
              <CopyToClipboard text="0xEa4a2327E75252517535fd013b7C6706609819DB">
                <button
                  onClick={changeCopy}
                  className="bg-[#ffedcade] flex gap-2 items-center text-center placeholder:text-[#dbb88c] text-[#82633b] rounded-xl h-10 px-2 italic font-bold border-[3px] border-[#be9867] outline-none"
                >
                  0xEa..9DB{" "}
                  {copied ? (
                    <img src={done} alt="done" className="w-5 h-5" />
                  ) : (
                    <img src={copy} alt="copy" className="w-5 h-5" />
                  )}
                </button>
              </CopyToClipboard>
              <span className="text-[#fee8cb] bg-[#705633] border border-[#d9950ee2] shadow-lg py-2 px-3 rounded-xl font-extrabold">
                {nftPrice === "" ? "Loading..." : <p>Price: {nftPrice} $SNS</p>}
              </span>
            </div>

            <div className=" flex flex-col items-center mb-2">
              <input
                value={inuptText}
                spellCheck={false}
                placeholder="mydomain.inu"
                onChange={handleInputText}
                type="text"
                className="bg-[#ffedcade] max-w-md w-full mb-2 text-center placeholder:text-[#dbb88c] text-[#82633b] rounded-xl h-10 px-2 italic font-bold border-[3px] border-[#be9867] outline-none"
              />
              {inuptText !== "" && (
                <div>
                  {!available ? (
                    <span className="text-[#82633b] font-bold flex justify-center items-center gap-2">
                      Address already taken!
                      <img src={error} alt="error" className="w-5 h-5" />
                    </span>
                  ) : (
                    <span className="text-[#82633b] font-bold flex justify-center items-center gap-2">
                      {chain?.id !== 1 ? (
                        "Please, connect or switch to Mainnet."
                      ) : (
                        <span className="flex gap-1">
                          {inuptText}.inu
                          <img src={tag} alt="tag" className="w-5 h-5" />
                        </span>
                      )}
                    </span>
                  )}
                </div>
              )}

              <img src={shiba} alt="shiba-dog" className="w-60" />
            </div>
            <MintButton active={!available} onClick={mint} />
          </div>

          {/* Mint alert - only shows for a while and after user mints */}
          {success && (
            <div className="bg-[#fde6a167] w-full max-w-xl z-20 flex flex-col items-center bg-clip-padding backdrop-filter backdrop-blur-md border-[3px] border-[#c08644] p-2 sm:p-10 rounded-xl">
              <h2 className="font-bold text-center text-xl sm:text-2xl text-[#563d1c]">
                You just purchased a Shibarium domain!
              </h2>
              <a
                href="https://opensea.io/collection/dogtags-inu"
                target="_blank"
                rel="noreferrer"
              >
                <button className="text-[#fee8cb] flex justify-center items-center gap-1 bg-[#705633] border border-[#d9950ee2] mt-2 shadow-lg py-2 px-3 rounded-xl font-extrabold">
                  Check it over here{" "}
                </button>
              </a>
            </div>
          )}

          {/* latest domains */}
          <div className="flex flex-col items-center mt-28 gap-2">
            <span className="bg-[#ffc476] border-2 border-[#e1994cef] text-[#925b08] font-bold px-3 py-1 rounded-lg flex items-center justify-center">
              Hot
              <img src={fire} alt="fire" className="w-5" />
            </span>
            <h2 className="text-3xl md:text-[35px] font-bold text-center text-[#78572d]">
              Latest domains minted
            </h2>
          </div>

          {/* latest domains card */}
          <ul className="flex sm:px-2 mb-20 flex-wrap py-10 md:py-14 gap-2 sm:gap-4 justify-center max-w-3xl w-full">
            {loadingState && <Loading />}
            {allNfts?.map((item) => (
              <a
                className="flex text-sm md:text-lg text-[#FEE8CB] font-bold justify-center items-center gap-2"
                href={`https://opensea.io/assets/ethereum/0x56212890b11f448a0c689747a2e74c051ca4f028/${item.tokenId}`}
                target="_blank"
                rel="noreferrer"
                key={item.tokenId}
              >
                <SmallNFTCard domain={item.name + ".inu"} id={item.tokenId} />
              </a>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Mint;
