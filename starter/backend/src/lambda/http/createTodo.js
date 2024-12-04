import { createToDo } from "../../businessLogic/todos.mjs";
import { getUserId } from "../utils.mjs";

export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  const userId = getUserId(event)
  const response = await createToDo(userId, newTodo);

  if (response === null) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    }
  }

  // TODO: Implement creating a new TODO item
  // done
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(response)
  }
}

