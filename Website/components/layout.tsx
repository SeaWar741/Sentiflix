import Navbar from "./navbar";
import { usePathname } from "next/navigation";
// import Footer from "./footer";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar activeTab={pathname} />
      <main className="h-full">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
