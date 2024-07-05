/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://accounts:EMxD4hpXP8jI@ep-white-dawn-a5z71to7.us-east-2.aws.neon.tech/user-data?sslmode=require',
    }
};