/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://pwdb_owner:h1oEyJiC5gsA@ep-plain-base-a5q6en8h.us-east-2.aws.neon.tech/pwdb?sslmode=require",
  },
};
