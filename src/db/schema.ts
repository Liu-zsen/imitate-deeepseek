import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// 官方文档给出的user表
// export const usersTable = pgTable("users", {
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     name: varchar({ length: 255 }).notNull(),
//     age: integer().notNull(),
//     email: varchar({ length: 255 }).notNull().unique(),
// });

// 消息表
export const chatsTable = pgTable("chats", {
    id: serial("id").primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    model: text("model").notNull(),
})

// 对话表
export const messagesTable = pgTable("messages", {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id").references(() => chatsTable.id),
    // role 标识了系统的消息还是用户的消息
    role: text("role").notNull(),
    content: text("content").notNull()
})

export type ChatModel = typeof chatsTable.$inferSelect
export type MessagesModel = typeof messagesTable.$inferSelect