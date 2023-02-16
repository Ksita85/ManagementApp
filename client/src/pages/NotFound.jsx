import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <FaExclamationTriangle className="mt-4 text-danger" size='6em' />
            <h1 className="">Error 404</h1>
            <p className="mt-3">Sorry, this page does not exist.</p>
            <Link to='/' className="btn btn-primary mt-3">Go back</Link>
        </div>
    )
}

export default NotFound