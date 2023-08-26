import { Job } from "@prisma/client";
import { create } from "zustand";

interface StoreState {
  job: Job | null;
  pdfFileIds: string[];
  setJob: (job: Job | null) => void;
  setPdfFileIds: (pdfFileIds: string[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  job: null,
  pdfFileIds: [],
  setJob: (job) => set({ job }),
  setPdfFileIds: (pdfFileIds) => set({ pdfFileIds }),
}));
