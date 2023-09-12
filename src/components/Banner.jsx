import Button from "./elements/Button";
import { Link } from "react-router-dom";

export const Banner = () => {
    return (
        <div className="banner w-full relative flex items-center-justify-between p-32 border-b-2 bg-background bg-no-repeat bg-center">
            <div className="banner-description w-full md:w-1/2 p-3 mx-auto text-center drop-shadow-lg">
                <h2 className="text-6xl font-bold text-white">
                    Resto Tracker
                </h2>
                <h3 className="mb-6 text-2xl text-white">
                    We make Ordering effortless!
                </h3>
                    <div className="btn-container">
                        <Link to="/orders">
                            <Button>Orders</Button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}