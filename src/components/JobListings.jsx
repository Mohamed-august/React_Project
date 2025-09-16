    import JobCard from "./JobListing";

    const JobListings = ({ jobs = [], isHome = false }) => {
    if (!jobs || jobs.length === 0) {
        return <p className="text-center text-gray-500">No jobs available.</p>;
    }

    const displayedJobs = isHome ? jobs.slice(0, 3) : jobs;

    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {displayedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
        ))}
        </div>
    );
    };

    export default JobListings;
