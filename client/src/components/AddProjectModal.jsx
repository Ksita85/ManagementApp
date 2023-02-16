import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { toast } from "react-toastify";

function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status},
        update(cache, { data: { addProject } }){
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
            query: GET_PROJECTS,  
            data:{ projects: [...projects, addProject] },
            });
        },
    });

    //Get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('Please fill in all fields');
        }

        addProject(name, description, clientId, status);
        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');

        toast.success('Project Added');
    };

    if (loading) return null;
    if (error) return 'Something went wrong';

    return (
        <>
            <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                <div className="d-flex align-items-center">
                <FaList/>
                <div className="ms-1"> New Project</div>
                </div>
            </button>

            <div className="modal modal-md fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                <div className="modal-header">
                    <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                    <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label my-3">Name:</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={ (e) => setName (e.target.value)}/>
                            <label className="form-label my-3">Description:</label>
                            <input type="text" className="form-control" id="description" value={description} onChange={ (e) => setDescription (e.target.value)}/>
                            <label className="form-label my-3">Status:</label>
                            <select className="form-control" id="status" value={status} onChange={ (e) => setStatus (e.target.value)}>
                                <option value="new">Not Started</option>
                                <option value="progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <label className="form-label my-3">Client:</label>
                            <select className="form-control" id="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                <option value=''>Select Client</option>
                                {data.clients.map((client)=>(
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
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

export default AddProjectModal;