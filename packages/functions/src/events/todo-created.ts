import { EventHandler } from "sst/node/event-bus";
import { Todo } from "@ai-document-parser/core/todo";

export const handler = EventHandler(Todo.Events.Created, async (evt) => {
  console.log("Todo created", evt);
});
