"use client";

import { Job } from "@prisma/client";
const ListJobs = async ({
  jobs,
  pageCount,
}: {
  jobs: Job[];
  pageCount: number;
}) => {
  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>Experience: {job.experience}</p>
          <p>Position: {job.position}</p>
          <p>Technologies: {job.technologies.join(", ")}</p>
          <p>Work Type: {job.workType}</p>
          <div>Created At: {new Date(job.createdAt).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
};

export default ListJobs;
