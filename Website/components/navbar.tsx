import Image from "next/image";
import LogoImage from "../assets/logo_horizontal.png";
import SearchIcon from "../assets/holy.svg";
//Home Page, including search bar
export default function Navbar({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex flex-row justify-between z-10 items-center px-14 py-5 absolute w-full bg-gradient-to-b from-black from-1% via-black via-5% to-90% ">
      <div className="flex flex-row items-center">
        <Image src={LogoImage} width="110" />
        <ul className="flex flex-grow space-x-6 mx-10 text-sm">
          <li>
            <a
              href="/"
              className={`${
                activeTab === "/"
                  ? "cursor-default pointer-events-none"
                  : "text-gray-300"
              }  font-medium`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/recommended"
              className={`${
                activeTab === "/recommended"
                  ? "cursor-default pointer-events-none"
                  : "text-gray-300"
              }  font-medium`}
            >
              Recommended
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={`${
                activeTab === "/about"
                  ? "cursor-default pointer-events-none"
                  : "text-gray-300"
              }  font-medium`}
            >
              About
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <a href="/search">
            <li className="flex cursor-pointer flex-grow space-x-2 text-sm">
              <div>Search</div>
              <Image src={SearchIcon} width="20" />
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}
