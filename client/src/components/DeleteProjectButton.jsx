import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";

function DeleteProjectButton({projectId}) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => 
            navigate('/'),
            refetchQueries: [{ query: GET_PROJECTS }],
    });
    

    return (
        <div className="d-flex mt-2">
            <button className="btn btn-danger btn-sm my-2" onClick={deleteProject}>
                <FaTrash/> Delete Project
            </button>
        </div>
    )
}

export default DeleteProjectButton