    // loaders/jobLoader.js
    export const jobLoader = async ({ params }) => {
    const { id } = params;

    // Load jobs from localStorage
    let storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];

    // If localStorage empty, fallback to jobs.json
    if (storedJobs.length === 0) {
        try {
        const res = await fetch("/jobs.json");
        const data = await res.json();
        storedJobs = data.jobs || [];
        } catch (err) {
        console.error("Failed to load jobs.json:", err);
        }
    }

    const job = storedJobs.find((j) => String(j.id) === String(id));

    return job;
    };
