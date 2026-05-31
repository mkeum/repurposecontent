import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "trialing",
  "unpaid",
  "paused",
]);
export const contentStatusEnum = pgEnum("content_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: userRoleEnum("role").default("user"),
  stripeCustomerId: text("stripeCustomerId").unique(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const subscriptions = pgTable("subscription", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeSubscriptionId: text("stripeSubscriptionId").notNull().unique(),
  stripePriceId: text("stripePriceId").notNull(),
  stripeCustomerId: text("stripeCustomerId").notNull(),
  status: subscriptionStatusEnum("status").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd", { mode: "date" }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const contentPieces = pgTable("content_piece", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  originalContent: text("originalContent").notNull(),
  contentType: text("contentType").notNull(), // e.g., 'blog', 'transcript'
  status: contentStatusEnum("status").default("pending"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const repurposedItems = pgTable("repurposed_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentPieceId: uuid("contentPieceId")
    .notNull()
    .references(() => contentPieces.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // e.g., 'linkedin_post', 'twitter_thread', 'email_newsletter'
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const usageLogs = pgTable("usage_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  action: text("action").notNull(),
  amount: integer("amount").notNull().default(1),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const auditLogs = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  details: text("details"),
  ipAddress: text("ipAddress"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const supportTickets = pgTable("support_ticket", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default("open"), // open, closed, etc.
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});
