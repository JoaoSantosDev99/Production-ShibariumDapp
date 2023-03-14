const DomainOption = ({ domain, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#fde48c] text-center px-2 rounded-lg"
    >
      {domain}
    </li>
  );
};

export default DomainOption;
