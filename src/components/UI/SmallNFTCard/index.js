import tag from "../../../assets/tag.png";
import SaveImage from "../NftSvg/svgGenerator";

const NFTUserItem = ({ id, domain }) => {
  const svg = SaveImage(domain.replace(".inu", ""));
  let base64Data = window.btoa(svg);

  return (
    <li className="bg-[#FFECA7] transition-all ease-in-out duration-300 hover:bg-[#ffe37e] hover:border-[#ffb442] shadow-lg border-2 border-[#e0b77a] rounded-xl flex flex-col gap-1 p-2">
      <div className="flex justify-center items-center w-36 h-24 bg-[#FFF4CE] rounded-t-xl">
        <img
          src={`data:image/svg+xml;base64,${base64Data}`}
          alt=""
          className="w-32 transition-all ease-in-out duration-300 hover:rotate-[6deg] scale-100 hover:scale-110 rounded-t-xl"
        />
      </div>

      <ul className="flex bg-[#8B6E48] text-sm text-[#FEE8CB] p-1 rounded-b-xl flex-col items-center">
        <li>{domain}</li>
        <li>
          <h3>Dogtag Id: {id}</h3>
        </li>
      </ul>
    </li>
  );
};

export default NFTUserItem;
