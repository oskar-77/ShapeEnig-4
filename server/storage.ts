import { db } from "./db";
import {
  templates,
  shapeDescriptions,
  type InsertTemplate,
  type Template,
  type ShapeDescription,
  type InsertShapeDescription,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getTemplates(): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template>;
  deleteTemplate(id: number): Promise<void>;
  getShapeDescriptions(): Promise<ShapeDescription[]>;
  getShapeDescription(shapeId: string): Promise<ShapeDescription | undefined>;
  upsertShapeDescription(desc: InsertShapeDescription): Promise<ShapeDescription>;
}

export class DatabaseStorage implements IStorage {
  async getTemplates(): Promise<Template[]> {
    return db.select().from(templates).all();
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const result = db
      .insert(templates)
      .values(insertTemplate)
      .returning()
      .get();
    if (!result) throw new Error("Failed to create template");
    return result;
  }

  async updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template> {
    const updated = db
      .update(templates)
      .set(updates)
      .where(eq(templates.id, id))
      .returning()
      .get();
    if (!updated) throw new Error("Template not found");
    return updated;
  }

  async deleteTemplate(id: number): Promise<void> {
    db.delete(templates).where(eq(templates.id, id)).run();
  }

  async getShapeDescriptions(): Promise<ShapeDescription[]> {
    return db.select().from(shapeDescriptions).all();
  }

  async getShapeDescription(shapeId: string): Promise<ShapeDescription | undefined> {
    return db.select().from(shapeDescriptions).where(eq(shapeDescriptions.shapeId, shapeId)).get();
  }

  async upsertShapeDescription(desc: InsertShapeDescription): Promise<ShapeDescription> {
    const existing = await this.getShapeDescription(desc.shapeId);
    if (existing) {
      const updated = db
        .update(shapeDescriptions)
        .set({ title: desc.title, description: desc.description, updatedAt: new Date() })
        .where(eq(shapeDescriptions.shapeId, desc.shapeId))
        .returning()
        .get();
      if (!updated) throw new Error("Failed to update shape description");
      return updated;
    } else {
      const inserted = db
        .insert(shapeDescriptions)
        .values(desc)
        .returning()
        .get();
      if (!inserted) throw new Error("Failed to insert shape description");
      return inserted;
    }
  }
}

export const storage = new DatabaseStorage();
