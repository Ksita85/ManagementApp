import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { toast } from "react-toastify";

function EditProjectForm({project}) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(() => {
        switch (project.status) {
            case "Not Started":
                return "new";
            case "In Progress":
                return "progress";
            case "Completed":
                return "completed";
            default:
                throw new Error(`Unknown status: ${project.status}`);
        }
    });

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries:[{ query: GET_PROJECT, variables:{id: project.id}}],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !status) {
            return alert('Please fill out all fields');
        }

        updateProject(name, description, status);
        
        toast.success('Project Updated');
    };

    return (
        <div className="my-4">
            <hr></hr>
            <h3 className="mt-4 text-primary">Update Project Details</h3>
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
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default EditProjectForm