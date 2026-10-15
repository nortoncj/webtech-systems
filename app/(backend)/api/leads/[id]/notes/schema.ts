// app/(backend)/api/leads/[id]/notes/schema.ts
import { z } from "zod";

export const NoteSchema = z.object({
  body: z.string().trim().min(1).max(5000),
});
