import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

function ClientInfo({client}) {
    return (
        <>
            <h5 className="my-3 text-primary">Client Information:</h5>
            <ul className="card-body border-start border-primary border-4 m-2">
                <li className="list-group-item fst-italic">
                    <FaIdBadge className="text-primary me-2" /> {client.name}
                </li>
                <li className="list-group-item fst-italic mt-2">
                    <FaEnvelope className="text-primary me-2" /> {client.email}
                </li>
                <li className="list-group-item fst-italic mt-2">
                    <FaPhone className="text-primary me-2" /> {client.phone}
                </li>
            </ul>
        </>
    )
}

export default ClientInfo