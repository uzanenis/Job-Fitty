import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  experience: z.string().min(2).max(100),
  position: z.string().max(50),
  technologies: z.array(z.string()).min(1),
  workType: z.string().min(1),
  salaryMin: z.number().int().optional(),
  salaryMax: z.number().int().optional(),
  educationLevel: z.string().optional(),
  languageRequirement: z.string().optional(),
  additionalInfo: z.string().optional(),
});
