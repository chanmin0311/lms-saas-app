import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import NavItems from "./NavItems";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image src={logo} alt="logo" width={46} height={44} />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <p>Sign In</p>
            </div>
        </nav>
    );
};

export default Navbar;
