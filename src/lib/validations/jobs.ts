import { z } from "zod";

export const jobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  experience: z.string().min(2).max(100),
  position: z.string().max(50),
  technologies: z.array(z.string()).min(1),
  workType: z.string().min(1),
  salaryMin: z.number().int().nullable(),
  salaryMax: z.number().int().nullable(),
  educationLevel: z.string().nullable(),
  languageRequirement: z.string().nullable(),
  additionalInfo: z.string().nullable(),
});
