import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const templates = sqliteTable("templates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(), 
  isCustom: integer("is_custom", { mode: 'boolean' }).default(false),
  displayText: text("display_text"), // For on-screen text
  primaryColor: text("primary_color").default("#00ffcc"), // Cyan default
  secondaryColor: text("secondary_color").default("#ff0066"), // Pink default
  scale: real("scale").default(1.0), // For zooming in/out
  createdAt: integer("created_at", { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const shapeDescriptions = sqliteTable("shape_descriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  shapeId: text("shape_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// === BASE SCHEMAS ===
export const insertTemplateSchema = createInsertSchema(templates).omit({ id: true, createdAt: true });
export const insertShapeDescriptionSchema = createInsertSchema(shapeDescriptions).omit({ id: true, updatedAt: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type ShapeDescription = typeof shapeDescriptions.$inferSelect;
export type InsertShapeDescription = z.infer<typeof insertShapeDescriptionSchema>;

export type CreateTemplateRequest = InsertTemplate;
export type TemplateResponse = Template;
export type TemplatesListResponse = Template[];
export type ShapeDescriptionResponse = ShapeDescription;
export type ShapeDescriptionsListResponse = ShapeDescription[];
