import {
    createToDo as dbCreateToDo, deleteToDo as dbDeleteToDo,
    getTodos as dbGetTodos,
    updateToDo as dbUpdateToDo,
    updateToDoWithAttachmentUrl as dbUpdateToDoWithAttachmentUrl
} from "../dataLayer/todosAccess.mjs"
import { getS3SignedUrl } from "../fileStorage/attachmentUtils.mjs";
import { v4 as uuidv4 } from 'uuid';

// Create TODO item
export async function createToDo(userId, newTodoRequestBody) {
    const newTodoItem = await dbCreateToDo({
        todoId: uuidv4(),
        userId,
        ...newTodoRequestBody
    });
    console.log('newTodoItem ' + JSON.stringify(newTodoItem));
    return newTodoItem;
}

// Get list TODO items
export async function getTodos(userId) {
    const response = await dbGetTodos(userId);
    console.log('response ' + JSON.stringify(response));
    return await dbGetTodos(userId);
}

// Update TODO item
export async function updateToDo(userId, todoId, newTodoRequestBody) {
    const response = await dbUpdateToDo(newTodoRequestBody, todoId, userId);
    console.log('response ' + JSON.stringify(response));
    return response;
}

// Delete TODO item
export async function deleteToDo(userId, todoId) {
    const response = await dbDeleteToDo(userId, todoId);
    console.log('response ' + JSON.stringify(response));
    return response;
}

// Generate upload url
export async function generateUploadUrl(userId, todoId) {
    const clientUrl = await getS3SignedUrl(todoId);
    console.log('clientUrl ' + clientUrl);
    if (clientUrl !== undefined && clientUrl !== '') {
        await dbUpdateToDoWithAttachmentUrl(clientUrl.split('?')[0], todoId, userId);
    }
    return clientUrl;
}