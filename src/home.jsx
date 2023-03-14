import { useEffect, useState } from "react";
import NFTListItem from "./components/UI/NFTListItem";
import paw from "./assets/paw.png";
import food from "./assets/food.png";
import home from "./assets/home.png";
import colar from "./assets/collar.png";

const { getAllNFTs } = require("sns-namechecker");

const Home = () => {
  const [filterActive, setFilterActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [allNfts, setAllNfts] = useState();

  useEffect(() => {
    const fetchAllNfts = async () => {
      const allNfts = await getAllNFTs();
      setAllNfts(allNfts);
    };

    fetchAllNfts();
  }, []);

  const handleInputText = (e) => {
    setInputText(
      e.target.value
        .replace(".", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .trim()
    );

    setFilterActive(inputText !== "");
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
            <p className="max-w-lg sm:w-full text-[#78572d] font-semibold text-xl text-center">
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
        <div className="w-full relative flex flex-col items-center max-w-lg">
          <input
            value={inputText}
            onChange={handleInputText}
            placeholder="Search for a domain"
            type="text"
            className="bg-[#fff3c6] text-center text-xl font-bold placeholder:font-extrabold placeholder:text-[#cca575] placeholder:text-center text-[#82633b] rounded-xl w-full p-3 sm:p-5 italic outline-none border-[3px] border-[#be9867] mt-4"
          />

          <ul className="bg-[#8b6e48] absolute top-20 sm:top-24 flex flex-col items-center py-4 w-full rounded-xl mt-2 text-xl text-black text-center">
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
              <h2 className="flex text-lg sm:text-xl justify-center bg-[#8b6e48] text-[#FEE8CB] items-center font-bold gap-2">
                This domain is currently available!
                <img src={colar} alt="redirect" className="w-7" />
              </h2>
            )}
          </ul>
        </div>

        <h2 className="text-3xl md:text-[45px] font-bold text-center text-[#78572d] mb-3 sm:mb-10 mt-28 md:mt-36">
          Check out the latest domains created
        </h2>
        <ul className="flex sm:px-2 flex-wrap py-10 md:py-20 gap-2 sm:gap-4 justify-center max-w-7xl w-full">
          {allNfts?.map((item) => (
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
      </div>
    </section>
  );
};

export default Home;
