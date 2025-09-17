import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "../src/layouts/MainLayout";
import HomePage from "../src/pages/HomePage";
import JobsPage from "../src/pages/JobsPage";
import JobPage from "../src/pages/JobPage";
import NotFoundPage from "../src/pages/NotFoundPage";
import AddJobPage from "../src/pages/AddJobPage";
import EditJobPage from "../src/pages/EditJobPage";
import { jobLoader } from "../src/loaders/jobLoader";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/jobs.json");
        const data = await res.json();
        const baseJobs = data.jobs || [];

        const storedJobs = localStorage.getItem("jobs");
        const localJobs = storedJobs ? JSON.parse(storedJobs) : [];

        const mergedJobs = [...baseJobs];
        localJobs.forEach((job) => {
          if (!mergedJobs.some((j) => j.id === job.id)) {
            mergedJobs.push(job);
          }
        });

        setJobs(mergedJobs);

        if (mergedJobs.length > 0) {
          const ids = mergedJobs.map((job) => parseInt(job.id) || 0);
          setNextId(Math.max(...ids) + 1);
        }

        localStorage.setItem("jobs", JSON.stringify(mergedJobs));
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setNextId(1);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = async (newJob) => {
    const jobWithId = { ...newJob, id: nextId.toString() };
    setJobs((prev) => {
      const updated = [...prev, jobWithId];
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
    setNextId((prevId) => prevId + 1);

    toast.success("✅ Job added successfully!");
    return jobWithId;
  };

  const updateJob = async (updatedJob) => {
    setJobs((prev) => {
      const updated = prev.map((job) =>
        String(job.id) === String(updatedJob.id) ? updatedJob : job
      );
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });

    toast.success("✏️ Job updated successfully!");
    return updatedJob;
  };

  const deleteJob = async (id) => {
  setJobs((prev) => {
    const updated = prev.filter((job) => String(job.id) !== String(id));
    localStorage.setItem("jobs", JSON.stringify(updated));
    return updated;
  });

  toast.success("🗑️ Job deleted successfully!");
};


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage jobs={jobs} />} />
        <Route path="jobs" element={<JobsPage jobs={jobs} />} />
        <Route
          path="jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="add-job"
          element={<AddJobPage addJobSubmit={addJob} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
