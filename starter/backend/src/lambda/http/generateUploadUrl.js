import { generateUploadUrl } from "../../businessLogic/todos.mjs";
import { getUserId } from "../utils.mjs";

export async function handler(event) {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  const clientUrl = await generateUploadUrl(userId, todoId);
  const statusCode = clientUrl === null ? 400 : 201;

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  // done
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ 'uploadUrl': clientUrl })
  }
}

