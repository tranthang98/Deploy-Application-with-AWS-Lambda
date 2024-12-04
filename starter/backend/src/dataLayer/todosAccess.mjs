import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import AWSXRay from 'aws-xray-sdk'

const client = new DynamoDBClient({});
const docClient = AWSXRay.captureAWSv3Client(DynamoDBDocumentClient.from(client));

export async function createToDo(newTodoItem) {
    const params = {
        TableName: 'todos',
        Item: newTodoItem
    };
    const command = new PutCommand(params);
    await docClient.send(command);
    return {
        item: newTodoItem
    };
}

export async function updateToDo(newTodoRequestBody, todoId, userId) {
    let params = {
        TableName: "todos",
        Key: {
            'todoId': todoId,
            'userId': userId,
        },
        UpdateExpression: 'SET #name = :name, #done = :done, #dueDate = :dueDate',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#done': 'done',
            '#dueDate': 'dueDate'
        },
        ExpressionAttributeValues: {
            ':name': newTodoRequestBody.name,
            ':done': newTodoRequestBody.done,
            ':dueDate': newTodoRequestBody.dueDate,
        },
        ReturnValues: 'UPDATED_NEW'
    };

    const command = new UpdateCommand(params);
    return await docClient.send(command);
}

export async function updateToDoWithAttachmentUrl(attachmentUrl, todoId, userId) {
    let params = {
        TableName: "todos",
        Key: {
            'todoId': todoId,
            'userId': userId,
        },
        UpdateExpression: 'SET #attachmentUrl = :attachmentUrl',
        ExpressionAttributeNames: {
            '#attachmentUrl': 'attachmentUrl',
        },
        ExpressionAttributeValues: {
            ':attachmentUrl': attachmentUrl,
        },
        ReturnValues: 'UPDATED_NEW'
    };

    const command = new UpdateCommand(params);
    return await docClient.send(command);
}

export async function deleteToDo(userId, todoId) {
    const params = {
        TableName: "todos",
        Key: {
            'todoId': todoId,
            'userId': userId,
        },
    };
    const command = new DeleteCommand(params);
    return await docClient.send(command);
}

export async function getTodos(userId) {
    const command = new QueryCommand({
        TableName: "todos",
        KeyConditionExpression:
            "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
        ConsistentRead: true,
    });

    return await docClient.send(command);
}