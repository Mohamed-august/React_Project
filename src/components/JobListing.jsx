    import { Link } from "react-router-dom";
    import { FaMapMarker } from "react-icons/fa";
    import { useState } from "react";
    const JobListing = ({ job }) => {
        const [showFullDesc, setShowFullDesc] = useState(false);
        const isLong = job.company?.description?.length > 100;
        const companyDesc = job.company?.description || "";
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-gray-500 mb-2">{job.type}</div>

        <h2 className="text-xl font-bold mb-2">{job.title}</h2>

        <div className="text-gray-500 flex items-center mb-4">
            <FaMapMarker className="text-orange-700 mr-2" />
            <span className="text-orange-700">{job.location}</span>
        </div>

                {/* ✅ Job Description with toggle */}
            <p className="text-gray-700 mb-2">
                {job.description.length > 100 && !showFullDesc
                ? job.description.substring(0, 100) + "..."
                : job.description}
            </p>

            {/* ✅ Company Description with toggle */}
            {companyDesc && (
                <p className="text-gray-500 text-sm mb-4">
                <strong>Company:</strong>{" "}
                {isLong && !showFullDesc
                    ? companyDesc.substring(0, 100) + "..."
                    : companyDesc}
                </p>
            )}

            {isLong && (
                <button
                onClick={() => setShowFullDesc((prev) => !prev)}
                className="text-indigo-500 font-semibold hover:underline mb-4"
                >
                {showFullDesc ? "View Less" : "View More"}
                </button>
            )}

                <Link
                    to={`/jobs/${job.id}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full block text-center"
                >
                    View Details
                </Link>
                </div>
            );
            };

            export default JobListing;

            
