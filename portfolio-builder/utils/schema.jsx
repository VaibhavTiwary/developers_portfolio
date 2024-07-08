// const { varchar } = require("drizzle-orm/mysql-core");
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userInfo = pgTable('userInfo', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username'),
    bio: text('bio'),
    location: varchar('location'),
    link: varchar('link')
});