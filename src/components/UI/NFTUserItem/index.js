import tag from "../../../assets/tag.png";
import test from "../../../assets/test.svg";

const NFTUserItem = ({ id, domain }) => {
  // const parser = new DOMParser();
  // const svg = parser.parseFromString(image, "text/html");

  // const test1 = saveImage(domain);
  // console.log(test1);

  return (
    <li className="bg-[#FFECA7] shadow-lg border-2 border-[#e0b77a] rounded-xl flex flex-col gap-1 p-2">
      <div className="flex justify-center items-center w-36 h-24 sm:w-56 sm:h-44 bg-[#FFF4CE] rounded-t-xl">
        <img
          src={test}
          alt=""
          className="rounded-t-xl w-36 h-24 sm:w-56 sm:h-44"
        />
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
