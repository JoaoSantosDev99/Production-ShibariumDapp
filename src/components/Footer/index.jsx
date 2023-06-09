import discord from "../../assets/icons/discordia.png";
import telegram from "../../assets/icons/telegram.png";
import twitter from "../../assets/icons/twitter.png";
import medium from "../../assets/icons/medium.png";

const Footer = () => {
  return (
    <footer className="w-full flex bg-[#ffeeb5] text-[#563d1c] justify-center">
      <div className="max-w-screen-2xl mb-14 lg:mb-0 w-full py-8 flex flex-col items-center">
        <ul className="flex justify-center gap-5 mb-5 mt-3">
          <li>
            <a href="https://t.me/dogtag_id" target="_blank" rel="noreferrer">
              <img src={telegram} alt="telegram" className="w-10" />
            </a>
          </li>
          <li>
            <a title="Coming Soon!">
              <img src={discord} alt="discord" className="w-10" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/dogtag_id"
              rel="noreferrer"
              target="_blank"
            >
              <img src={twitter} alt="twitter" className="w-10" />
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/dogtag-id"
              rel="noreferrer"
              target="_blank"
            >
              <img src={medium} alt="medium" className="w-10" />
            </a>
          </li>
        </ul>
        <span className="font-medium text-center italic">
          &trade; Shibarium Name Service 2023, All Rights Reserved
        </span>
        <span className="bg-[#fecf91] border-2 text-sm mt-2 border-[#d28c42ef] text-[#895a12] font-bold px-3 py-1 rounded-lg flex items-center justify-center">
          Version 1.2
        </span>
      </div>
    </footer>
  );
};

export default Footer;
