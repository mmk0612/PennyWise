import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./Schema";
const sql = neon(
  "postgresql://pwdb_owner:h1oEyJiC5gsA@ep-plain-base-a5q6en8h.us-east-2.aws.neon.tech/pwdb?sslmode=require"
);
export const db = drizzle(sql, { schema });
