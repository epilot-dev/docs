---
sidebar_position: 2
---

# File API

[[API Docs](/api/file)]
[[SDK](https://www.npmjs.com/package/@epilot/file-client)]


Files in epilot are uploaded and managed through the [File API](/api/file).

## Uploading Files

The `uploadFile` operation returns a temporary presigned S3 URL, which the client uses to upload a file using the `PUT` or `POST` method.

After uploading, the client should call the `saveFile` operation to save the uploaded file as an entity make it permanent.

Files that are uploaded but not saved expire and are deleted within 24 hours.

## Example Flow

### Step 1: Call uploadFile to receive s3ref:

```
POST https://file.sls.epilot.io/v1/files/upload
```

Body (application/json):
```json
{
  "filename": "example.pdf",
  "mime_type": "application/pdf"
}
```

Response (200):
```json
{
  "s3ref": {
    "bucket": "epilot-prod-user-content",
    "key": "123/temp/f5e1c2be-7392-4a0d-8c45-236743423733/example.pdf"
  },
  "upload_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/f5e1c2be-7392-4a0d-8c45-236743423733/example.pdf?X-Amz-...",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/f5e1c2be-7392-4a0d-8c45-236743423733/example.pdf"
}
```

### Step 2: Upload your file using a PUT request

Use the returned `upload_url` to upload your file to S3.

> Hint: Make sure your Content-Type request header is set correctly!

```
PUT https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/f5e1c2be-7392-4a0d-8c45-236743423733/example.pdf?X-Amz-...
```

Body (application/pdf):
```
(binary data)
```

Response (201):
### Step 3: Call saveFile  to persist the file and receive an entity id

```
POST https://file.sls.epilot.io/v1/files/upload
```

Body (application/json):
```json
{
  "s3ref": {
    "bucket": "epilot-prod-user-content",
    "key": "123/temp/f5e1c2be-7392-4a0d-8c45-236743423733/example.pdf"
  },
  "filename": "example.pdf",
  "access_control": "private"
}
```

Response (201):
```json
{
  "_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
  "filename": "example.pdf",
  "access_control": "private",
  "public_url": "...",
  "type": "document",
  "mime_type": "application/pdf",
  "size_bytes": 0,
  "versions": [
    ...
  ]
}
```

You can now attach the returned file entity to any business entity as a relation.

Note that the `public_url` ptroperty of the File entity is still present in the response, even if the entity has `access_control` set to `private`. For `private` the public URL is simply not accessible and will return a 403 response.


## Updating Files

Modifying or saving new versions of File entities happens via the `saveFile` operation.

## Deleting Files

Deleting files is done using the `deleteFile` operation. When the file entity is deleted, the underyling S3 object is deleted permanently.
