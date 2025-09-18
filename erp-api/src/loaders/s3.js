// src/loaders/s3.js
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../config/env.js";

if (!env.S3_ENDPOINT || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) {
  console.warn("[s3] Missing endpoint/credentials. Check S3_* env vars.");
}

export const s3 = new S3Client({
  region: env.S3_REGION, // 'auto' works for R2; MinIO ignores but SDK wants a value
  endpoint: env.S3_ENDPOINT, // http://127.0.0.1:9000  or  https://<account>.r2.cloudflarestorage.com
  forcePathStyle: env.S3_FORCE_PATH_STYLE, // MinIO needs true
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

export async function s3Put({ Key, Body, ContentType, Bucket = env.S3_BUCKET }) {
  const res = await s3.send(new PutObjectCommand({ Bucket, Key, Body, ContentType }));
  const etag = (res.ETag || "").replaceAll('"', "");
  return { etag };
}

export async function s3Delete(Key, Bucket = env.S3_BUCKET) {
  await s3.send(new DeleteObjectCommand({ Bucket, Key }));
}

export async function s3SignedGet(Key, expiresIn = 300, Bucket = env.S3_BUCKET) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket, Key }), { expiresIn });
}
