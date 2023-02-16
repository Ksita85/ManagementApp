function ProjectCard({ project }) {
    return (
        <div className="col-md-6">
            <div className="card bg-dark mb-3 rounded">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{(project.name).toUpperCase()}</h5>
                        <a className="btn btn-sm btn-outline-primary" href={`/projects/${project.id}`}>View</a>
                    </div>
                    <p>
                        <span class={project.status=='In Progress' || project.status=='Completed'? 'badge bg-warning text-dark': 'badge bg-info text-dark'}>{project.status}</span>
                    </p>
                </div>
            </div>
    </div>
    )
}

export default ProjectCard