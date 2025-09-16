    import { useLoaderData, useNavigate } from "react-router-dom";
    import { toast } from "react-toastify";

    const JobPage = ({ deleteJob }) => {
    const job = useLoaderData();
    const navigate = useNavigate();

    if (!job) {
        return (
        <div className="text-center py-12 text-gray-500 text-xl">
            Job not found.
        </div>
        );
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this job?")) {
        try {
            await deleteJob(job.id); // ✅ handled in App.jsx (toast + state update)
            navigate("/jobs", { replace: true }); // ✅ go back to jobs list
        } catch (error) {
            console.error("Error deleting job:", error);
            toast.error("❌ Failed to delete job. Please try again.");
        }
        }
    };

    return (
        <section className="bg-indigo-50">
        <div className="container m-auto py-10">
            <div className="bg-white shadow-md rounded-md p-6">
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Type:</span> {job.type}
            </p>
            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Salary:</span> {job.salary}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-semibold">Location:</span> {job.location}
            </p>

            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="mb-4">{job.description}</p>

            <h2 className="text-xl font-semibold mb-2">Company</h2>
            <p className="mb-1 font-semibold">{job.company.name}</p>
            <p className="mb-1">{job.company.description}</p>
            <p className="mb-1 text-sm text-gray-600">
                📧 {job.company.contactEmail}
            </p>
            {job.company.contactPhone && (
                <p className="mb-4 text-sm text-gray-600">
                📞 {job.company.contactPhone}
                </p>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
                <button
                onClick={() => navigate(`/edit-job/${job.id}`)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full"
                >
                Edit
                </button>
                <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                >
                Delete
                </button>
                <button
                onClick={() => navigate("/jobs")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                >
                Back to Jobs
                </button>
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default JobPage;
