import { useEffect, useState } from "react";
import NFTListItem from "./components/UI/NFTListItem";
import paw from "./assets/paw.png";
import food from "./assets/food.png";
import home from "./assets/home.png";
import colar from "./assets/collar.png";
import Loading from "./components/UI/Loading";
import redirect from "./assets/redirect2.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ inputSetter }) => {
  const [inputText, setInputText] = useState("");
  const [allNfts, setAllNfts] = useState([]);
  const [itemsLimit, setItemsLimit] = useState(20);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const fetchAllNfts = async () => {
      setLoadingState(true);

      const response = await axios.get("https://sns-server.onrender.com/nfts");
      setAllNfts(response.data.nfts.reverse());

      setLoadingState(false);
    };

    fetchAllNfts();
  }, []);

  const handleAdditionalItems = () => {
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);
      setItemsLimit((prevState) => prevState + 20);
    }, 1000);
  };
  const inputReferenceHandler = () => {
    inputSetter(inputText);
  };

  const handleInputText = (e) => {
    setInputText(
      e.target.value
        .replace(".", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .trim()
    );
  };

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl px-2 flex flex-col items-center min-h-screen w-full bg-[#FFF4CE]">
        {/* image and text */}
        <div className="flex flex-wrap max-w-6xl gap-10 w-full justify-center items-center mt-40 md:mt-80">
          <div className="flex items-center flex-col gap-5">
            <img
              src={home}
              alt="group-of-dogs"
              className="max-w-[900px] w-full"
            />
            <p className="max-w-xl sm:w-full text-[#78572d] font-semibold text-2xl text-center">
              Every .inu domain represents your wallet so you can receive
              crypto, NFTs and just about anything else in the Shibarium
              Metaverse
            </p>
          </div>
        </div>

        {/* Search */}
        <h2 className="text-[#78572d] text-center text-2xl md:text-3xl mt-28 font-bold">
          Looking for a specific domain?
        </h2>

        {/* Input */}
        <div className="w-full relative flex flex-col items-center max-w-lg">
          <input
            value={inputText}
            onChange={handleInputText}
            placeholder="Search for a domain"
            type="text"
            className="bg-[#fff3c6] text-center text-xl font-bold placeholder:font-extrabold placeholder:text-[#cca575] placeholder:text-center text-[#82633b] rounded-xl w-full p-3 sm:p-5 italic outline-none border-[3px] border-[#be9867] mt-4"
          />

          <ul className="bg-[#8b6e48] max-h-96 overflow-x-hidden  absolute z-10 top-20 sm:top-24 flex flex-col items-center py-4 w-full rounded-xl mt-2 text-xl text-black text-center">
            {/* Mint conditions */}
            {inputText !== "" &&
              allNfts?.filter((item) =>
                item.name
                  .replace(".inu", "")
                  .includes(inputText || inputText === "")
              ).length !== 0 &&
              !allNfts
                ?.filter((item) =>
                  item.name
                    .replace(".inu", "")
                    .includes(inputText || inputText === "")
                )
                .map((item) => item.name !== inputText)
                .includes(false) && (
                <div className="flex w-[90%] rounded-lg py-2 bg-[#A5855C] mb-3 flex-col items-center">
                  <h2 className="flex italic mb-2 text-lg sm:text-xl justify-center text-[#ffedd5] items-center font-extrabold gap-2">
                    {inputText}.inu
                  </h2>
                  <h2 className="flex mb-2 text-lg sm:text-xl justify-center text-[#FEE8CB] items-center font-bold gap-2">
                    <p>Is currently available!</p>
                  </h2>

                  <Link to="/mint">
                    <button
                      onClick={inputReferenceHandler}
                      className="bg-[#FFECA7] gap-2 text-sm font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl"
                    >
                      Mint right here!
                      <img src={redirect} alt="redirect" className="w-5" />
                    </button>
                  </Link>
                </div>
              )}

            {/* First State */}
            {!allNfts && (
              <div className="flex justify-center bg-[#8b6e48] text-[#FEE8CB] items-center font-bold gap-2">
                Every dog needs a name
                <img src={paw} alt="dog-tag" className="w-6" />
              </div>
            )}

            {/*Simple Live filter */}
            {allNfts
              ?.filter((item) =>
                item.name
                  .replace(".inu", "")
                  .includes(inputText || inputText === "")
              )
              .map((item) => item).length !== 0 ? (
              allNfts
                ?.filter((item) => item.name.indexOf(inputText) !== -1)
                .map((item) => (
                  <li
                    key={item.tokenId}
                    className="py-2 bg-[#a5855b] my-1 rounded-lg w-[90%]"
                  >
                    <a
                      className="flex text-sm md:text-lg text-[#FEE8CB] font-bold justify-center items-center gap-2"
                      href={`https://opensea.io/assets/ethereum/0x56212890b11f448a0c689747a2e74c051ca4f028/${item.tokenId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.name + ".inu"}

                      <img src={food} alt="redirect" className="w-7" />
                    </a>
                  </li>
                ))
            ) : inputText === "" ? (
              <div className="flex justify-center bg-[#8b6e48] text-[#FEE8CB] items-center font-bold gap-2">
                Every dog needs a name
                <img src={paw} alt="dog-tag" className="w-6" />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h2 className="flex italic mb-2 text-lg sm:text-xl justify-center bg-[#8b6e48] text-[#FEE8CB] items-center font-bold gap-2">
                  "{inputText}.inu"
                </h2>
                <h2 className="flex mb-5 text-lg sm:text-xl justify-center bg-[#8b6e48] text-[#FEE8CB] items-center font-bold gap-2">
                  <p>Is currently available!</p>

                  <img src={colar} alt="redirect" className="w-7" />
                </h2>

                <Link to="/mint">
                  <button
                    onClick={inputReferenceHandler}
                    className="bg-[#FFECA7] gap-2 text-sm font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl"
                  >
                    Mint right here!
                    <img src={redirect} alt="redirect" className="w-5" />
                  </button>
                </Link>
              </div>
            )}
          </ul>
        </div>

        {/* new domain */}
        <Link to="/mint" className="mt-20">
          <button className="bg-[#FFECA7] gap-2 text-sm font-bold text-[#78572d] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl">
            Mint New Domain
            <img src={redirect} alt="redirect" className="w-5" />
          </button>
        </Link>

        {/* All nfts */}
        <h2 className="text-3xl md:text-[45px] font-bold text-center text-[#78572d] mb-3 sm:mb-10 mt-28 md:mt-36">
          Check out the latest domains created
        </h2>
        <ul className="flex sm:px-2 flex-wrap py-10 md:py-20 gap-2 sm:gap-4 justify-center max-w-7xl w-full">
          {loadingState && <Loading />}
          {allNfts?.slice(0, itemsLimit).map((item) => (
            <a
              className="flex text-sm md:text-lg text-[#FEE8CB] font-bold justify-center items-center gap-2"
              href={`https://opensea.io/assets/ethereum/0x56212890b11f448a0c689747a2e74c051ca4f028/${item.tokenId}`}
              target="_blank"
              rel="noreferrer"
              key={item.tokenId}
            >
              <NFTListItem domain={item.name + ".inu"} id={item.tokenId} />
            </a>
          ))}
        </ul>

        {allNfts?.length > itemsLimit && (
          <button
            onClick={handleAdditionalItems}
            className="flex px-3 py-2 text-xl mb-10 sm:mb-20 rounded-lg justify-center bg-[#8b6e48] text-[#FEE8CB] items-center font-bold gap-2"
          >
            {loadingState ? "Loading..." : "Show more"}
          </button>
        )}
      </div>
    </section>
  );
};

export default Home;
