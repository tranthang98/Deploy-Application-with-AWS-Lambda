import { deleteToDo } from "../../businessLogic/todos.mjs";
import { getUserId } from "../utils.mjs";

export async function handler(event) {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);

  const result = await deleteToDo(userId, todoId);
  const statusCode = result === null ? 400 : 204;

  // TODO: Remove a TODO item by id
  // done
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}

