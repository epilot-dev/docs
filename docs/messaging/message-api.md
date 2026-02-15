---
sidebar_position: 2
---

# Message API

[[API Docs](/api/message)]
[[SDK](https://www.npmjs.com/package/@epilot/message-client)]

The Message API is the central email service for epilot. It handles sending, receiving, and managing email messages within the platform.

All messages in epilot are stored as message entities and organized into threads. Each message entity contains the email content, metadata (sender, recipients, subject), and relations to file entities for attachments.

## Key Operations

| Operation | Description |
|-----------|-------------|
| `sendMessage` | Send an email message from an epilot email address |
| `getMessage` | Retrieve a single message by ID |
| `searchMessages` | Search messages |
| `markReadMessage` | Mark a message as read |
| `trashMessage` | Move a message to trash |
| `searchThreads` | Search message threads |
| `assignThread` | Assign a thread to a user |
| `createDraft` | Create a draft message |
| `sendDraft` | Send a draft message |

See the full [API reference](/api/message) for request and response schemas.
