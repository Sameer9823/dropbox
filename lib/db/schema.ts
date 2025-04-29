import {
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(), // "folder"

  //storage information
  fileUrl: text("file_url").notNull(), // url to the file in the storage
  thumbnailUrl: text("thumbnail_url"),

  userId: text("user_id").notNull(),

  parentId: uuid("parent_id"),

  isFolder: boolean("is_folder").notNull().default(false),

  isStarred: boolean("is_starred").notNull().default(false),

  isTrash: boolean("is_trashed").notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(), // timestamp
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // timestamp
});
