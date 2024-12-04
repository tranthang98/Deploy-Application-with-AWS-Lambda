import { getTodos } from "../../businessLogic/todos.mjs";
import { getUserId } from "../utils.mjs";

export async function handler(event) {
  // TODO: Get all TODO items for a current user
  // done
  const userId = getUserId(event);
  const response = await getTodos(userId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(response.Items)
  }
}
