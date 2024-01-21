import { z } from "zod";
import { jobSchema } from "./jobs";

export const analyzeSchema = z.object({
  job: jobSchema,
  pdfFiles: z.array(z.string()),
});
