import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import AWSXRay from 'aws-xray-sdk'

export async function getS3SignedUrl(todoId) {
    return await createPresignedUrlWithClient({
        bucket: "app-todo-attachments", region: 'us-east-1', key: todoId,
    });
}

const createPresignedUrlWithClient = ({ region, bucket, key }) => {
    const client = AWSXRay.captureAWSv3Client(new S3Client({ region }));
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, command, { expiresIn: 3600 });
};