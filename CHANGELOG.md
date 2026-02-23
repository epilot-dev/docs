# API Changelog

This changelog covers breaking changes, new features, and significant updates to epilot's public APIs, including REST APIs, core entities, and core events.

## 2026-02-23 Message API

- New `POST /v2/message/threads/{id}/assign:users` endpoint was added, allowing users to be added or removed from a message thread

## 2026-02-23 Workflows Execution API

- `PhaseMarkedInProgress` and `PhaseSkipped` enum values were removed from the `trigger/event` field in entity sync responses — affects `POST /v2/flows/executions`, `GET /v2/flows/executions/{execution_id}`, `PATCH /v2/flows/executions/{execution_id}`, and `POST /v2/flows/executions:search`

## 2026-02-23 Meter Entity

- New `me_lo_id` field was added for storing the MeLo-ID (Messlokation) measurement location identifier

## 2026-02-22 Entity API

- New `table` schema attribute type was added

## 2026-02-20 ERP Integration API

- Integration create/update/get response schemas restructured — fields now composed via `allOf[IntegrationEditableFields]`; SDK consumers should regenerate types
- `settings.autoRefresh.minIntervalBetweenSyncsMinutes` was removed from integration settings

## 2026-02-20 Core Events

- New `TariffChange` event was introduced
- New `OrderSubmission` event was introduced

## 2026-02-19 ERP Integration API

- New `file_proxy` use case type was added — `FileProxyUseCase` is now a valid variant alongside `InboundUseCase`/`OutboundUseCase`
- New optional `settings` object was added to integration create/update/get endpoints

## 2026-02-19 Webhooks API

- New `filterConditions` field was added to webhook configs, allowing event delivery to be filtered by conditions

## 2026-02-18 Customer Portal API

- New `EntitySlugConfig` support was added to entity search — accepts per-slug configuration objects with `slug`, `targets`, and `templates`
- New `include` parameter was added to entity search to side-load enrichment data (supports `active_workflow`)
- New `advanced_authentication` and `timeouts` settings were added to cognito config
- New `show_in_navigation` field was added to page configuration

## 2026-02-18 Workflows Definition API

- `assigned_to` field type changed from plain string to `oneOf[string, VariableAssignment]` — unlocks dynamic variable-based assignment

## 2026-02-18 Metering API

- `POST /v2/metering/readings` request now uses a discriminated union on the `operation` field (`CreateOrUpdateBatchReading` or `DeleteBatchReading`)

## 2026-02-13 Workflows Definition API

- New `additional_triggers` field was added to flow templates, enabling multiple trigger configurations per flow

## 2026-02-12 ERP Integration API

- New `POST /v1/integrations/{integrationId}/monitoring/timeseries` endpoint was added for querying time-series event counts

## 2026-02-11 ERP Integration API

- `POST /v1/erp/updates/events` (v1) and `POST /v2/erp/updates/events` (v2) are now deprecated — migrate to `POST /v3/erp/updates/events`
- New `ignored` and `warning` status values were added to event processing and monitoring responses

## 2026-02-11 Webhooks API

- `GET /v1/webhooks/.well-known/public-key` endpoint was reactivated with a new required `orgId` query parameter

## 2026-02-10 ERP Integration API

- New `POST /v3/erp/updates/events` endpoint was added — v3 event processing using integration-based authentication
- **Breaking:** `reverse-relations` was removed from `scope_mode` enum in inbound use case entity scope

## 2026-02-10 Webhooks API

- New `signingSecret` field was added to webhook config responses (returned once at creation time)

## 2026-02-09 Email Settings API

- New `GET /v2/outlook/connection:resolve` endpoint was added to look up an Outlook connection by email address

## 2026-02-06 Entity API

- **Breaking:** `POST /v1/entity/taxonomies/{taxonomySlug}/classifications` — `deleted` response type changed from `object` to `array`

## 2026-02-06 Customer Portal API

- New `GET /v2/portal/entity/{slug}/{id}/workflows` endpoint was added

## 2026-02-06 Order Entity

- New `coupons` relation was added

## 2026-02-05 Pricing API

- New `coupons` field was added to order responses
- New `portal` origin type was added to external catalog requests
- New `PortalContext` was added as a valid context type for external catalog integration requests

## 2026-02-05 Automation API

- New `NewEmailThreadTrigger` trigger type was added to automation flows

## 2026-02-05 Query API

- New `GET /v2/query/semantic-model` endpoint was added, returning available entity tables, relationships, and query capabilities

## 2026-02-05 Contract Entity

- New `assets` relation was added

## 2026-02-05 Order Entity

- New `opportunities` and `contracts` relations were added

## 2026-02-04 Entity API

- New `exclude` query parameter was added to `GET /v1/entity/schemas` for excluding schemas by slug
- `POST /v1/entity:graph` now returns `null` for `cardinality="one"` nodes when no entity is found

## 2026-02-04 Customer Portal API

- New `PUT /v2/portal/notifications/entity:status` endpoint was added for batch-updating notification status

## 2026-02-03 Webhooks API

- New `NONE` auth type was added, allowing webhook endpoints using standard signature auth only

## 2026-02-03 Core Events

- New `OnDemandSyncContractRequested` event was introduced
- New `OnDemandSyncCustomerRequested` event was introduced
- `MeterReadingAdded` event payload restructured — single `reading_value`/`obis_number`/`direction` fields replaced by `meter_readings` array supporting multiple counters per submission

## 2026-01-30 ERP Integration API

- Monitoring endpoints split — `POST .../monitoring/events` replaced by separate `POST .../monitoring/inbound-events` and `POST .../monitoring/outbound-events` endpoints
- Monitoring stats response restructured — flat fields replaced by `inbound` and `outbound` sub-objects

## 2026-01-30 Customer Portal API

- New `GET /v2/portal/metering/reading/allowed-range/{meter_id}` endpoint was added

## 2026-01-30 Core Events

- New required `_ack_id` field was added to all event payloads for delivery acknowledgement tracking

## 2026-01-29 Partner Directory API

- New `POST /v2/partners/{orgId}/roles` and `PUT /v2/partners/{orgId}/roles/{roleId}` endpoints were added for partner role management

## 2026-01-28 ERP Integration API

- New `GET /v1/integrations/{integrationId}/outbound-status` endpoint was added
- `event_catalog_event` and `mappings` are now required fields on `OutboundUseCase` configuration

## 2026-01-27 ERP Integration API

- New `POST /v1/integrations/{integrationId}/monitoring/access-logs` endpoint was added for API access log analytics

## 2026-01-27 Workflows Definition API

- New `message_email_address` attribute type and `attribute_sub_field` were added to decision task conditions

## 2026-01-27 Event: Service Meter Reading Added

- Payload restructured — single reading fields replaced by `meter_readings` array; `reason`/`note` removed; `counter_id`, `direction`, `status`, `reading_source` added; `meter_counter` replaced by `meter_counters` array

## 2026-01-26 User API

- New `POST /v2/user/navigations` and `GET /v2/user/navigations/{id}` endpoints were added for navigation configurations

## 2026-01-23 ERP Integration API

- New `POST .../monitoring/events` and `POST .../monitoring/stats` endpoints were added for integration monitoring

## 2026-01-23 Email Settings API

- New Microsoft 365/Outlook integration endpoints were added: connect, disconnect, connection status, shared mailbox management, and OAuth callback

## 2026-01-23 Pricing API

- New `POST /v1/public/external-catalog/products` and `POST /v1/public/external-catalog/products-recommendation` public endpoints were added

## 2026-01-22 Automation API

- New `TriggerEventAction` action type was added for explicitly triggering event catalog events from automation flows

## 2026-01-22 Permissions API

- New `parent_role` field was added to user roles, allowing inheritance from a parent role

## 2026-01-22 Notification Template Entity

- New `notification_template` entity was introduced

## 2026-01-22 Core Events

- `operation`, `activity_id`, `activity_type`, and `trigger_entity` fields were removed from event payloads

## 2026-01-21 Workflows Execution API

- New `AI_AGENT` task type was added with `AiAgentTask` schema

## 2026-01-21 Core Events

- New `_trigger_source_type` and `_trigger_source` fields were added to all event payloads, identifying the system and source that triggered each event

## 2026-01-20 Notification API

- New `POST /v1/notification/templates/send-preview` endpoint was added

## 2026-01-16 Notification API

- New notification template CRUD endpoints were added: list, create, get, update, patch, and delete

## 2026-01-15 ERP Integration API

- New v2 integration endpoints were added: `GET/PUT/DELETE /v2/integrations/{integrationId}` — v2 integrations embed use cases directly in the response
- `jsonataExpression` in meter reading configuration is now optional (previously required)

## 2026-01-15 Core Events

- New `CustomerDetailsUpdated` event was introduced
- New `ServiceMeterReadingAdded` event was introduced

## 2026-01-14 Data Management API

- **Breaking:** `related_entities_any_in_closed_or_cancelled_status` filter type was removed

## 2026-01-12 Blueprint Manifest API

- New `GET /v2/blueprint-manifest/blueprints:preview/{preview_id}` endpoint was added
- **Breaking:** `POST /v2/blueprint-manifest/blueprints:pre-install` response changed from `Blueprint` to `BlueprintPreview` schema

## 2026-01-09 Customer Portal API

- New v3 portal management endpoints were added: distribution config, email templates, entity access, extensions, external links, portal config, SSO login, user management, and CAA record validation

## 2026-01-09 Core Events

- New `BillingAccountConnectionRemoved` event was introduced
- New `GeneralRequestCreated` event was introduced
- New `LocationMoveRequested` event was introduced
- New `TerminateContractRequested` event was introduced

## 2026-01-08 Pricing API

- `postal_code` is now required in availability location filter objects

## 2026-01-08 Kanban API

- New `PUT /v1/kanban/org/default-board` and `DELETE /v1/kanban/org/default-board` endpoints were added

## 2026-01-08 Metering API

- New `POST /v1/metering/readings/{meter_id}` endpoint was added for portal-authenticated meter reading submissions

## 2026-01-07 Data Management API

- New `POST /data-management/v1/configs/{config_id}/jobs` endpoint was added to manually trigger job runs
- New `GET /data-management/v1/jobs/{job_id}` endpoint was added
- New `related_entities_workflows_only_in_closed_or_cancelled_status` filter type was added

## 2025-12-31 Event Catalog API

- New Event Catalog API launched with endpoints to list events, retrieve configurations and schemas, generate sample payloads, update configuration, search event history, and trigger events

## 2025-12-30 Customer Portal API

- `GET /v2/portal/user/files` and `GET /v2/portal/user/files/count-by-entity` are now deprecated

## 2025-12-30 Blueprint Manifest API

- New `GET /v2/blueprint-manifest/blueprints:marketplace` endpoint was added for listing installed marketplace blueprints

## 2025-12-30 Metering API

- `note` field was renamed to `remark` on meter reading create and update operations

## 2025-12-26 Location Entity

- New `location` entity was introduced with address, address_hash, and entity_relations properties

## 2025-12-23 Pricing API

- New public external catalog endpoints were added for products and product recommendations
- External catalog context now supports `CustomContext` alongside `JourneyContext`

## 2025-12-22 Customer Portal API

- **Breaking:** Meter reading `note` field was renamed to `remark`
- New `detail_schema` field was added to page configuration

## 2025-12-19 Customer Portal API

- New `self_registration_setting` values were added: `ALWAYS_CREATE_CONTACT`, `BLOCK_IF_PORTAL_USER_EXISTS`, `DISALLOW_COMPLETELY`

## 2025-12-19 Data Management API

- New endpoints were added: get config by ID, list jobs with filtering, and job report download URL
- **Breaking:** `lookback_period_months` was replaced by `lookback_period_days`
- `email` entity type was replaced by `message` in `relations_for_deletion`

## 2025-12-18 Customer Portal API

- `meter_id` is now optional (deprecated) on consumption, costs, and prices endpoints
- New `context_entities` parameter was added as a replacement

## 2025-12-17 ERP Integration API

- New `POST /v1/integrations/{integrationId}/events/replay` endpoint was added
- Use case responses now include required top-level fields: `id`, `name`, `type`, `enabled`, `integrationId`, `created_at`, `updated_at`

## 2025-12-14 Data Management API

- **Breaking:** Schedule schema simplified from daily/weekly/monthly variants to a single interval-based schedule with `frequency` and `interval_days`

## 2025-12-12 Customer Portal API

- New `assignment_mode` field was added to contract identification hook configuration
- New `EntityMatchingConfig` was added to SSO identity provider configuration

## 2025-12-12 Product API

- `tax` field on `Price` changed from an untyped schema to a `BaseRelation` reference
- `$relation` fields on coupon, price, product, and tax resources are now required

## 2025-12-11 Workflows Execution API

- New `DELETE /v2/flows/executions/{execution_id}/tasks/{task_id}/schedule` endpoint was added to cancel scheduled tasks

## 2025-12-11 Tax Entity

- `rate` property type changed from `string` to `number`

## 2025-12-10 File API

- Multiple deprecated folder and collection endpoints were removed

## 2025-12-10 Email Template API

- New `json_template` field was added to template create, update, and response schemas

## 2025-12-10 Core Events

- New `PaymentMethodUpdated` event was introduced
- New `BillingAddressUpdated` event was introduced

## 2025-12-09 ERP Integration API

- New `POST /v1/integrations/{integrationId}/events` endpoint was added for querying integration events

## 2025-12-09 Core Events

- New `InstallmentUpdated` event was introduced
- New `MeterReadingAdded` event was introduced

## 2025-12-08 Data Management API

- New `GET /data-management/v1/configs` and `POST /data-management/v1/{entity_schema}/configs` endpoints were added

## 2025-12-08 IBAN API

- **Breaking:** IBAN validation endpoint moved from `POST /v1/iban:validate` to `POST /v1/public/iban:validate`

## 2025-12-05 ERP Integration API

- New `POST /v2/erp/updates/mapping_simulation` endpoint was added for v2 mapping format simulation
- New `_append_all` operation and `relation_refs` field were added to use case field configuration

## 2025-12-02 ERP Integration API

- **Breaking:** Use case create/update request body changed to a discriminated union (`CreateInboundUseCaseRequest | CreateOutboundUseCaseRequest`)
- New `GET .../use-cases/{useCaseId}/history` endpoint was added for use case configuration history

## 2025-12-02 Webhooks API

- New `POST /v1/webhooks/configs/{configId}/events/replay-batch` endpoint was added for batch event replay
- `GET /v1/webhooks/configs/{configId}/events` was deprecated

## 2025-12-01 ERP Integration API

- New `POST /v2/erp/updates/events` endpoint was added — v2 event processing using `integration_id`
- New `PUT/DELETE /v1/integrations/{integrationId}/app-mapping` endpoints were added
- `UseCase` schema split into `InboundUseCase` and `OutboundUseCase` discriminated variants

## 2025-11-30 Data Management API

- New `POST /data-management/v1/{entity_schema}/query` endpoint was added

## 2025-11-28 Template Variables API

- New `POST /v2/template:replace` endpoint was added, preserving original data types instead of stringifying

## 2025-11-27 Workflows Execution API

- New `ON_HOLD` status value was added to step and task status enum
- `update_entity_attributes` was replaced by `entity_sync` with a richer schema including typed trigger events

## 2025-11-26 Customer Portal API

- New `POST /v3/portal/partner/{id}/disable` and `POST /v3/portal/partner/{id}/enable` endpoints were added
- `USER_ACCOUNT_SELF_MANAGEMENT` was removed from `self_registration_setting` enum and replaced by a dedicated boolean

## 2025-11-26 Partner Directory API

- New partner user management endpoints were added: list users, create user, delete user, list roles, assign/unassign roles

## 2025-11-26 GenAI API

- New `POST /v1/genai/erp/mapping:generate` endpoint was added for AI-generated ERP mapping configurations

## 2025-11-25 File API

- New File Collections API was introduced with CRUD endpoints, replacing the deprecated File Folders API
- New slug-based collection endpoints were added alongside entity-based endpoints

## 2025-11-25 Pricing API

- New `POST /v1/public/integration/{integrationId}/products-recommendation` endpoint was added

## 2025-11-25 Pricing API External Catalog

- **Breaking:** `catalog_type` field is now required in the request context
- Response body changed from a plain array to a discriminated union based on `catalog_type`

## 2025-11-24 Entity API

- New `POST /v1/entity:graph` endpoint was added for traversing entity relationship graphs with configurable node schemas, edges, and cardinality

## 2025-11-23 Customer Portal API

- **Breaking:** `app_id`, `hook_id`, and `extension_id` fields are now required in extension hook configuration (previously optional)

## 2025-11-20 Portal User Entity

- New `represents` relation was added

## 2025-11-20 Contact Entity

- `represents_contact` relation was removed

## 2025-11-19 Pricing API

- `days` was added as a billing duration unit across all duration fields (billing, notice, renewal, termination)

## 2025-11-19 Ticket Entity

- `title` was renamed to `ticket_title`
- `number` was renamed to `ticket_number`

## 2025-11-19 Notes API

- `created_by` field changed from a plain string/number ID to a structured object with `type`, `user_id`, `display_name`, and other fields

## 2025-11-18 Workflows Execution API

- New `revert_execution` option was added to task patch — resets succeeding tasks to PENDING when updating a previous task

## 2025-11-17 Pricing API

- New `reference_date` parameter was added to compute-price requests
- `tax` field type changed from a free-form object to a `Tax` schema reference

## 2025-11-17 Webhooks API

- Three deprecated v1 failure endpoints were removed

## 2025-11-17 Journey Config API

- New `logicsV4` field was added, supporting a more expressive logic rule format with per-rule IDs, conditions, actions, and settings

## 2025-11-14 ERP Integration API

- New Integration management CRUD endpoints were added: `GET/POST/PUT/DELETE /v1/integrations`
- New Use Case management CRUD endpoints were added: `GET/POST/PUT/DELETE /v1/integrations/{id}/use-cases`

## 2025-11-12 Asset Entity

- New `asset` entity was introduced with properties including title, serial number, manufacturer, model, maintenance dates, and relations to customer, contract, meter, and ticket

## 2025-11-10 ERP Integration API

- `payload` field in event processing and mapping simulation now accepts a JSON object directly (previously only serialised strings)

## 2025-11-10 Customer Portal API

- New partner management endpoints were added: invite, list, resend invitation, and revoke

## 2025-11-07 Customer Portal API

- New `POST /v2/portal/entity:get` endpoint was added for retrieving a single entity by ID

## 2025-11-06 Customer Portal API

- **Breaking:** Enum constraints on the `schema` field in page configuration were removed — now accepts any string slug

## 2025-11-06 Core Entities

- New `external_id` property was added to Contact, Contract, Billing Account, Meter, and Meter Counter entities

## 2025-11-06 Billing Account Entity

- `billing_address` field type changed from a relation reference to an inline address object
- `payment_method` items restructured to include a typed `type` enum and structured `data` object

## 2025-11-04 Email Settings API

- New `GET /v2/email-settings/inbox-buckets` endpoint was added

## 2025-11-03 Webhooks API

- New `POST /v2/webhooks/configs/{configId}/events` endpoint was added for listing and filtering webhook events

## 2025-10-31 Message API

- New `POST /v1/message/threads/{id}:move` endpoint was added for moving threads between inboxes

## 2025-10-30 ERP Integration API

- v2 mapping format support was added to mapping simulation with `events` mapping object
- Relation `operation` field restricted to enum values `_set` and `_append`

## 2025-10-29 Automation API

- New `entity_exists` and `entity_does_not_exist` condition operations were added

## 2025-10-22 ERP Integration API

- New `POST /v1/erp/updates/mapping_simulation` endpoint was added for dry-running payload transformations

## 2025-10-22 GenAI API

- New `GET /v1/genai/entity/{slug}/{entity_id}/summary` endpoint was added for retrieving AI-generated entity summaries

## 2025-10-17 ERP Integration API

- New `deduplication_id` field was added to event payloads for idempotency control
- New `skipped` status was added for deduplicated events

## 2025-10-15 Customer Portal API

- New `GET /v2/portal/billing/accounts/{id}` endpoint was added

## 2025-10-14 Customer Portal API

- **Breaking:** `contracts` and `filters_schema` were removed from entity search request; replaced by `filters_context`

## 2025-10-13 Blueprint Manifest API

- All v1 blueprint manifest endpoints were deprecated in favor of v2

## 2025-10-09 Workflows Definition API

- New `JourneyAutomationTrigger` was added for journey-based automation triggers on flow templates

## 2025-10-08 Customer Portal API

- **Breaking:** `END_CUSTOMER_PORTAL` and `INSTALLER_PORTAL` enum values were removed from the `origin` parameter — now accepts any string
- New `POST /v3/portal/config/swap` endpoint was added

## 2025-10-08 Email Settings API

- New email address management endpoints were added: list, create, get, update, delete, provision, and set primary
