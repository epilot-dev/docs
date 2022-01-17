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

## Updating Files

Modifying or saving new versions of File entities happens via the `saveFile` operation.

## Deleting Files

Deleting files is done using the `deleteFile` operation. When the file entity is deleted, the underyling S3 object is deleted permanently.
