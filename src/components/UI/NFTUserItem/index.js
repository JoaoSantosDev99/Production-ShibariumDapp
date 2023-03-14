import tag from "../../../assets/tag.png";
import SaveImage from "../NftSvg/test";

const NFTUserItem = ({ id, domain, image }) => {
  const svg = SaveImage(domain.replace(".inu", ""));
  let base64Data = window.btoa(svg);

  return (
    <li className="bg-[#FFECA7] transition-all ease-in-out duration-300 hover:bg-[#ffe37e] hover:border-[#ffb442] shadow-lg border-2 border-[#e0b77a] rounded-xl flex flex-col gap-1 p-2">
      <div className="flex justify-center items-center w-36 h-24 sm:w-56 sm:h-44 bg-[#FFF4CE] rounded-t-xl">
        {image ? (
          <img
            src={`data:image/svg+xml;base64,${base64Data}`}
            alt=""
            className="w-36 h-24 transition-all ease-in-out duration-300 hover:rotate-[6deg] scale-100 hover:scale-110 sm:w-56 sm:h-44 rounded-t-xl"
          />
        ) : (
          <img
            src={tag}
            alt=""
            className="w-36 h-24 transition-all ease-in-out duration-300 hover:rotate-[6deg] scale-100 hover:scale-110 sm:w-56 sm:h-44 rounded-t-xl"
          />
        )}
      </div>

      <ul className="flex bg-[#8B6E48] text-[#FEE8CB] p-1 rounded-b-xl flex-col items-center">
        <li>{domain}</li>
        <li>
          <h3>Dogtag Id: {id}</h3>
        </li>
      </ul>
    </li>
  );
};

export default NFTUserItem;
