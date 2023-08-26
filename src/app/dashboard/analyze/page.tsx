import { getAllJobs } from "../companyjobs/loaders";
import { getAllPdfFiles } from "../resume/all/loaders";
import Heading from "@/components/heading";
import StateSelector from "./_components/state-selector";

const AnalyzePage = async () => {
  const jobs = await getAllJobs();
  const pdfFiles = await getAllPdfFiles();
  return (
    <section>
      <Heading
        title="Analyze Resumes"
        description="Analyze resumes to find the best candidate for your company"
      />
      <StateSelector jobs={jobs} pdfFiles={pdfFiles} />
    </section>
  );
};

export default AnalyzePage;
