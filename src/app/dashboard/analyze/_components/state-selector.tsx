"use client";

import { Job, PdfFile } from "@prisma/client";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useStore } from "@/store";
import { Button } from "@/components/ui/button";
import { createJobCandidateScore } from "./actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StateSelectorProps {
  jobs: Job[];
  pdfFiles: PdfFile[];
}

const StateSelector = ({ jobs, pdfFiles }: StateSelectorProps) => {
  const setStoreSelectedJob = useStore((state) => state.setJob);
  //const setStoreSelectedPdfFiles = useStore((state) => state.setPdfFileIds);

  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState<Job>();
  const [selectedPdfFiles, setSelectedPdfFiles] = useState<PdfFile>();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const hasOpenAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY ? true : false;

  const filteredJobs = jobs.filter((job) => {
    return job.title
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""));
  });

  const filteredPdfFiles = pdfFiles.filter((pdfFile) => {
    return pdfFile.fileName
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""));
  });

  const handleStartAnalyze = async () => {
    setLoading(true);
    if (selectedJob && selectedPdfFiles) {
      setStoreSelectedJob(selectedJob);
      const selectedPdfFilesId = selectedPdfFiles.id;
      //setStoreSelectedPdfFiles(selectedPdfFilesIds);
      console.log(selectedPdfFilesId);
      const responseData = await createJobCandidateScore({
        job: selectedJob,
        pdfFile: selectedPdfFilesId,
      });
      console.table("reponseData", responseData);
      //TODO: redirect to analyze page
      if (responseData.status === 200) {
        router.push(`/dashboard/scores`);
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="h-full w-full">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="w-full h-full">
          <h2>Select Company Job and Candidate Resumes</h2>
          <Combobox value={selectedJob} onChange={setSelectedJob}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-white text-black focus:ring-0"
                  displayValue={(job: Job) => job.title}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronsUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="mt-1 h-full w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredJobs.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredJobs.map((job) => (
                      <Combobox.Option
                        key={job.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-blue-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={job}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {job.title}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-blue-600"
                                }`}
                              >
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        <div className="w-full h-full">
          <h3>Select the resumes you want to analyze</h3>
          <Combobox
            value={selectedPdfFiles}
            onChange={(v) => setSelectedPdfFiles(v)}
          >
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-white text-black  focus:ring-0"
                  displayValue={(pdfFile: PdfFile) => pdfFile.fileName}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronsUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="mt-1 h-full w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredPdfFiles.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredPdfFiles.map((pdfFile) => (
                      <Combobox.Option
                        key={pdfFile.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-blue-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={pdfFile}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {pdfFile.fileName}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-blue-600"
                                }`}
                              >
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          {selectedPdfFiles && (
            <span className="block mt-1 text-sm text-gray-700">
              File selected
            </span>
          )}
        </div>
      </div>
      <Button
        onClick={handleStartAnalyze}
        disabled={!selectedJob || !selectedPdfFiles || !hasOpenAiKey}
        className="w-fit text-accent mt-2"
      >
        {loading ? (
          <>
            Loading <Loader2 className="mx-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          "Start Analyze"
        )}
      </Button>
      {!hasOpenAiKey && (
        <p className="text-red-500 text-sm mt-2">
          You need to set NEXT_PUBLIC_OPENAI_API_KEY in .env to start analyze.{" "}
          <br />
          <Link href="mailto:uzanenis@outlook.com" className="underline">
            Or you can contact me
          </Link>
        </p>
      )}
    </div>
  );
};

export default StateSelector;
