    import { useState, useEffect } from "react";
    import { useLoaderData, useNavigate } from "react-router-dom";
    import { toast } from "react-toastify";

    const EditJobPage = ({ updateJobSubmit }) => {
    const navigate = useNavigate();
    const job = useLoaderData();

    const [title, setTitle] = useState(job?.title || "");
    const [type, setType] = useState(job?.type || "Full-Time");
    const [location, setLocation] = useState(job?.location || "");
    const [salary, setSalary] = useState(job?.salary || "60k$-70K$");
    const [description, setDescription] = useState(job?.description || "");

    const [companyName, setCompanyName] = useState(job?.company?.name || "");
    const [companyDescription, setCompanyDescription] = useState(job?.company?.description || "");
    const [companyEmail, setCompanyEmail] = useState(job?.company?.contactEmail || "");
    const [companyPhone, setCompanyPhone] = useState(job?.company?.contactPhone || "");

    useEffect(() => {
        if (job) {
        setTitle(job.title);
        setType(job.type);
        setLocation(job.location);
        setSalary(job.salary);
        setDescription(job.description);
        setCompanyName(job.company?.name || "");
        setCompanyDescription(job.company?.description || "");
        setCompanyEmail(job.company?.contactEmail || "");
        setCompanyPhone(job.company?.contactPhone || "");
        }
    }, [job]);

    const submitForm = async (e) => {
        e.preventDefault();

        if (!title || !location || !salary || !companyName || !companyEmail) {
        return alert("Please fill all required fields");
        }

        const updatedJob = {
        id: job.id,
        title,
        type,
        location,
        salary,
        description,
        company: {
            name: companyName,
            description: companyDescription,
            contactEmail: companyEmail,
            contactPhone: companyPhone,
        },
        };

        try {
        await updateJobSubmit(updatedJob); 
        navigate("/jobs", { replace: true }); 
        } catch (error) {
        console.error("Error updating job:", error);
        toast.error("❌ Failed to update job. Please try again.");
        }
    };

    return (
        <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
                <h2 className="text-3xl text-center font-semibold mb-6">Edit Job</h2>

                {/* Job Type */}
                <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                    Job Type
                </label>
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                </select>
                </div>

                {/* Job Title */}
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Job Listing Name
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="border rounded w-full py-2 px-3 mb-2"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>

                {/* Job Description */}
                <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                </div>

                {/* Salary */}
                <div className="mb-4">
                <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">
                    Salary
                </label>
                <select
                    id="salary"
                    name="salary"
                    className="border rounded w-full py-2 px-3"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                >
                    <option value="Under $50K">Under $50K</option>
                    <option value="$50K - 60K">$50K - $60K</option>
                    <option value="$60K - 70K">$60K - $70K</option>
                    <option value="$70K - 80K">$70K - $80K</option>
                    <option value="$80K - 90K">$80K - $90K</option>
                    <option value="$90K - 100K">$90K - $100K</option>
                    <option value="$100K - 125K">$100K - $125K</option>
                    <option value="$125K - 150K">$125K - $150K</option>
                    <option value="$150K - 175K">$150K - $175K</option>
                    <option value="$175K - 200K">$175K - $200K</option>
                    <option value="Over $200K">Over $200K</option>
                </select>
                </div>

                {/* Location */}
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    className="border rounded w-full py-2 px-3 mb-2"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                </div>

                {/* Company Info */}
                <h3 className="text-2xl mb-5">Company Info</h3>

                <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                    Company Name
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    className="border rounded w-full py-2 px-3"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                </div>

                <div className="mb-4">
                <label htmlFor="company_description" className="block text-gray-700 font-bold mb-2">
                    Company Description
                </label>
                <textarea
                    id="company_description"
                    name="company_description"
                    className="border rounded w-full py-2 px-3"
                    rows="4"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                ></textarea>
                </div>

                <div className="mb-4">
                <label htmlFor="contact_email" className="block text-gray-700 font-bold mb-2">
                    Contact Email
                </label>
                <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    className="border rounded w-full py-2 px-3"
                    required
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                />
                </div>

                <div className="mb-4">
                <label htmlFor="contact_phone" className="block text-gray-700 font-bold mb-2">
                    Contact Phone
                </label>
                <input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    className="border rounded w-full py-2 px-3"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                />
                </div>

                {/* Submit Button */}
                <div>
                <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Update Job
                </button>
                </div>
            </form>
            </div>
        </div>
        </section>
    );
    };

    export default EditJobPage;

    