import { z } from "zod";

export const pdfSchema = z.object({
  id: z.string().optional(),
  fileName: z.string().nonempty(),
  fileUrl: z.string().url(),
  fileText: z.string().nonempty(),
});
