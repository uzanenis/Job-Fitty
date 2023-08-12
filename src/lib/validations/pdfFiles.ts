import { z } from "zod";

export const pdfSchema = z.object({
  fileName: z.string().nonempty(),
  fileUrl: z.string().url(),
  fileText: z.string().nonempty(),
});
