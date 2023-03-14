import tag from "../../../assets/tag.png";

const NFTListItem = ({ domain, id }) => {
  return (
    <li
      key={id}
      className="bg-[#FFECA7] border-2 shadow-lg border-[#e0b77a] rounded-xl flex flex-col gap-1 p-2"
    >
      <div className="w-36 h-24 flex justify-center items-center sm:w-56 sm:h-44 bg-[#FFF4CE] rounded-t-xl">
        <img src={tag} alt="tag" className="w-24 md:w-44" />
      </div>
      <ul className="flex bg-[#8B6E48] text-[#FEE8CB] font-bold p-1 rounded-b-xl flex-col items-center">
        <li>{domain}</li>
        <li>
          <h3>Dogtag ID: {id}</h3>
        </li>
      </ul>
    </li>
  );
};

export default NFTListItem;
