import { z } from "zod";
import { jobSchema } from "./jobs";

export const analyzeSchema = z.object({
  job: jobSchema,
  pdfFile: z.string(),
});
