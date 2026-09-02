import { pgTable, serial, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

// 1. Contacts submissions table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  program: varchar("program", { length: 100 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("unread"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 2. Free Consultation requests table
export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  programInterest: varchar("program_interest", { length: 100 }).notNull(),
  educationLevel: varchar("education_level", { length: 100 }),
  germanLevel: varchar("german_level", { length: 50 }),
  preferredDate: varchar("preferred_date", { length: 50 }),
  notes: text("notes"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 3. Program Applications (Ausbildung, Au Pair, FSJ, Kursus)
export const programApplications = pgTable("program_applications", {
  id: serial("id").primaryKey(),
  programType: varchar("program_type", { length: 100 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 50 }).notNull(),
  city: varchar("city", { length: 100 }),
  age: integer("age"),
  lastEducation: varchar("last_education", { length: 100 }),
  germanProficiency: varchar("german_proficiency", { length: 50 }),
  motivation: text("motivation"),
  status: varchar("status", { length: 50 }).default("submitted"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 4. Newsletter Subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 5. Blog and Articles table
export const blogArticles = pgTable("blog_articles", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  tag: varchar("tag", { length: 100 }).notNull(),
  excerpt: text("excerpt").notNull(),
  date: varchar("date", { length: 100 }).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  content: jsonb("content").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// 6. CMS Dynamic Website Content Storage (Navbar, Footer, Hero, Kursus, Ausbildung, Team, Legalitas, dll)
export const cmsContent = pgTable("cms_content", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(), // e.g. 'main_cms_config'
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// 7. CMS Audit Logs (tracks updates made via Admin Dashboard)
export const cmsAuditLogs = pgTable("cms_audit_logs", {
  id: serial("id").primaryKey(),
  module: varchar("module", { length: 100 }).notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
