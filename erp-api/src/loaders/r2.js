// // src/loaders/r2.js
// import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { env } from "../config/env.js";

// if (!env.R2_ACCOUNT_ID || !env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY || !env.R2_BUCKET) {
//   console.warn("[r2] Missing env vars. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET");
// }

// export const r2 = new S3Client({
//   region: "auto",
//   endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//   credentials: {
//     accessKeyId: env.R2_ACCESS_KEY_ID,
//     secretAccessKey: env.R2_SECRET_ACCESS_KEY,
//   },
// });

// export async function r2Put({ Key, Body, ContentType }) {
//   const res = await r2.send(new PutObjectCommand({
//     Bucket: env.R2_BUCKET,
//     Key,
//     Body,
//     ContentType,
//   }));
//   // ETag sometimes returned quoted
//   const etag = (res.ETag || "").replaceAll('"', "");
//   return { etag };
// }

// export async function r2Delete(Key) {
//   await r2.send(new DeleteObjectCommand({ Bucket: env.R2_BUCKET, Key }));
// }

// export async function r2SignedGet(Key, expiresIn = 300) {
//   return getSignedUrl(
//     r2,
//     new GetObjectCommand({ Bucket: env.R2_BUCKET, Key }),
//     { expiresIn }
//   );
// }


// this is for the development 
