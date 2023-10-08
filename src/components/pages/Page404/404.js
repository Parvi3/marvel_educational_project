import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import "./404.scss";

const Page404 = () => {
    return (
        <div className="main__wrapper">
            <ErrorMessage />
            <p className="error__page">Page doesn't exist</p>
            <Link className="back__to" to="/">Back to main page</Link>
        </div>
    )
}
export default Page404;