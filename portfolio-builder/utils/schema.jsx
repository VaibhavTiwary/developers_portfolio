// const { varchar } = require("drizzle-orm/mysql-core");
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userInfo = pgTable('userInfo', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username'),
    bio: text('bio'),
    location: varchar('location'),
    link: varchar('link'),
    profileImage: varchar('profileImage')
});

export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    name: varchar('name'),
    desc: text('description'),
    url: text('url').notNull(),
    logo: varchar('logo'),
    banner: varchar('banner'),
    category: varchar('category'),
    emailRef: varchar('emailRef'),
    userRef: integer('userRef').references(() => userInfo?.id)
})