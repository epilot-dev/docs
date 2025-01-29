---
sidebar_position: 2
---

# File API

[[API Docs](/api/file)]
[[SDK](https://www.npmjs.com/package/@epilot/file-client)]


Files in epilot are uploaded and managed through the [File API](/api/file).

## Downloading Files

The [`downloadFile` operation](/api/file#tag/files/operation/downloadFile) returns a temporary presigned S3 URL, which the client uses to download a file using the `GET` method.

```
GET https://file.sls.epilot.io/v1/files/4ffdc191-f32c-404a-8520-c403b7408afa/download
```

```json
{
  "download_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/66/3fe52f11-89d8-4482-a102-b060e9c4b328/Snapshot_202205147_140500.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5AGXFWQOZC655PER%2F20240307%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240307T130430Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2..."
}
```

The `download_url` in the response is valid for 15 minutes and can be used to download the file using the `GET` method.

:::info

The `downloadFile` operation requires a valid access token to be present in the request.

:::

:::note

The `public_url` property of a file entity may also be used to download a file directly if the file is public. However the `downloadFile` operation works for both public and private files and is the recommended way to download files.

:::


## Uploading Files

The [`uploadFile` operation](/api/file#tag/files/operation/uploadFileV2) returns a temporary presigned S3 URL, which the client uses to upload a file using the `PUT` or `POST` method.

After uploading, the client should call the [`saveFileV2` operation](/api/file#tag/files/operation/saveFileV2) to save the uploaded file as an entity make it permanent.

Files that are uploaded but not saved expire and are deleted within 24 hours.

:::info

The `uploadFileV2` operation requires a valid access token to be present in the request. Use the `uploadFilePublic` operation to upload files for Submissions of public journeys.

:::

## Example Upload Flow

### Step 1: Call uploadFile to receive s3ref

```
POST https://file.sls.epilot.io/v2/files/upload
```

Body (application/json):
```json
{
  "filename": "example.pdf",
  "mime_type": "application/pdf"
}
```

Response (201):
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
```
(empty)
```

### Step 3: Call saveFileV2 to persist the file and create a File entity

```
POST https://file.sls.epilot.io/v2/files
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

Note that the `public_url` property of the File entity is still present in the response, even if the entity has `access_control` set to `private`. For `private` the public URL is simply not accessible and will return a 403 response.

You can now attach the returned file entity id to your business entity as a relation to any attribute of type `file`, or the default `_files` attribute:

```json
{
  "_schema": "opportunity",
  // ...other entity fields
  "_files": {
    "$relation": [
      { "entity_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8" }
    ]
  }
}
```

## Updating Files

Modifying or saving new versions of File entities happens via the [`saveFile` operation](/api/file#tag/files/operation/saveFile).


## Deleting Files

Deleting files is done using the [`deleteFile` operation](/api/file#tag/files/operation/saveFile). When the file entity is deleted, the underyling S3 object is deleted permanently.
