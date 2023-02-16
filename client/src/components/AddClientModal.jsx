import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { toast } from "react-toastify";

function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }){
            const { clients } = cache.readQuery({ query: GET_CLIENTS });

            cache.writeQuery({
            query: GET_CLIENTS,  
            data:{ clients: [...clients, addClient] },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields');
        }

        addClient(name, email, phone);
        setName('');
        setEmail('');
        setPhone('');

        toast.success('Client Added');
    };

    return (
        <>
        <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#addClientModal">
            <div className="d-flex align-items-center">
                <FaUser/>
                <div className="ms-1"> Add Client</div>
            </div>
        </button>

        <div className="modal modal-md fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content bg-dark">
            <div className="modal-header">
                <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
                <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label my-3">Name:</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={ (e) => setName (e.target.value)}/>
                        <label className="form-label my-3">Email:</label>
                        <input type="text" className="form-control" id="email" value={email} onChange={ (e) => setEmail (e.target.value)}/>
                        <label className="form-label my-3">Phone:</label>
                        <input type="text" className="form-control" id="phone" value={phone} onChange={ (e) => setPhone (e.target.value)}/>
                        
                    </div>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}

export default AddClientModal;