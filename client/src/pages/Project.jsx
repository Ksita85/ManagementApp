import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import ClientInfo from '../components/ClientInfo';

function Project() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {variables: { id }
    });
    
    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong.</p>

    return (
        <>
            <div className='mx-auto w-75 card bg-dark px-5 py-4 my-3 rounded '>
                <Link to='/' className='mb-4 btn btn-primary btn-sm w-25 ms-auto'>Back</Link>
                <h1 className='text-primary mb-4'>{(data.project.name.toUpperCase())}</h1>
                <p>{data.project.description}</p>
    
                <h5 className='mt-3 text-primary'>Project Status:</h5>
                <p className=''>{data.project.status}</p>

                <ClientInfo client={data.project.client} />

                <EditProjectForm project={data.project} />

                <DeleteProjectButton projectId={data.project.id}/>
            </div>
        </>
    )
}

export default Project