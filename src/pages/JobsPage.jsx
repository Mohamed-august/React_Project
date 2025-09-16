    import JobListings from "../components/JobListings";

    const JobsPage = ({jobs}) => {
    return (
        <section className="bg-blue-50 px-4 py-10 min-h-screen">
        <div className="container m-auto">
            <h2 className="text-3xl font-bold mb-6">All Jobs</h2>
            <JobListings jobs={jobs}/>
        </div>
        </section>
    );
    };

    export default JobsPage;
