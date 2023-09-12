import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import Button from "./elements/Button";

export const Header = () => {
    return (
        <nav id="header" className="bg-white text-black sticky top-0">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 border-b rounded">
                <div className="logo-wrapper pl-10 flex items-center w-19">
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-24 h-24 object-cover" />
                    </Link>
                </div>
                <div className="flex items-center justify-center space-x-4 mx-10">
                    <Link to="/tables"><Button>Tables</Button></Link>
                    <Link to="/products"><Button>Products</Button></Link>
                    <Link to="/login"><Button>Sign in</Button></Link>
                    <Link to="/dashboard"><Button>Dashboard</Button></Link>
                </div>
            </div>
        </nav>
    )
}