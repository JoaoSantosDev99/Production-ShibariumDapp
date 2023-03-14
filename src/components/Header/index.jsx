import { useWeb3Modal } from "@web3modal/react";
import { NavLink } from "react-router-dom";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { addressShortener } from "../../utils";

import home from "../../assets/icons/home.png";
import user from "../../assets/icons/user.png";
import swap from "../../assets/icons/swap.png";
import Logo from "../../assets/Logo.png";
import ConnectButton from "../UI/ConnectButton";

const Header = () => {
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const { address, isConnected } = useAccount();

  const connectWallet = () => {
    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }
    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="w-full flex justify-center pt-1 px-1">
      <div className="max-w-screen-2xl w-full p-2 rounded-xl bg-[#A48253]">
        {/* Desktop header */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <h1 className="text-4xl">
              <img src={Logo} alt="logo" className="w-52" />
            </h1>

            <ul className="hidden md:flex items-center gap-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-5 text-[#482307] font-bold bg-[#ffeca7] border-2 border-[#ffeca7] shadow-md text-xl rounded-xl"
                      : "py-2 px-5 text-[#482307] font-bold bg-[#fff3c6] border-2 border-[#fff3c6] shadow-md text-xl rounded-xl"
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/swap"
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-5 text-[#482307] font-bold bg-[#ffeca7] border-2 border-[#ffeca7] shadow-md text-xl rounded-xl"
                      : "py-2 px-5 text-[#482307] font-bold bg-[#fff3c6] border-2 border-[#fff3c6] shadow-md text-xl rounded-xl"
                  }
                >
                  Swap
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-5 text-[#482307] font-bold bg-[#ffeca7] border-2 border-[#ffeca7] shadow-md text-xl rounded-xl"
                      : "py-2 px-5 text-[#482307] font-bold bg-[#fff3c6] border-2 border-[#fff3c6] shadow-md text-xl rounded-xl"
                  }
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>

          {isConnected ? (
            <ConnectButton title={addressShortener(address)} />
          ) : (
            <div>
              <div className="hidden md:flex">
                <ConnectButton title="Connect Wallet" onClick={connectWallet} />
              </div>
              <div className="md:hidden">
                <ConnectButton title="Connect" onClick={connectWallet} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Header */}
        <nav className="flex items-center border border-t-[#d0b28a] py-3 shadow-2xl fixed md:hidden bg-[#FFF4CE] text-white z-10 bottom-0 right-0 left-0 justify-center gap-2 w-full">
          <ul className="flex justify-evenly w-full">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#FFECA7] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl"
                    : "flex justify-center items-center p-2 rounded"
                }
              >
                <img src={home} alt="home" className="w-8" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/swap"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#FFECA7] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl"
                    : "flex justify-center items-center p-2 rounded"
                }
              >
                <img src={swap} alt="swap" className="w-8 rotate-[90deg]" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#FFECA7] border-2 border-[#c8a475] flex justify-center items-center p-2 rounded-xl"
                    : "flex justify-center items-center p-2 rounded"
                }
              >
                <img src={user} alt="user" className="w-8" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
