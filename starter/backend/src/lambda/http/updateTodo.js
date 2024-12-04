import { updateToDo } from "../../businessLogic/todos.mjs";
import { getUserId } from "../utils.mjs";

export async function handler(event) {
  const todoId = event.pathParameters.todoId;
  const updatedTodo = JSON.parse(event.body);
  const userId = getUserId(event);
  const response = await updateToDo(userId, todoId, updatedTodo);
  const statusCode = response === null ? 400 : 200;

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  // done
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}
