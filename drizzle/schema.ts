import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  userType: mysqlEnum("userType", ["donor", "receiver", "admin"]).default("donor").notNull(),
  organizationName: varchar("organizationName", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Re-export for backward compatibility
export type UserType = "donor" | "receiver" | "admin";

/**
 * Food items table - alimentos disponíveis para doação
 */
export const foods = mysqlTable("foods", {
  id: int("id").autoincrement().primaryKey(),
  donorId: int("donorId").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // vegetables, fruits, bakery, dairy, etc
  quantity: varchar("quantity", { length: 100 }).notNull(), // e.g., "10 kg", "50 units"
  expiryDate: timestamp("expiryDate"),
  location: varchar("location", { length: 255 }).notNull(),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  imageUrl: text("imageUrl"),
  status: mysqlEnum("status", ["available", "reserved", "donated", "expired"]).default("available").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Food = typeof foods.$inferSelect;
export type InsertFood = typeof foods.$inferInsert;

/**
 * Reservations table - reservas de alimentos
 */
export const reservations = mysqlTable("reservations", {
  id: int("id").autoincrement().primaryKey(),
  foodId: int("foodId").notNull().references(() => foods.id),
  receiverId: int("receiverId").notNull().references(() => users.id),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  reservedAt: timestamp("reservedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = typeof reservations.$inferInsert;

/**
 * User credits/gamification table
 */
export const userCredits = mysqlTable("userCredits", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  credits: int("credits").default(0).notNull(),
  foodsDonated: int("foodsDonated").default(0).notNull(),
  foodsReceived: int("foodsReceived").default(0).notNull(),
  impactScore: int("impactScore").default(0).notNull(), // calculated based on donations
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserCredit = typeof userCredits.$inferSelect;
export type InsertUserCredit = typeof userCredits.$inferInsert;

