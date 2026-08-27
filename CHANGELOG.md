# API Changelog

This changelog covers breaking changes, new features, and significant updates to epilot's public APIs, including REST APIs, core entities, and core events.

## 2026-08-27 Event: Customer Request Submitted

- The event now also carries the meter of a ticket and its counters — new optional `meter` and `meter_counters` nodes, so consumers can resolve counter identifiers such as `external_id` from the event itself; both are absent for customer requests created from a journey

## 2026-08-26 App API

- App event search (`POST /v1/app-configurations/{appId}/events`) now accepts an optional `filters.search` term for searching events and an optional `pagination.before` cursor for paging backwards; both are echoed back in the `query` of the response
- Apps can now be configured through options: a new optional `options` list accepted on `PATCH /v1/app-configurations/{appId}/versions/{version}` and returned wherever apps and app configurations are read, where every returned option reports whether it is `configured`, `lifted`, `sensitive`, and when its value was last changed (`value_updated_at`); components declare through a new optional `uses_options` flag that they read those options, and accept `options.sensitive` on `POST`/`PATCH /v1/app-configurations/{appId}/versions/{version}/components`
- New `POST /v1/app/{appId}/options/resolve` endpoint added for resolving the configured option values of an app
- The `secrets` field of app functions is deprecated and will be removed in a future version

## 2026-08-26 Calendar API

- Calendar event responses no longer contain `_tags`, `busy`, `is_recurring`, `source.etag`, and `source.provider_event_url` — affecting `GET /v1/calendar/events`, `POST /v1/calendar/events`, and `GET`/`PATCH /v1/calendar/events/{event_id}` (breaking)

## 2026-08-26 Configuration Hub API

- New endpoints added for the health of an organization's configuration: `GET /v1/configs/health` for reading the current health, `POST /v1/configs/health:scan` for starting a new scan, `POST /v1/configs/health:cleanup` for cleaning up what a scan reported, and `POST /v1/configs/health:coverage-request` for requesting coverage of a configuration that is not checked yet

## 2026-08-26 Customer Portal API

- Portals can now report whether the engagement center is switched on through a new optional `engagement_center_enabled` setting — accepted on `POST /v2/portal/portal` and returned wherever the portal configuration is read (`GET /v2/portal/config`, `GET /v2/portal/configs`, `GET /v2/portal/public/config`, and the org and public portal config endpoints in v2 and v3)

## 2026-08-26 Entity API

- Widget sizing moved to new fields: entity schemas accept a new optional `ui_config.widget_widths` and capability UI hooks a new optional `default_width`, while `ui_config.grid_layout` is deprecated and will be removed in a future version — affecting `PUT /v1/entity/schemas/{slug}`, `POST`/`PUT /v1/entity/schemas/capabilities/{composite_id}`, and everywhere schemas and capabilities are read
- `POST /v1/entity:graph` now accepts an optional `filter` per graph node, for narrowing which entities that node matches

## 2026-08-26 Integration Toolkit API

- New `GET /v1/entities/{entityId}/sync-status` endpoint added for reading how an entity is synced with the connected external system — each reported sync state carries an optional `last_operation` and `last_synced_at`, plus optional `readings_last_event_id`, `readings_last_operation`, and `readings_last_synced_at` for meter readings
- New `POST /v1/erp/updates/direct_simulation` endpoint added for simulating a direct update payload
- Use cases can now be configured for direct updates through a new optional `configuration.direct` field, and `configuration.entities[].fields` is no longer required — accepted when creating or updating a use case or an integration, returned wherever use cases are read, and also accepted by `POST /v1/erp/updates/mapping_simulation` and `POST /v2/erp/updates/mapping_simulation`
- `POST /v3/erp/updates/events` now accepts an optional `correlation_id` per event

## 2026-08-26 Journey Config API

- New optional `settings.authGate` field added to journey configurations, controlling the authentication a journey requires — accepted when creating and updating a journey configuration in v1 and v2, and returned wherever the journey configuration is read
- The values of `validationRules` may now also be arrays where only single values were returned before, so consumers reading a journey configuration must be prepared for both shapes

## 2026-08-26 Notification API

- `POST /v1/notification/notifications` now accepts an optional `template_id` for creating a notification from a notification template, and an optional `skip_user_resolution` for delivering to the given recipients without resolving them to users first

## 2026-08-26 Workflows Execution API

- `agent_execution` and `agent_execution_id` on a workflow task may now be `null` where an object and a string were previously returned — affecting all flow execution and task responses (breaking)
- New optional `loop_iterations` field added to workflow tasks, reporting how often a looping task ran; tasks and phases additionally report an optional `analytics.skipped_at` when they were skipped, and executions an optional `analytics.started_by_org_id`

## 2026-08-25 Blueprint API

- New `POST /v2/blueprint-manifest/jobs/{job_id}:retry` endpoint added for retrying a blueprint job that did not finish
- Job progress now reports why an individual resource failed through new optional `error_code` and `error_data` fields on `resource_progress` — returned by `GET /v2/blueprint-manifest/jobs`, `GET /v2/blueprint-manifest/jobs/{job_id}`, the job cancel and continue endpoints, and the bulk-install target endpoints in v3

## 2026-08-25 Customer Portal API

- Templates can now be passed by reference instead of inline: a new optional `templates_ref` request field is accepted by `POST /v2/portal/contract/{id}/resolve-templates`, `POST /v2/portal/entity:get`, `POST /v2/portal/entity:search` (also per slug as `slug.templates_ref`), and `POST /v2/portal/metering/readings`, while the inline `templates`, `counter_templates`, `slug.templates`, and `group_title` request fields are deprecated and will be removed in a future version

## 2026-08-25 Design Builder API

- `PUT /v1/designs/addConsumer/{application}/{designId}` and `PUT /v1/designs/removeConsumer/{application}/{designId}` no longer accept the `should_delete` request field (breaking)

## 2026-08-25 Validation Rules API

- Rule conditions can now be limited to certain situations through a new optional `applies_when` field, accepted on `POST /v1/validation-rules` and `PATCH /v1/validation-rules/{ruleId}` and returned wherever rules are read
- Value adjustments of a condition (`adjust` on the value itself and on its `min` and `max`) now also accept a context value instead of only a fixed number, and gained a new optional `rounding` setting — so consumers must be prepared for `adjust.value` no longer always being a number
- Rule conditions gained two new operators, `maxDigits` and `maxDecimals`, for limiting how many digits and decimal places a value may have — accepted on `POST /v1/validation-rules` and `PATCH /v1/validation-rules/{ruleId}` and returned wherever rules are read

## 2026-08-24 Message API

- Message and thread searches can now be narrowed to a view or to user groups through new optional `view` and `user_groups` fields on `POST /v1/message/messages:search`, `POST /v1/message/threads:searchIds`, `POST /v2/message/threads:search`, and `POST /v1/message/unread:counts` (which takes the view per scope as `scopes.view_id`); the search term `q` is no longer required on the message and thread search endpoints

## 2026-08-21 Integration Toolkit API

- Use case configuration no longer supports `constants`, `lookups`, `params_mapping`, `required_params`, `file_source`, `fan_out.split_expression`, `upload.external_id`, and `upload.success_when` — these fields are no longer accepted when creating or updating a use case or an integration, and are no longer returned by the use case, integration, and use case history endpoints (breaking)
- Request steps of a use case gained two new optional fields: `body_jsonata` for building the request body with a JSONata expression, and `enabled` for switching a single step off; file uploads additionally accept an optional `upload.max_total_bytes` limit
- `POST /v2/erp/imports` now accepts an optional `import_id` to continue working on an existing import, answers with `200` in that case, and can answer with `404` or `409` when the referenced import cannot be used

## 2026-08-21 Message API

- New `POST /v1/message/unread:counts` endpoint added for retrieving the number of unread messages

## 2026-08-21 Workflows Definition API

- Journey tasks can now pass parameters into the journey they open through a new optional `context_parameters` field — available on the regular, ECP, and installer journey configuration of a task, accepted on `POST`/`PUT /v1/workflows/definitions` and `POST`/`PUT /v2/flows/templates`, and returned wherever workflow definitions, flow templates, and running workflow executions and tasks are read; `PATCH /v2/flows/executions/{execution_id}/tasks/{task_id}` also accepts it for the ECP and installer journey of a running task

## 2026-08-20 Access Token API

- Access tokens now report when they expire through a new optional `expires_at` field, returned by `GET /v1/access-tokens`, `POST /v1/access-tokens`, and `DELETE /v1/access-tokens/{id}`
- The maximum `expires_in` accepted by `POST /v1/access-tokens` was raised from 7 days (`604800` seconds) to 1 year (`31536000` seconds)

## 2026-08-20 Billing API

- Configuration history entries are now one of several typed rows distinguished by `change_type` — an installment amount change or a contract pricing change — instead of a single flat shape; the fields that were previously always present (`changed_at`, `created_at`, `entity_id`, `entity_type`, `event_id`, `new_value`, `org_id`, `schema_version`, `source`) and the optional `context`, `effective_at`, `previous_value`, `source_label`, `source_reference`, and `source_system` fields are no longer part of the common row, so consumers must read them from the specific row type — affecting `GET /v1/billing/billing_accounts/{id}/configuration_history`, `GET /v1/billing/contracts/{id}/configuration_history`, and the pricing information endpoints (breaking)
- Contract pricing changes are now tracked in the configuration history: `change_type` accepts and returns the new `contract_pricing_changed` value, and a new optional `history_change_types` query parameter lets several change types be requested at once on all four configuration history and pricing information endpoints
- Pricing information (`GET /v1/billing/contracts/{id}/pricing_information` and `GET /v1/billing/billing_accounts/{id}/pricing_information`) now returns the full `base_prices` and `working_prices` lists of a contract, reports a `tariff_type` for each base and working price, and accepts a new optional `include_history` query parameter for returning the configuration history along with it

## 2026-08-20 Calendar API

- Calendars now always report an `is_epilot_default` flag indicating whether a calendar is the organization's default calendar — returned by `GET /v1/calendar`, `POST /v1/calendar`, `POST /v1/calendar/sources/outlook`, and `GET`/`PATCH /v1/calendar/{calendar_id}`
- `calendar_id` is no longer required when creating an event through `POST /v1/calendar/events` — the event is placed in the default calendar when it is omitted
- `DELETE /v1/calendar/{calendar_id}` can now answer with `409` when the calendar cannot be deleted

## 2026-08-20 Event Catalog API

- `POST /v1/events/{event_name}:trigger` can now answer with `409`, `425`, and `503` when an event cannot be triggered
- New optional `automation_trigger_only` and `automation_trigger_seed_node` fields added to catalog events, marking events that are only triggered from an automation and naming the node that seeds them — returned by `GET /v1/events`, `GET /v1/events/{event_name}`, and `PATCH /v1/events/{event_name}`

## 2026-08-20 Journey Config API

- New optional `stepperType` field added to journey steps, controlling how a step is presented in the journey stepper — accepted when creating and updating a journey configuration in v1 and v2, and returned wherever the journey configuration is read

## 2026-08-20 Event: Customer Request Submitted

- The event is now triggered from an automation instead of an entity operation — the `operation`, `activity_id`, `activity_type`, and `trigger_entity` fields were removed, and `_event_source` and `_trigger_source_type` are now always `automation` (breaking)
- `ticket`, `event_attachments`, `_trigger_source_type`, and `_trigger_source` are now always present; `event_attachments` is always sent but may be empty when the request carries no files, and `_trigger_source` identifies the automation execution and action that triggered the request

## 2026-08-19 App API

- Apps can now declare `functions` — a new optional list accepted on `PATCH /v1/app-configurations/{appId}/versions/{version}` and returned wherever apps and app configurations are read, together with a new `function` custom action type that lets a component reference one of those functions; `APP_FUNCTION` is accepted as a `componentType` filter on `GET /v1/app` and as an event `source` on `POST /v1/app-events` and `POST /v1/app-configurations/{appId}/events`
- The `sandbox` custom action type was removed — `configuration.type` no longer accepts `sandbox` on `POST`/`PATCH /v1/app-configurations/{appId}/versions/{version}/components` and it is no longer returned on the app, app-configuration, and public component read endpoints (breaking)
- App components can now authenticate with basic auth — `configuration.auth_type` accepts and returns the new `basic` value, so consumers must be prepared for this additional value
- New optional `query` request parameter added to the app proxy endpoints (`GET`/`POST`/`PUT`/`PATCH`/`DELETE /v1/public/app/{appId}/proxy/{proxyName}/{path}`) for passing a query string on to the proxied request

## 2026-08-19 Calendar API

- New optional `metadata` field added to calendar events for storing custom data alongside an event — accepted on `POST /v1/calendar/events` and returned by `GET /v1/calendar/events`, `GET /v1/calendar/events/{event_id}`, and the create and patch endpoints

## 2026-08-19 Integration Toolkit API

- New endpoints added for managing the documentation of an integration: `GET /v1/integrations/{integrationId}/documentation` for listing documents, and `GET`/`PUT`/`DELETE /v1/integrations/{integrationId}/documentation/{docId}` for reading, storing, and removing a single document
- New `DELETE /v2/erp/imports/{importId}` endpoint added for deleting an import

## 2026-08-19 Meter Counter Entity

- The megawatt units of the `meter_counter` unit attribute were corrected from `mw` and `mWh` to `MW` and `MWh` — the old lowercase values are no longer accepted (breaking)

## 2026-08-18 Configuration Hub API

- New `POST /v1/configs/sync-jobs/{id}/cancel` endpoint added for cancelling a running configuration sync job

## 2026-08-18 Customer Portal API

- `POST /v3/portal/partner/invite` no longer accepts the `represents_contact_list` request field (breaking)

## 2026-08-18 Workflows Execution API

- New optional `match_normalizations` field added to workflow task conditions, reporting the normalizations applied when a condition value is matched — returned by all flow execution and task endpoints

## 2026-08-18 Meter Counter Entity

- New `digits` and `decimals` attributes added to the `meter_counter` entity, describing the register size of a meter counter

## 2026-08-17 Dashboard API

- New optional `version` field added to dashboards, reporting which dashboard format a dashboard uses — accepted on `POST /v1/dashboard/dashboards` and `PUT /v1/dashboard/dashboards/{id}`, and returned by the dashboard list, read, create, update, patch, and delete endpoints

## 2026-08-15 Entity API

- Schema capabilities can now be configured further: a new optional `variant_overridable` flag controls whether a capability may be overridden per variant, and capability UI hooks accept new optional `default_visible` and `pricing_tier_setting` settings — accepted on `POST /v1/entity/schemas/capabilities`, `PUT /v1/entity/schemas/capabilities/{composite_id}`, and `PUT /v1/entity/schemas/{slug}`, and returned wherever schemas and capabilities are read
- New optional `ui_config.widget_visibility` setting added to entity schemas for controlling which widgets are shown — accepted on `PUT /v1/entity/schemas/{slug}` and returned by the schema read, list, versions, freeze, and unfreeze endpoints

## 2026-08-14 AI Agents API

- New `GET /v1/executions/{execution_id}/feedback` endpoint added for reading the feedback recorded for an agent execution, and `PUT /v1/executions/{execution_id}/feedback` for submitting it

## 2026-08-14 Blueprint API

- New optional `active_restore_job_id` and `active_restore_started_at` fields added to blueprints, reporting a restore that is currently running — accepted on `POST /v2/blueprint-manifest/blueprints` and `PUT /v2/blueprint-manifest/blueprints/{blueprint_id}`, and returned by the blueprint list, read, create, update, and delete endpoints
- Restore results can now report that a resource was kept because another resource depends on it: a new `dependency_protected` value for `reason` together with a new optional `protected_by` field, returned by `GET /v2/blueprint-manifest/jobs`, `GET /v2/blueprint-manifest/jobs/{job_id}`, `POST /v2/blueprint-manifest/jobs/{job_id}:cancel`, and `GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/restore-preview`

## 2026-08-14 Design Builder API

- `DELETE /v1/designs/{designId}` can now answer with `409` when the design cannot be deleted

## 2026-08-14 File API

- New `GET /v1/files/{id}/summary/feedback` endpoint added for reading the feedback given on a file summary, and `PUT /v1/files/{id}/summary/feedback` for submitting it; `GET /v1/files/{id}/summary` now reports an optional `feedback_available` flag
- New optional `file_summary_execution_id` field added to file responses, identifying the summary generation run of a file — returned by `POST /v1/files`, `POST /v2/files`, `GET`/`DELETE /v2/files/{id}`, and `GET /v1/entity/{id}/collections/{collectionSlug}/files`

## 2026-08-14 Integration Toolkit API

- `POST /v2/erp/imports` no longer accepts `integration_id` and `use_case_slug` — the import determines its use case itself (breaking)
- New `POST /v2/erp/imports/{importId}:validate` endpoint added for validating an import before executing it, and `POST /v2/erp/imports/{importId}:suggest-use-cases` for suggesting matching use cases — the suggestion response reports `file_columns` once for the whole import rather than per suggestion, and every suggestion carries the `entity_types` it would create
- `POST /v2/erp/imports/{importId}:execute` now accepts an optional request body and answers with `202` instead of `200`, or with `422` when the import cannot be executed; `POST /v2/erp/imports` answers with `201` instead of `202` and accepts a new optional `include_preview` field for returning a preview of the import along with it (breaking)
- Import error reporting changed: `error.type` was replaced by a required `error.code`, `integration_id` is no longer guaranteed, and a new optional `validation.issues` list reports individual validation problems — each issue names the affected `columns` as objects with a required `name` and an optional `entity`, may point at a specific `row`, and no longer always carries a `message` — affecting `GET /v2/erp/imports`, `GET /v2/erp/imports/{importId}`, and the validate, execute, and abort endpoints (breaking)
- Use case configuration gained a set of new optional fields — `direction`, `constants`, `lookups`, `fan_out`, `file_source`, `upload`, `params_mapping`, `required_params`, `ack_tracking`, and `event_filter` — `response` is no longer required, request steps now also allow the `PUT` and `PATCH` methods, and a new `file_proxy` delivery type was added for forwarding files to an external system; use cases additionally report an optional `changed_by`, and `GET /v1/integrations/{integrationId}/outbound-status` reports an optional `file_proxy` status
- Mapping simulation (`POST /v1/erp/updates/mapping_simulation` and `POST /v2/erp/updates/mapping_simulation`) now always reports a `mode` for each entity update and meter reading update, and adds optional `pricing`, `prune_scope_updates`, and `meter_readings_prune_scope_updates` details

## 2026-08-14 Query API

- New `POST /v2/query/autocomplete:search` endpoint added for autocompleting values while composing a query
- New `GET /v2/query/chart-templates` endpoint added for listing the available chart templates, and `POST /v2/query/chart-templates/{template_id}:resolve` for resolving a template into a runnable query

## 2026-08-13 Automation API

- New `AssignEntityAction` automation action added for assigning an entity from a flow — it can be configured on `POST /v1/automation/flows` and `PUT /v1/automation/flows/{flow_id}`, and is returned wherever actions are read (the flow read, list, search, and batch-get endpoints, the execution endpoints, and `POST /v1/automation/public/executions:resume`)

## 2026-08-12 Blueprint API

- Blueprints now support a new `insight` resource type — it is accepted in `type` and `hard_dependencies` when creating or updating blueprint resources (`POST`/`PUT /v2/blueprint-manifest/blueprints`, the resource create, update, and bulk endpoints, and `POST /v1/blueprint-manifest/jobs:createExport`) and is returned wherever resource and job types are reported, so consumers must be prepared for this additional value

## 2026-08-12 Calendar API

- Calendar events now always return an `is_draft` flag indicating whether the event is still a draft — added to `GET /v1/calendar/events`, `POST /v1/calendar/events`, and `GET`/`PATCH /v1/calendar/events/{event_id}`
- An event can now be cancelled through the new optional `is_cancelled` field on `PATCH /v1/calendar/events/{event_id}`

## 2026-08-12 Deduplication API

- `POST /v1/deduplicate` now returns an object with a `deduplicatedEntities` list instead of a bare array (breaking)
- New `POST /v1/detect-duplicates` endpoint added for finding duplicates of an entity, and `POST /v1/duplicates/dismiss` for dismissing a reported duplicate
- New endpoints added for managing the uniqueness criteria that decide when two entities count as duplicates: `GET`/`POST /v1/uniqueness-criteria` for listing and creating them, and `GET`/`PUT`/`DELETE /v1/uniqueness-criteria/{schema}` for reading, replacing, and removing the criteria of a single schema

## 2026-08-12 Email Settings API

- `smtp_port` is now a string instead of an integer in all SMTP connection responses (`GET`/`POST /v2/smtp/connections` and `GET`/`PUT /v2/smtp/connections/{connectionId}`); requests accept both a string and an integer (breaking)
- New optional `skip_test` query parameter added to `POST /v2/smtp/connections` and `PUT /v2/smtp/connections/{connectionId}` for saving a connection without testing it first

## 2026-08-12 Journey Config API

- Journeys read from the API now always carry an explicit `settings.isActive` flag, indicating whether the journey is accessible to end customers — returned by `GET /v1/journey/configuration/{id}` and `GET /v2/journey/configuration/{id}`; the flag stays optional in request bodies

## 2026-08-11 Automation API

- New optional `workflow_context._automation_chain` field added to automation executions, recording the chain of automations an execution was started from — accepted on `POST /v1/automation/executions` and returned by the execution list, read, search, delete, and `POST /v1/automation/public/executions:resume` endpoints

## 2026-08-11 Design Builder API

- New `POST /v1/designs/{designId}/duplicate` endpoint added for creating a copy of an existing design

## 2026-08-11 Workflows Execution API

- New optional `_automation_chain` field added to flow executions, recording the chain of automations an execution was started from — returned by `POST /v2/flows/executions`, `GET`/`PATCH /v2/flows/executions/{execution_id}`, `POST /v2/flows/executions:search`, and the reconcile-automation endpoint

## 2026-08-10 Blueprint API

- New optional `performed_by` field added to blueprint deployments, identifying who performed a deployment — accepted on `POST /v2/blueprint-manifest/blueprints` and `PUT /v2/blueprint-manifest/blueprints/{blueprint_id}`, and returned by the blueprint list, read, create, update, and delete endpoints

## 2026-08-10 Customer Portal API

- New `GET /v2/portal/user/file/{id}/preview` endpoint added for retrieving a preview of a file in the portal

## 2026-08-10 Query API

- The semantic model (`GET /v2/query/semantic-model`) now reports `version` `3`; the value `2` is no longer returned (breaking)
- The `tables.entity_relationships` table was removed from the semantic model and replaced by a new `tables.entity_edges` table (breaking)
- Relationship mechanism values were renamed — `entity_relationships` is now `entity_relation` and `workflow_contexts` is now `workflow_context` (breaking)
- New required `capabilities` and `conventions.workflow_org_id_padding` fields added to the semantic model response
- `columns` on the entity, purpose, and taxonomy tables is now optional and may be absent (breaking)

## 2026-08-10 Targeting API

- New `POST /v1/campaign/{campaign_id}/recipient/{recipient_id}/entity_ui:restore` endpoint added for restoring a dismissed entity UI, together with a new optional `entity_ui_status_before_dismiss` field on recipient responses recording the status a recipient had before being dismissed
- Campaign discovery (`POST /v1/campaign:discover`) now always returns a `dismissed` flag, along with an optional `status_updated_at` timestamp

## 2026-08-10 Workflows Execution API

- New optional `heal_attempts` and `last_heal_attempted_at` fields added to workflow tasks, reporting how often a task was auto-healed and when it was last attempted — returned by all flow execution and task endpoints
- New optional `next_condition_ids` request field accepted on `PATCH /v2/flows/executions/{execution_id}/tasks/{task_id}`, for setting which conditions a task continues to

## 2026-08-10 Event: File Updated

- New `FileUpdated` event added, fired whenever an existing file entity is updated — like `FileCreated` it carries the file attachment reference (entity ID, S3 reference, and file metadata such as filename, MIME type, size, and version index) together with the hydrated file entity, so webhooks can react to changes on a file and receive its content

## 2026-08-09 Query API

- Query results now include an optional `columns` field describing the columns of the returned data, added to the `200` response of `POST /v1/query:execute`, `POST /v2/query:execute`, and `POST /v2/query/domain/entities:execute`

## 2026-08-07 Automation API

- New optional `use_uniqueness_criteria` field added to automation action configuration, accepted on `POST`/`PUT /v1/automation/flows/{flow_id}` and returned wherever actions are read (the flow read, list, search, and batch-get endpoints, the execution endpoints, and `POST /v1/automation/public/executions:resume`)

## 2026-08-06 Blueprint API

- Adding resources to a blueprint (`POST /v2/blueprint-manifest/blueprints/{blueprint_id}/resources` and `POST /v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk`) now reports partial failures — new optional `errors`, `total_errors`, `errors_truncated`, and `skipped` fields were added to the response, so a `200` no longer means every requested resource was added

## 2026-08-06 Calendar API

- New `GET`/`PUT`/`DELETE /v1/calendar/working-hours/users/{user_id}` endpoints added for reading, setting, and removing the working hours of a user
- Absence intervals can now originate from working hours — `source` may be `working_hours` on `GET /v1/calendar/absence/users`, `GET /v1/calendar/absence/users/{user_id}`, `POST /v1/calendar/absence:search`, and `POST /v1/calendar/absence:search-now`, and a new optional `working_hours_granularity` parameter controls how finely those intervals are split

## 2026-08-06 Dashboard API

- Dashboards can now be marked as favorites: new `PUT`/`DELETE /v1/dashboard/dashboards/{id}/favorite` endpoints added for marking and unmarking a dashboard, and `GET /v1/dashboard/dashboards/favorites` for listing the favorited ones
- New optional `favorite` and `favorites_first` query parameters added to `GET /v1/dashboard/dashboards` for returning only favorites or listing them first, and a `favorited` flag is now returned on the dashboard list, read, create, update, and delete responses

## 2026-08-06 Entity API

- New optional `adjust_installment` field added to entity schema capabilities — settable via `POST`/`PUT /v1/entity/schemas/capabilities/{composite_id}` and `PUT /v1/entity/schemas/{slug}`, and returned by the schema, capability, available-capability, and blueprint read endpoints

## 2026-08-06 Message API

- Thread timelines (`GET /v1/message/threads/{id}/timeline`) now also report workflow started, thread user assigned, message label added and removed, message entity linked and unlinked, auto-reply sent, and thread moved to inbox, trashed, and restored events, so consumers must be prepared for these additional event shapes in `events[].data`
- New optional `id`, `message_id`, `actor`, `source`, `automated`, and `automation` fields added to timeline events, identifying the event and who or what triggered it

## 2026-08-06 User API

- New optional `parent_production_org_id` field added to `LoginParameters` responses, identifying the production organization a login belongs to — returned by `GET /v1/users/username/{username}:getLoginParameters`, `GET /v2/users/public/username/{username}:getLoginParameters`, and `POST /v2/users/public/passkeys:resolveCredential`

## 2026-08-06 Workflows Execution API

- `automation_execution_id` and `schedule.schedule_id` on workflow tasks may now be `null` where a string was previously guaranteed — affecting all flow execution and task responses (`POST /v2/flows/executions`, `GET`/`PATCH /v2/flows/executions/{execution_id}`, the task create, update, execute, automation-run, reconcile-automation, and schedule run-now endpoints, and `POST /v2/flows/executions:search`) (breaking)

## 2026-08-06 Journey Entity

- New `journeys` relation added to the `journey` entity, letting a journey be linked to other journeys

## 2026-08-05 App API

- New optional `icon_url` field added to apps, returned by `GET /v1/app`, `GET /v1/app/{appId}`, `POST /v1/app/{appId}`, and `POST /v1/app/{appId}/promote-to/{version}`

## 2026-08-05 Automation API

- New `POST /v1/automation/executions:search` endpoint added for searching automation executions

## 2026-08-05 Calendar API

- New `POST /v1/calendar/events/{event_id}/share` and `DELETE /v1/calendar/events/{event_id}/share/{user_id}` endpoints added for sharing a calendar event with a user and for revoking that share
- Absence adjustments now carry a `status`, which is required when creating one via `POST /v1/calendar/absence/users/{user_id}/adjustments` and is always returned by the adjustment read, list, create, and update endpoints; an optional `type` field was added alongside it (breaking)
- New optional `include_busy` parameter added to `GET /v1/calendar/absence/users`, `GET /v1/calendar/absence/users/{user_id}`, `POST /v1/calendar/absence:search`, and `POST /v1/calendar/absence:search-now`, including busy time from users' calendars in the returned intervals

## 2026-08-05 Workflows Definition API

- Flow template search (`POST /v2/flows/templates:search`) now supports sorting by `name`, `id`, and `enabled` in addition to the previously available `sort_by` values

## 2026-08-04 App API

- New `widget` app component type added — `configuration.type` now accepts `widget` on `POST`/`PATCH /v1/app-configurations/{appId}/versions/{version}/components` and returns it on the app, app-configuration, and public component read endpoints

## 2026-08-04 Pricing API

- New `GET /v1/conditional-pricing/{slug}/condition-sets` endpoint added, returning the condition sets defined for a conditional pricing
- The `tax` field on line item taxes now also accepts and returns the `Tax` and `TaxItem` object shapes, in addition to the previously supported ones — affecting `POST /v1/order`, `PUT /v1/order/{id}`, `POST /v1/pricing:compute`, `POST /v1/public/cart:checkout`, and the public external-catalog and product-recommendation endpoints (breaking for consumers that assume a fixed shape for `tax`)

## 2026-08-03 User API

- New optional `passkeys_registered` field added to `LoginParameters` responses, indicating whether the user already has a passkey registered — returned by `GET /v1/users/username/{username}:getLoginParameters`, `GET /v2/users/public/username/{username}:getLoginParameters`, and `POST /v2/users/public/passkeys:resolveCredential`

## 2026-08-01 Integration Toolkit API

- New endpoints added for importing data from an ERP system: `GET`/`POST /v2/erp/imports` for listing and creating an import, `GET /v2/erp/imports/{importId}` for reading a single import, `POST /v2/erp/imports/{importId}:execute` for starting it, and `POST /v2/erp/imports/{importId}:abort` for stopping one that is still running

## 2026-07-31 Customer Portal API

- New `GET /v2/portal/entity/{slug}/{id}/workflows/linearized` endpoint added, returning the workflows of a portal entity as a flat list of steps
- New `POST /v2/portal/entities/workflows/linearized/batch` endpoint added for requesting those linearized workflows for several entities at once

## 2026-07-31 Entity API

- New optional `variant_overridable` field added to entity schema attributes — settable via `POST`/`PUT /v1/entity/schemas/attributes/{composite_id}`, `PUT /v1/entity/schemas/{slug}`, and the capability endpoints, and returned by the schema, capability, and blueprint read endpoints — marking whether an attribute may be overridden per entity variant
- New optional `conditions` field added to entity schemas, accepted on `PUT /v1/entity/schemas/{slug}` and returned by the schema read, list, versions, freeze, and unfreeze endpoints

## 2026-07-31 Workflows Definition API

- New optional `keep_task_automations_in_sync` field added to flow templates, accepted on `POST`/`PUT /v2/flows/templates/{flowId}` and returned by the template read, list, search, and duplicate endpoints

## 2026-07-31 Workflows Execution API

- New `POST /v2/flows/executions:portal-search-batch` endpoint added for running several portal execution searches in one request; the request body takes a required `entities` array (the `entity_ids` and `entity_schema` fields it briefly accepted are no longer part of it)

## 2026-07-30 Blueprint API

- New `POST /v3/blueprint-manifest/blueprints:pre-install` endpoint added for checking what a blueprint installation would do before actually starting it

## 2026-07-30 Journey Config API

- The journey `settings.savingProgress` fields were renamed: `savingMode` is now `mode` and `supportedVersion` is now `supportedRevision`. The old names are no longer accepted on `POST`/`PUT /v1/journey/configuration` and are no longer returned by the v1 journey configuration endpoints (breaking)
- `settings.savingProgress` is now also supported on the v2 journey configuration endpoints — accepted by `POST`/`PUT /v2/journey/configuration` and returned by `GET /v2/journey/configuration/{id}` and the v2 create, update, and patch responses

## 2026-07-30 Pricing API

- New optional `fields` request property added to `POST /v1/catalog` and `POST /v1/public/catalog`, limiting the catalog response to the listed fields

## 2026-07-30 User API

- New optional `totp_enabled` field added to users, showing whether two-factor authentication is set up for a user; it is returned by the user and group read endpoints (`GET /v2/users`, `/v2/users/me`, `/v2/users/{id}`, `/v2/users/{id}/groups`, the invite endpoints, and the `/v1/groups` endpoints) and can be set to `false` via `PATCH /v2/users/{id}` to turn two-factor authentication off for that user

## 2026-07-29 Workflows Execution API

- New `POST /v2/flows/executions:portal-search` endpoint added for searching flow executions exposed to the customer portal; the request requires an `audience` field, which accepts `all` alongside the individual audience values

## 2026-07-28 Entity API

- New `POST /v1/entity:abortImport` endpoint added for aborting an entity import that is still running

## 2026-07-27 App API

- New optional `change_mode` and `delete_contact` fields added to portal extension hook configuration — settable via `POST`/`PATCH /v1/app-configurations/{appId}/versions/{version}/components` and returned by the app, app-configuration, and public component read endpoints

## 2026-07-27 Blueprint API

- Blueprints can now carry notes: new `POST /v2/blueprint-manifest/blueprints/{blueprint_id}/notes`, `PATCH /v2/blueprint-manifest/blueprints/{blueprint_id}/notes/{note_id}`, and `DELETE /v2/blueprint-manifest/blueprints/{blueprint_id}/notes/{note_id}` endpoints added for adding, editing, and removing a note, and a `notes` field is now accepted when creating or updating a blueprint (`POST`/`PUT /v2/blueprint-manifest/blueprints`) and returned on the blueprint read, list, create, update, and delete responses; each note also carries an `updated_at` timestamp
- New optional `sync_notes` install option added to `POST /v2/blueprint-manifest/blueprint:install`, `POST /v3/blueprint-manifest/blueprint:install`, `POST /v3/blueprint-manifest/bulk-installs`, and `POST /v2/blueprint-manifest/jobs/{job_id}:continue`, controlling whether blueprint notes are carried over during installation

## 2026-07-27 Integration Toolkit API

- Passing `group_id` on events is now supported for parallelization within a batch of events in `POST /v3/erp/updates/events`
- `POST /v1/integrations/{integrationId}/events/replay` responses now always include `replayed` and `results`, reporting how many events were replayed and the outcome for each one

## 2026-07-26 Blueprint API

- New `POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:health-check` and `GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/health-report` endpoints added for starting a health check on a blueprint deployment and reading the resulting health report

## 2026-07-26 Email Settings API

- New endpoints added for managing custom SMTP connections: `GET`/`POST /v2/smtp/connections` for listing and creating connections, `GET`/`PUT`/`DELETE /v2/smtp/connections/{connectionId}` for reading, updating, and removing a single connection, and `POST /v2/smtp/connections/{connectionId}/test` for verifying that a connection works
- New endpoints added for managing the sender addresses used with those connections: `GET`/`POST /v2/smtp/senders` for listing and adding senders, and `DELETE /v2/smtp/senders/{email}` for removing one

## 2026-07-25 Integration Toolkit API

- New `POST /v2/integrations/{integrationId}/monitoring/external-events` and `GET /v2/integrations/{integrationId}/monitoring/traces/{correlationId}` endpoints added for reporting externally-observed events into integration monitoring and for reading the full trace belonging to one correlation ID
- New optional `correlation_id` field added to ERP update events (`POST /v1/erp/updates/events` and `POST /v2/erp/updates/events`) and returned for each event on `POST /v1/integrations/{integrationId}/events`, letting an event be tied to a monitoring trace

## 2026-07-24 Integration Previous Provider API

- New `GET /v2/integration/{type}/providers` endpoint added, listing the available previous providers for a given integration type

## 2026-07-22 Message API

- New optional `inbox_id` field added to `POST /v1/message/threads:searchIds`, limiting the returned thread IDs to threads in that inbox

## 2026-07-22 Metering API

- New `POST /v2/metering/readings/prune` endpoint added for removing meter readings

## 2026-07-21 Notification API

- New optional `allowed_channels` field (`email`, `in_app`) added when creating notifications and returned on notification reads; it caps which delivery channels a notification may use, with actual delivery being the intersection of this list and each recipient's own channel preferences (an empty array suppresses all delivery)

## 2026-07-16 Entity API

- Entity data can now be returned with PII removed: an optional `anonymize` query parameter was added to the entity read endpoints (`GET /v1/entity/{slug}/{id}` and its v2/v3 variants, plus the `activity`, `changesets`, `relations`, `/v1/entity/activity/{id}`, and `/v1/entity:autocomplete` operations), and an optional `anonymize` request-body flag was added to `POST /v1/entity:search`, `:list`, and `:export`; when `true`, identifiers such as names, emails, phone numbers, and IBANs are replaced with deterministic pseudonyms (anonymization is forced regardless of the flag when the access token was created with `anonymize: true`)
- New optional `data_classification` field (`pii` or `public`) added to every entity schema attribute type — returned by the schema endpoints and settable via `POST /v1/entity/schemas/attributes` — where `pii` always anonymizes the attribute value in anonymized responses and `public` never does, overriding the built-in defaults

## 2026-07-16 File API

- New `GET /v1/files/{id}/text` endpoint added, returning the plain-text representation of a file entity (`FileText`); its `status` is `ready` (text available), `not_ready` while the text is still being prepared, or `unsupported` when text is unavailable for the file or organization

## 2026-07-15 Access Token API

- New optional `anonymize` flag added when creating access tokens (`POST /v1/access-tokens`, including the app-token and assume-token variants); when `true`, all entity data returned to the token is PII-anonymized and the bearer cannot turn it off — the flag is also returned on token list, create, and delete responses

## 2026-07-15 Blueprint API

- New `POST /v3/blueprint-manifest/blueprints/{blueprint_id}:publish` endpoint added for starting an asynchronous V3 blueprint publication

## 2026-07-15 Customer Portal API

- New `POST /v2/portal/contract/{id}/resolve-templates` endpoint added — a POST variant of get-contract that accepts Handlebars templates and returns their resolved output per related meter (`templates_output`)

## 2026-07-15 Journey Config API

- `POST /v1/journey/document:generate` now accepts an optional `context_entity_id`, resolving entity and relational template variables against that entity when generating the document

## 2026-07-14 Message API

- New `POST /v2/message/threads:workload` endpoint added, returning the number of open threads assigned directly to each of up to 100 requested users (matching their central-inbox open view) for use in assignment load-balancing

## 2026-07-14 Webhooks API

- Webhook filter conditions can now be expressed as a single JSONata expression: a new optional `jsonata_expression` field (max 15000 characters) was added to `filterConditions.conditions[]`, evaluated against the event payload and passing when the result is truthy, and `field`/`operation` became optional — a condition is now either a classic field + operation comparison or a JSONata expression (the two are mutually exclusive), accepted on `POST`/`PUT /v1/webhooks/configs` and returned in config responses

## 2026-07-13 File API

- New optional read-only `etag` field (the file's S3 content hash) added to file responses — on both the file attributes and each entry in `versions[]` — across the v1 and v2 file endpoints, letting clients detect real content changes without re-downloading the file

## 2026-07-13 Webhooks API

- Webhook filter conditions now support six length-based operators (`length_equals`, `length_not_equals`, `length_greater_than`, `length_less_than`, `length_greater_than_or_equals`, `length_less_than_or_equals`) on `filterConditions.conditions[].operation`, letting event delivery be filtered by the item count of a field value (an array yields its length, a missing/null value yields `0`, any other single value yields `1`); accepted on `POST`/`PUT /v1/webhooks/configs` and returned in config responses

## 2026-07-10 Event: Service Meter Reading Added

- New optional `file_id` field added to each `meter_readings` item, carrying the entity ID of the photo submitted with that reading; it matches an `event_attachments[].entity_id`, so consumers can pair a reading with its attachment deterministically instead of relying on the `relation_tags`/`_tags`/`mime_type`/`_created_at` heuristics (which remain the fallback when `file_id` is absent)

## 2026-07-09 Blueprint API

- The `schema`, `taxonomy`, `family`, and `permission` resource types are no longer accepted by the uniqueness-criteria endpoints (`GET`/`PUT`/`DELETE /v1/blueprint-manifest/uniqueness-criteria/{resource_type}`) and no longer appear in their responses (breaking)

## 2026-07-09 Integration Toolkit API

- The integration notification rule `type` enum was narrowed — the `consecutive_failures`, `first_error`, `new_error_code`, `auth_expiry`, `ack_timeout`, and `validation_surge` values are no longer accepted on create/update or returned in responses, and the related `consecutive` rule field was removed from both requests and responses (breaking)

## 2026-07-09 User API

- New optional `in_app_notification_setting` field added to users — returned across the `/v2/users` list, get, `me`, invite, and group responses and settable via `PATCH /v2/users/{id}` — controlling per-type in-app notification delivery preferences

## 2026-07-08 Targeting API

- New `POST /v1/campaign:discover` and `PATCH /v1/campaign/{campaign_id}/recipient/{recipient_id}/entity_ui:status` endpoints added for Entity-UI Next Best Actions, along with new `entity_ui_status`, `entity_ui_status_updated_at`, and `resolution` fields on campaign recipient responses
- Each recommended action returned by `POST /v1/campaign:discover` carries an `nba.cta` whose `type` is `journey`, `workflow`, or `flow` (a flow template ID); the previous `url` CTA type and the `nba.cta.label` field are not part of the response

## 2026-07-07 App API

- New `PUT`, `PATCH`, and `DELETE /v1/public/app/{appId}/proxy/{proxyName}/{path}` endpoints added, letting apps forward those HTTP methods through to a registered proxy target
- New `changeEmail`, `changePassword`, and `deleteAccount` portal extension hook types added, letting apps replace the built-in change-email, change-password, and delete-account flows for portal users
- The app proxy configuration (`ApiProxyComponent`) gained an optional `headers` map for injecting request headers server-side, with values resolved from encrypted component options via `{{option_key}}` interpolation so credentials never reach the client; the proxy `target` URL now supports the same `{{option_key}}` interpolation for per-installation hosts

## 2026-07-07 Workflows APIs

- New optional `linear` flag added to flow templates (settable on `POST`/`PUT /v2/flows/templates`); when `true`, task enablement is computed at runtime from the flow graph — a task becomes enabled once all its direct predecessors are complete — overriding any explicit per-task requirements
- New optional `linear` flag added to flow executions (copied from the flow template when the execution starts); when `true`, task enablement is computed at runtime from the flow graph — a task becomes enabled once all its direct predecessors are complete — instead of from each task's explicit requirements

## 2026-07-04 Call Entity

- New `call` entity introduced for tracking customer calls, with an `agent` relation and a `contact` relation, plus `duration` (in seconds), `recording` (link), `transcript`, and `external_id` attributes

## 2026-07-03 Customer Portal API

- New optional `password_history_size` field added to the Cognito password policy (0–24) across the v2/v3 portal config endpoints, preventing reuse of that many previous passwords (`0` disables it)

## 2026-07-03 Deduplication API

- `POST /v1/deduplicate` and `POST /v1/deduplicate/job` now reject empty input — the request body must contain at least one merge instruction, each instruction's `toDelete` list must contain at least one id, and `toKeep` and every `toDelete` id must be a non-empty string (previously empty arrays and empty strings were accepted) (breaking)

## 2026-07-03 Metering API

- `POST /v1/metering/readings` and `POST /v2/metering/readings` now accept an optional `create_ticket` query parameter (default `true`); set it to `false` for authoritative system-driven writes (e.g. ERP inbound) to suppress creation of the manual-intervention review ticket

## 2026-07-02 Billing API

- New pricing-information and configuration-history endpoints added for both contracts and billing accounts: `GET /v1/billing/contracts/{id}/pricing_information`, `GET /v1/billing/contracts/{id}/configuration_history`, `GET /v1/billing/billing_accounts/{id}/pricing_information`, and `GET /v1/billing/billing_accounts/{id}/configuration_history`
- New `invoice` billing event type added — invoice events can now be created via `POST /v1/billing/events` and are returned alongside the other billing event types

## 2026-07-02 Calendar API

- New user-absence endpoints added: list absent users in a time window (`GET /v1/calendar/absence/users`), get a single user's absence (`GET /v1/calendar/absence/users/{user_id}`), search absence for multiple users at once (`POST /v1/calendar/absence:search`), search current-moment absence for a batch of users (`POST /v1/calendar/absence:search-now`, returning an `absent_until` timestamp marking the end of any active absence), and create, read, update, and delete manual absence adjustments (`.../absence/users/{user_id}/adjustments`)
- `GET /v1/calendar/absence/users/{user_id}` also returns an optional `external_calendars` array listing the user's connected Outlook/Google calendars and each provider's `last_synced_at`

## 2026-07-02 Workflows Definition API

- New optional `limit_warnings` array added to flow templates, listing non-blocking warnings about configuration limits a saved flow exceeds while remaining fully usable
- `POST /v2/flows/templates` and `PUT /v2/flows/templates/{flowId}` now accept an optional `enforce_limits` query parameter (default `false`); when `true`, size/count limit violations are rejected as `400` errors instead of being accepted and returned as non-blocking `limit_warnings`

## 2026-07-01 Dashboard API

- New `GET /v1/dashboard/insights/tags` endpoint added, returning the distinct tags used across an organization's saved insights
- `GET /v1/dashboard/dashboards` and `GET /v1/dashboard/insights` now accept filtering, sorting, and pagination query parameters (`q`, `created_by`, `created_after`/`created_before`, `updated_after`/`updated_before`, `shared_with`, `owner`, `accessible_to`, `sort`, `order`, `limit`, `offset`); insights additionally accept `visualisation_id`, `tags`, and `tags_match`
- List responses now return a `pagination` object (`total`, `limit`, `offset`, `has_more`) and always include `results`
- New optional `tags` array field added to insights

## 2026-07-01 Entity API

- New `user` location added to taxonomy classifications, so a taxonomy can now be enabled for the `user` entity (accepted in `enabled_locations` on `POST`/`PUT /v1/entity/taxonomies`, `POST /v1/entity/taxonomies/{taxonomySlug}/classifications`, and the v2 classification endpoints)
- New optional `source_context` object added to activity-log operations (`GET /v1/entity/activity/{id}` and `GET /v1/entity/{slug}/{id}/activity`), reporting the origin and actor behind each change (`source`, `source_label`, `source_system`, `source_reference`, `actor_type`, `actor_id`, `effective_at`)

## 2026-07-01 File API

- `GET /v1/files/public/{id}/preview` can now respond with `302` (redirect to the original file when a preview cannot be generated) or `204` (no preview and no redirect target available); clients should handle both in addition to the normal image response

## 2026-07-01 Message API

- New optional `save_to_entity` flag added to file attachments on `POST`/`PUT /v1/message/messages`, `POST /v1/message/drafts`, and thread endpoints; when `false`, the file is kept on the message for inline rendering instead of being propagated to the related destination entity (defaults to `true`)

## 2026-07-01 User API

- New optional `tags` array added to users — returned across the `/v2/users` endpoints (list, get, `me`, invite, and group responses) and settable via `PATCH /v2/users/{id}`

## 2026-06-30 Blueprint API

- New bulk-install endpoints added for installing one blueprint into many organizations in a single request: `POST /v3/blueprint-manifest/bulk-installs`, `GET /v3/blueprint-manifest/bulk-installs/{bulk_job_id}`, `GET .../bulk-installs/{bulk_job_id}/targets`, and `POST .../bulk-installs/{bulk_job_id}/targets/{destination_org_id}:retry` for retrying an individual failed target
- The Terraform-based v2 install, validate, export, and patch endpoints were deprecated in favor of the V3 install engine (`POST /v2/blueprint-manifest/blueprint:install`, `POST .../blueprints/{blueprint_id}/validate`, `POST .../blueprints/{blueprint_id}:export`, and the `.../blueprints/{blueprint_id}/patches` family)
- `POST /v3/blueprint-manifest/blueprint:install` now accepts an optional `auto_apply` flag; when `true`, the install is applied automatically after the plan and snapshot steps instead of waiting for a separate `:continue` call

## 2026-06-30 Customer Portal API

- New endpoints added to request an asynchronous CSV export of a portal user's contracts, delivery points, and meters, and to poll the export job for a download link once it is ready
- The export request now requires a JSON body specifying the entity `schema` and ordered `columns` to export (with optional `search` filters); the `language` query parameter was removed in favor of a body field (breaking)

## 2026-06-30 Event Catalog API

- New optional `success_criteria` field added to event configurations (returned by `GET /v1/events` and `GET /v1/events/{event_name}`, settable via `PATCH /v1/events/{event_name}`), listing the entity attributes an organization considers required for an event to be complete

## 2026-06-30 Webhooks API

- Event replay can now re-run the JSONata transform: `POST /v1/webhooks/configs/{configId}/events/{eventId}/replay` and `.../events/replay-batch` accept an optional `reapply_transform` flag that reconstructs the original pre-transform input and re-runs the full delivery pipeline (default `false`, which resends the post-transform payload as-is)
- Webhook event responses now include `original_payload` (the raw pre-transform input, when available), `can_reapply_transform`, and `can_reapply_transform_reason`; single-event replay can now return `422` when the original input cannot be reconstructed

## 2026-06-29 Message API

- `PUT /v1/message/messages` can now return `409 Conflict` when a draft has been edited by someone else since it was loaded, including the current server version of the message so clients can reload and retry
- New optional `updated_by` field added to message and thread responses, recording the user who last edited the message

## 2026-06-29 Portal User Entity

- New read-only `first_login` and `last_login` date-time attributes added, recording when a portal user first and most recently signed in

## 2026-06-26 Audit Log API

- `POST /v1/logs` now accepts `resource_id`, `resource_type`, and `action` filters for narrowing audit-log searches to the resource an event targets and its semantic action name (e.g. `blueprint.resource_added`); the same three fields are now returned on each log record

## 2026-06-26 Customer Portal API

- New endpoints added to read and update a portal's mobile app configuration (`GET`/`PUT /v1/portal/mobile-config`), covering app branding, iOS and Android settings, and over-the-air (OTA) update settings
- New `POST /v2/portal/entity/{slug}` and `PATCH /v2/portal/entity/{slug}/{id}` endpoints added for creating and updating entities in the portal context

## 2026-06-26 Integration Toolkit API

- New optional `prevent_indirect_serving` field added to FileProxy use case configuration; when `true`, files too large to be served directly in the proxy response are rejected instead of being served via a temporary S3 redirect, so files never transit epilot's temporary storage

## 2026-06-25 Entity API

- New optional `q` query parameter added to `GET /v1/entity/views` for free-text searching saved views by name

## 2026-06-25 Calendar API

- New `DELETE /v1/calendar/sources/outlook/{calendar_id}` endpoint added for disconnecting a previously connected Outlook calendar

## 2026-06-25 Snapshot API

- New endpoints added to schedule recurring organization snapshots — read, create or update, and delete a per-organization snapshot schedule (`GET`/`PUT`/`DELETE /v1/org-snapshot-schedule`) with a cron expression, timezone, retention window, and excluded resource types

## 2026-06-25 Integration Toolkit API

- New integration notification-monitoring endpoints added: `GET /v2/integrations/{integrationId}/notifications/history` (paginated history of fired and suppressed notifications), `GET /v2/integrations/{integrationId}/notifications/status` (live per-rule alert state and baseline bands), and `POST /v2/integrations/{integrationId}/notifications/test` (send a test notification to the calling user)
- Integration settings now carry an optional `notifications` configuration object (recipients, delivery channels, alert rules, and digest schedule) on the v1 and v2 create, update, and read endpoints

## 2026-06-24 File API

- AI file summaries are now managed as asynchronous jobs: new `GET /v1/files/{id}/summary` returns the current summary text and status, `POST /v1/files/{id}/summary-jobs` creates (or returns) the current summary job, and `GET /v1/files/{id}/summary-jobs/current` and `GET /v1/files/{id}/summary-jobs/{job_id}` poll job status; the summary response now exposes per-language `preview_summary_de`/`preview_summary_en` and `short_summary_de`/`short_summary_en` fields
- The `summary_status` field was removed from file response objects — read summary state from the new summary endpoints instead (breaking)

## 2026-06-24 Workflows Execution API

- New optional read-only `error_reason` field added to the `schedule` (`DelayedSchedule`/`RelativeSchedule`) of automation and decision tasks across flow execution responses; it is populated when scheduling the task failed (e.g. the referenced date attribute is empty or the resolved fire time is already in the past) and cleared once the task is successfully re-armed

## 2026-06-24 Event: Location Move Requested

- The single `meter_counter` field was replaced by a `meter_counters` array, so moves involving multiple meter counters are now fully represented (breaking)

## 2026-06-22 Email Template API

- `POST /v1/email-template/templates/{id}:convertToBuilder` now accepts an optional `as_copy` flag (with an optional name) to convert a template to the visual builder as a new copy, leaving the original template unchanged

## 2026-06-22 SSO API

- `POST /v1/sso/public/login` responses now include an optional `role_assignment` object, reporting the roles assigned to the user by the SSO provider's role mapping and whether they changed during this login

## 2026-06-19 Dashboard API

- New Insights resource added for managing reusable saved charts independently of dashboards: `GET`/`POST /v1/dashboard/insights` and `GET`/`PUT`/`PATCH`/`DELETE /v1/dashboard/insights/{id}`
- New `PATCH /v1/dashboard/dashboards/{id}` endpoint added for partially updating a dashboard
- Dashboards and insights now carry ownership and sharing metadata (`owners`, `shared_with`, `org_access`); sharing is managed via the new `PATCH` operations and only owners may change it
- Dashboard tiles can now reference a saved insight via `insight_id`, in addition to the existing inline visualisation

## 2026-06-19 Workflows Execution API

- New optional `outcome` field added to AI agent task responses, exposing the server-computed result of the agent execution (e.g. `assigned`, `recommended`, `no_eligible_partner`, `missing_input`)

## 2026-06-18 Email Settings API

- `POST /v2/outlook/mailbox/connect` now accepts new optional fields: `name` (sender name for the mailbox), `user_ids` and `group_ids` (users and groups the mailbox is available to by default), and `default_signature_id`

## 2026-06-17 ERP Integration API

- `POST /v1/secure-proxy` now returns a structured error body on `502` (a required `message` category plus optional `code` and `reason`), so clients can distinguish an upstream-side failure — TLS/certificate, DNS, connection refused/reset, or timeout — from an epilot-side one; successful upstream responses still pass through their original status and body unchanged

## 2026-06-17 Targeting API

- `automation_status` query parameter on `GET /v1/campaign/{campaign_id}/recipients` changed from a single-value enum to a repeatable array parameter (breaking)
- `POST /v1/campaign:setup` no longer requires `automation_id` on the email channel and accepts a new optional `template_id`, allowing the flow to be created from a template instead of a pre-selected automation

## 2026-06-16 Blueprint API

- New `GET /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}/restore-preview` endpoint added, returning the predicted outcome of reverting a deployment without making any changes
- `POST /v3/blueprint-manifest/blueprint-instances/{blueprint_instance_id}:restore` endpoint removed; deployment restore now runs only via `POST .../blueprints/{blueprint_id}/deployments/{job_id}:restore` (breaking)

## 2026-06-16 Snapshot API

- New `POST /v1/snapshots:capture-org` endpoint added for asynchronously snapshotting the caller's entire organization
- `POST /v1/snapshots/{id}:restore` now accepts an optional `exclude_target_ids` array (target IDs the caller wants left untouched during restore)
- The `preserve_modified` option was removed from `POST /v1/snapshots/{id}:restore`, and the related `skipped` arrays (and `SkippedResource` schema) were removed from restore and capture results on `GET /v1/snapshots` and `GET /v1/snapshots/{id}`; drift-based skipping is no longer performed during restore (breaking)

## 2026-06-16 User API

- New public password-reset endpoints added: `POST /v2/users/public/requestPasswordReset` and `POST /v2/users/public/resetPassword` (unauthenticated, rate-limited), plus an authenticated `POST /v2/users:sendPasswordReset` for triggering a reset email for a user in the caller's organization

## 2026-06-15 Email Template API

- New `GET /v1/email-template/templates/{id}:references` endpoint added, returning where a template is currently referenced

## 2026-06-15 Integration Toolkit API

- New endpoints added for managing outbound message queues: `POST /v1/integrations/{integrationId}/outbound/messages/poll`, `.../ack`, and `.../unblock`, plus `GET /v1/integrations/{integrationId}/outbound/messages/dlq` and `POST .../outbound/messages/dlq/redrive` for dead-letter handling
- Outbound use case delivery configuration was restructured into a discriminated union of `WebhookDeliveryConfig` and the new `PollDeliveryConfig`; the previous flat `type`, `webhook_id`, `webhook_name`, and `webhook_url` delivery fields were removed (breaking)

## 2026-06-15 Automation API

- New optional `evaluation_order` (`AFTER_SCHEDULE` / `BEFORE_SCHEDULE`) and `allow_failure` fields added to flow condition items — `evaluation_order` controls how a condition combines with its schedule, and `allow_failure` lets execution continue past a condition block that errors

## 2026-06-15 Core Entities

- The `journey` entity gained new relations to `products`, `prices`, and `files`; correspondingly, the `product`, `price`, and `file` entities each gained a new `journeys` relation

## 2026-06-15 Event: Meter Reading Added

- New `account` field added carrying the full account entity related to the reading (company details, addresses, payment data, contacts, and related entities)

## 2026-06-12 Access Token API

- New optional `read_only` field added when creating access tokens (`POST /v1/access-tokens`); a read-only token may only perform view, export, and download actions regardless of the roles it carries

## 2026-06-08 Workflows Execution API

- New `POST /v2/flows/executions/{execution_id}/tasks/{task_id}/reconcile-automation` endpoint added for reconciling the status of a stuck automation task

## 2026-06-07 Event Catalog API

- New `GET /v1/events/{event_name}/versions` endpoint added listing the available payload schema versions for an event, and a new optional `Epilot-Event-Version` header on the JSON-schema and example endpoints to request a specific version
- New `_downgrades` field added to event history responses, describing how a payload was downgraded to an older schema version

## 2026-06-07 Webhooks API

- New optional `eventVersion` field (`MAJOR.MINOR` format) added to webhook configuration to pin deliveries to a specific event payload schema version

## 2026-06-05 Targeting API

- New `POST /v1/campaign:setup` endpoint added for atomically creating a campaign together with its related entities (e.g. a tariff-change campaign with its journey, portal widget, and email channel)

## 2026-06-09 Calendar API

- New endpoints added for managing calendars and events: `POST /v1/calendar`, `PATCH`/`DELETE /v1/calendar/{calendar_id}`, `POST /v1/calendar/events`, and `PATCH`/`DELETE /v1/calendar/events/{event_id}`, plus `POST /v1/calendar/sources/outlook` and `GET /v1/calendar/sources/outlook/available` for connecting Outlook calendars

## 2026-06-04 Calendar Entity

- New `calendar` entity introduced, with required `name` and `source_type` attributes and relations to its owning user and to files

## 2026-06-04 Calendar Event Entity

- New `calendar_event` entity introduced, with a required `calendar` relation and required `event_type`, `start_time`, `end_time`, and `source_type` attributes

## 2026-06-03 Blueprint API

- New `POST /v3/blueprint-manifest/blueprint-instances/{blueprint_instance_id}:restore` and `POST /v3/blueprint-manifest/blueprints/{blueprint_id}/deployments/{job_id}:restore` endpoints added for rolling back deployments, along with new `snapshot_id`, `restore_status`, and `last_restore_job_id` deployment fields

## 2026-06-03 Webhooks API

- New optional `retryPolicy` object (`enabled`, `maxAttempts`) added to webhook configuration for automatic delivery retries, and a `retry_attempt` field added to webhook event records

## 2026-06-02 Workflows Definition API

- Decision task condition statements now accept an `attributes` array and an `attributes_match` mode, allowing a single condition to evaluate multiple entity attributes at once

## 2026-05-29 Blueprint API

- The blueprint install endpoint now accepts a `source_blueprint_file` as an alternative to `source_org_id` plus `source_blueprint_id`, and adds optional `source_auth_token` and `destination_auth_token` fields for cross-org installs

## 2026-05-27 File API

- New `POST /v1/files/{id}/summary:generate` endpoint added for generating an AI summary of a file, alongside new `preview_summary`, `short_summary`, and `summary_status` response fields

## 2026-05-25 Pricing API

- Provider search responses (`POST /v1/public/integration/{integrationId}/providers:search`) now include the required `type` and `additionalData` fields, the latter carrying grid operators, default suppliers, and market-area details
- New optional `external_location_metadata` field added to line items on `POST /v1/order`, `PUT /v1/order/{id}`, `POST /v1/pricing:compute`, and `POST /v1/public/cart:checkout`

## 2026-05-25 Webhooks API

- Multipart webhook delivery configuration was restructured: the `metadataFieldName` field was removed and replaced by `fileSource` (a JSONata expression selecting which attachments to send), `fileFieldStrategy` (`single` or `multi`), and `extraFields` (additional form fields populated from JSONata expressions) (breaking)

## 2026-05-25 Event Catalog API

- New endpoints added for accessing event history: `POST /v2/events/{event_name}:history` to search past events and `GET /v2/events/{event_name}/history/{event_id}` to fetch a single event

## 2026-05-22 Email Settings API

- New `GET /v2/outlook/calendar/me` and `DELETE /v2/outlook/calendar/me` endpoints added for inspecting and removing the current user's Outlook calendar connection

## 2026-05-22 User API

- New endpoints added for managing per-user settings: `GET /v2/users/me/settings` (list available scopes and keys), `GET /v2/users/me/settings/{scope}`, and `GET`/`PUT`/`DELETE /v2/users/me/settings/{scope}/{key}` — scopes include `calendar`, `navigation`, and `search`

## 2026-05-21 Notes API

- New `POST /v1/note/{id}/archive` and `POST /v1/note/{id}/unarchive` endpoints added, along with an `_archived_at` field and a `filter` query parameter for filtering notes by archive state

## 2026-05-20 Automation API

- New `loops` field added to automation flows (`POST /v1/automation/flows`) defining loop scopes that resolve an array from the trigger entity; actions opt into a loop via a new `loop_id` property and then run once per resolved item

## 2026-05-19 Query API

- New `nextCursor` and `total` response fields added, enabling keyset pagination for chart-config row queries and total-count reporting for paginated raw-SQL queries

## 2026-05-15 File API

- New asynchronous file zip export endpoints added: `POST /v1/files:zipJob` bundles multiple files into a downloadable archive and `GET /v1/files:zipJob/{job_id}` polls the job status; the optional `notify_email` field accepts an email address to notify on completion

## 2026-05-13 Entity API

- New optional `org_id` field added to `created_by` user objects on saved views (`POST /v1/entity/view`, `GET/PUT/PATCH /v1/entity/view/{id}`, `GET /v1/entity/views`, `GET /v1/entity/views/favorites`) for partner access control across organizations

## 2026-05-13 Integration Toolkit API

- New `portal_ref` and `env_var_ref` config options added to inbound use case field mappings — `portal_ref` resolves to a property (`portal_id`, `origin`, `domain`, `name`) of one of the calling organization's portal configurations at runtime by filter, and `env_var_ref` resolves to an org-scoped non-secret environment variable from the environments-api service, replacing hardcoded environment-specific portal UUIDs and config values in inbound mappings

## 2026-05-13 Metering API

- New endpoints added for managing pending reading changesets: `GET /v1/metering/reading/{meter_id}/{counter_id}/changesets` (list pending), `PATCH /v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}` (edit the proposed value), `POST .../changesets/{changeset_id}:apply` (approve and commit to ClickHouse), and `POST .../changesets/{changeset_id}:dismiss` (reject)
- New optional `direct` query parameter added to all reading-write endpoints (`POST /v1/metering/reading`, `POST /v1/metering/readings`, `POST /v1/metering/readings/{meter_id}`, `POST /v2/metering/readings`) — when `true`, bypasses changeset interception and writes directly to ClickHouse, auto-clearing matching pending changesets; the same effect is triggered automatically when `source: 'ERP'` is set in the request body
- New optional `include_pending_changesets` query parameter added to `GET /v1/metering/meter` and `GET /v1/metering/reading/{meter_id}/{counter_id}`, including pending reading changesets in the response alongside confirmed readings

## 2026-05-13 Event: Meter Reading Added

- New `activity_type` field added identifying the lifecycle action that triggered the event: `MeterReadingsAdded` (direct commit), `ChangesetCreated` (pending), `ChangesetApplied` (pending → committed), or `ChangesetDismissed` (pending rejected)
- New `changeset_id` and `changeset_edit_mode` (`direct` / `external` / `approval`) fields added, carrying the originating changeset's identifier and mode
- New `dismissed_reason` and `dismissed_at` fields populated on `ChangesetDismissed` events

## 2026-05-07 Event: Service Meter Reading Added

- New `event_attachments` array added carrying file metadata (`entity_id`, `filename`, `mime_type`, `size_bytes`, `s3ref`, `version_index`, `readable_size`, `_tags`, `relation_tags`, `category`, `file_date`, `_created_at`) for every file related to the ticket — consumers should filter by `relation_tags`, `_tags`, `mime_type`, or `_created_at` proximity to `reading_timestamp` to identify the meter reading photo
- New `ticket_files` array added on the hydrated entity graph carrying the full file entity objects

## 2026-05-06 App API

- New `PortalExtensionHookDataExport` portal extension hook type added — when configured on export-capable portal blocks, the portal delegates the export action (CSV/Excel/PDF download) to the external source instead of generating the file itself
- New `PortalExtensionHookVisualizationMetadata` portal extension hook type added — invoked before fetching data with the same portal context as the data hook, returns per-meter/contract visualization metadata (`type_options`, `intervals`, `data_range`)
- `intervals` field on `PortalExtensionHookConsumptionDataRetrieval`, `PortalExtensionHookCostDataRetrieval`, and `PortalExtensionHookPriceDataRetrieval` deprecated — prefer declaring a sibling `visualizationMetadata` hook so supported intervals can vary per meter/contract
- `use_static_ips` field deprecated on all portal extension hook types — prefer `secure_proxy`
- New `object` enum value added to portal extension component option `type`, plus new `fields` (primitive sub-field declarations) and `repeatable` (array-of-entries flag) properties — enables structured object-typed and list-typed component options

## 2026-05-06 User API

- New optional `abbreviation` field (up to 2 characters, nullable) added to user groups across `GET /v1/groups`, `POST /v1/groups`, `GET/PATCH /v1/groups/{id}`, `POST /v1/groups/{id}/user:next`, and `GET /v2/users/{id}/groups`

## 2026-05-05 Automation API

- New optional `mark_as_read` field added to `ForwardEmailAction`, `ReplyEmailAction`, and `SendEmailAction` configurations, controlling whether the email thread is automatically marked as read after the action completes

## 2026-05-02 Message API

- New optional `mark_thread_as_read` field added to `POST /v1/message/messages` and `POST /v1/message/drafts`, controlling whether sending a reply marks the thread as read for the sender's org/user (defaults to `true`)

## 2026-05-04 Pricing API

- New optional `availability_address` and `variable_inputs` fields added to the external catalog request `context` on `POST /v1/public/external-catalog/products`, `POST /v1/public/external-catalog/product-recommendations`, and `POST /integration/external-service`, enabling availability filtering by address and variable-amount price computation
- New optional `cashback_name` field added to `CashbackAmount` items across order, pricing, cart, and external-catalog responses

## 2026-05-01 Core Events

- Four new pending-changeset metadata fields added across all built-in events: `_has_pending_changesets`, `_changeset_edit_modes`, `_changeset_attributes`, and `_changeset_edit_modes_by_attribute` — enabling fine-grained webhook conditions based on whether the triggering entity has pending changesets and which attributes/edit modes are involved

## 2026-05-01 Event: Meter Reading Added

- New `proposed_meter_readings` array added carrying pending reading-changeset context (counter ID, value, direction, status, edit_mode, changeset_id, and previous values being overwritten); populated only when the event represents a pending reading-changeset creation
- New `unit` field added to individual items in the existing `meter_readings` array

## 2026-04-30 Integration Toolkit API

- `slug` request property is now required on all use-case create variants (`POST /v1/integrations/{integrationId}/use-cases`) — file proxy, inbound, managed call, outbound, and secure proxy (breaking)
- New optional `allowed_origins` array field added to FileProxy use case configuration, listing additional origins permitted to call `/download` (CORS); portal origins remain always allowed

## 2026-04-30 Journey Config API

- New optional `version` query parameter added to `GET /v1/journey/configuration/{id}` and `GET /v2/journey/configuration/{id}` for fetching historical snapshots; `0` (default) returns the live row, positive integers return earlier saved versions
- New optional `settings.isActive` boolean field added to journey configurations

## 2026-04-28 Entity API

- New optional `edit_mode` and `edit_mode_config` fields added to all entity schema attribute types in schema responses
- `_changesets` field now included on entity objects returned from activity log responses

## 2026-04-28 Notes API

- `created_by` field type changed from a single object to an array of objects across all note endpoints — consumers reading `created_by` fields must handle arrays (breaking)
- New optional `edited_at` timestamp field added to notes and comments
- `POST /v1/notes:search` now requires at least one entry in the `contexts` array; previously empty arrays were silently accepted (breaking)
- New optional `include_related_schemas` array field added to note search requests for including notes on related entity schemas

## 2026-04-28 Entity Mapping API

- New iteration operations added to entity mapping rules: `_each` (path to the source array to iterate), `_as` (variable name for each item, accessed as `$<name>` in `_copy` paths within `_map`), and `_map` (operation applied per iteration item), enabling array-to-array entity transformation

## 2026-04-28 Webhooks API

- Webhook auth credential fields (`password`, `clientSecret`, `keyValue`) are now nullable; passing `null` explicitly clears the stored value, omitting the field preserves the existing value
- New optional `apply_changesets` boolean field added to webhook `payloadConfiguration`; when `true`, entity fields in the webhook payload reflect proposed changeset values instead of current persisted values

## 2026-04-21 Core Events

- New `remarks` array field added to `MeterReadingAdded` and `ServiceMeterReadingAdded` events, containing free-text remarks from the submitter in reading order (one per counter for multi-counter meters; empty or whitespace-only remarks are omitted)
- New `remark` field added to individual counter reading items within `ServiceMeterReadingAdded`


## 2026-04-17 Pricing API

- `context.contract.billing_account` and `context.contract.payment` request fields on `POST /v1/public/external-catalog/products` and `POST /v1/public/external-catalog/product-recommendations` changed from string relation IDs to objects (breaking)
- `context.contract.branch` enum constraint removed on the same endpoints; the field now accepts any string instead of only the previous fixed values (`power`, `gas`, `water`, `waste_water`, `district_heating`)

## 2026-04-17 Permissions API

- New `equals_current_user` grant condition (`EqualsCurrentUserCondition`) added, checking whether any `relation_user` attribute on the entity contains the currently authenticated user; an optional `attribute` path restricts the check to a specific field
- New optional `vendor_created` boolean field added to user, partner, and sharing role responses, indicating the role was created by a vendor organization on behalf of a partner organization

## 2026-04-16 Design Builder API

- Many new design token fields added to Journey design objects for fine-grained styling: button variants (primary, ghost, outlined), input fields, cards, chips, dropdowns, datepicker, toggles, topbar, font size scale, and more; `IMAGE` added as a new `file_type` option for design logos

## 2026-04-16 Integration Toolkit API

- New optional `group_id` field on `POST /v3/erp/updates/events` for controlling processing parallelism: events sharing the same `group_id` are processed in order; events with different `group_id` values are processed concurrently (up to 20 concurrent groups per integration)

## 2026-04-16 Message API

- New optional `unlink_mapped_entities` query parameter on `POST /v1/message/threads/{id}/unassign`; when `true`, also removes the unassigned entities from `mapped_entities` on related source entities

## 2026-04-16 Event: Meter Reading Added

- New `contracts` array field added to the `MeterReadingAdded` event payload, providing the full list of hydrated contract entities linked to the meter (supports meters associated with multiple contracts)

## 2026-04-15 Customer Portal API

- New `POST /v2/portal/metering/readings` endpoint added for retrieving paginated meter readings for a specific counter, with optional Handlebars template resolution per reading and per counter entity

## 2026-04-14 Customer Portal API

- New `aggregation_method` field added to consumption items in `GET /v2/portal/consumption` responses, indicating the aggregation method used (values: `sum`, `average`, `max`, `min`)
- New `POST /v3/portal/config/clone` endpoint added for cloning a portal configuration (including pages, settings, email templates, and authentication) from an existing portal

## 2026-04-14 Environments API

- New endpoints added for managing environment variable groups: `GET /v1/environments/groups` (list groups), `PUT /v1/environments/groups/{name}` (create or update a group), `DELETE /v1/environments/groups/{name}` (delete a group)
- New optional `group` and `protected` fields added to environment variables across all endpoints; `group` assigns a variable to a named group, `protected` marks a variable as read-only

## 2026-04-13 Blueprint API

- New `GET /v1/marketplace-listings` endpoint added for listing all marketplace listings for the authenticated organization
- `documentation_link` field removed from marketplace listing responses and request bodies

## 2026-04-13 Email Settings API

- New `POST /v1/email-settings/domain/dns-records:verify` endpoint added for verifying that all DNS records (MX, TXT, CNAME) are correctly configured for a domain
- `POST /v1/email-settings/domain/ns-records:verify` is now deprecated — use the new endpoint for new integrations

## 2026-04-13 User API

- New `image_uri` field added to user groups, supporting profile image URLs and gradient avatar color configuration

## 2026-04-10 Deduplication API

- New asynchronous deduplication endpoints: `POST /v1/deduplicate/job` submits a background job and returns a `jobId`; `GET /v1/deduplicate/jobs/{jobId}` returns the current job status and result

## 2026-04-10 Journey Config API

- New optional `protectedEditable` array field added to journey configurations, listing path patterns (with wildcard support) that remain editable when the journey is in protected (read-only) mode

## 2026-04-09 Automation API

- New `ForwardEmailAction` and `ReplyEmailAction` action types added to automation flows and executions, enabling automated email forwarding and reply workflows
- New `reply_to_sender`, `reply_mode` (`reply_in_thread` or `new_email`), and `mark_as_done` fields added to `SendEmailAction` configuration

## 2026-04-09 Integration Toolkit API

- New `group_by` request field added to `POST /v2/integrations/{integrationId}/monitoring/time-series`, enabling breakdown of time-series buckets by `use_case_type` or `use_case`
- New `breakdown` array returned in each time-series bucket when `group_by` is specified

## 2026-04-09 Workflows Definition API

- New `input_entity` field added to `AutomationTrigger` for email thread triggers, specifying which entity (`thread`, `first_email`, or `last_email`) is used as input for automation and decision tasks

## 2026-04-08 Blueprint API

- New `POST /v3/blueprint-manifest/blueprint:install` endpoint added for installing blueprints using the V3 engine (direct API calls with checkpoint-based resume on failure)
- New `GET /v3/blueprint-manifest/blueprints/{blueprint_id}/lineage` endpoint added for retrieving lineage registry entries mapping source IDs to destination resource IDs
- New `PARTIAL_SUCCESS` status value added to blueprint installation job responses

## 2026-04-08 Webhooks API

- New `POST /v1/webhooks/configs/{configId}/test-oauth` endpoint added for testing the OAuth client credentials configuration of a webhook
- New `deliveryMode` field added to webhook configurations (`json_base64` or `binary_multipart`) to control how file data is delivered for file-triggered webhooks
- New `multipartConfig` field added for specifying form field names when using `binary_multipart` delivery mode

## 2026-04-07 File API

- `GET /v1/files/{id}/public-links` and `DELETE /v1/files/{id}/public-links/{linkId}` endpoints are now implemented — listing and revoking public file links is now available

## 2026-04-06 Event: FileCreated

- New `FileCreated` event type added with required fields: `entity_id`, `filename`, `mime_type`, `size_bytes`, `s3ref`, `version_index`; includes an embedded `file` entity object with file metadata and a `category` field

## 2026-04-03 Email Settings API

- New `GET /v1/email-settings/domain` endpoint added for retrieving all custom email domains configured for the organization

## 2026-04-02 Scheduler API

- New `scheduled_at_from` and `scheduled_at_to` date-time filter fields added to `POST /v1/schedules:search` for filtering schedules by time window
- New `sort` direction field added to schedule search requests (values: `asc`, `desc`; default: `asc`)

## 2026-04-01 Automation API

- New optional `target_workflow` query parameter added to `GET /v1/automation/flows` — filters automations to those targeting a specific workflow by ID

## 2026-04-01 Customer Portal API

- Deprecated `POST /v2/portal/public/user` (portal user creation endpoint)
- New `GET /v3/portal/public/schemas` endpoint added for retrieving entity schemas in the portal context
- New `GET /v3/portal/public/widgets` endpoint added as the v3 replacement for `GET /v2/portal/public-widgets`

## 2026-04-01 Kanban API

- New `task` enum value added to `group_by.field` on Kanban boards (alongside existing `context_entity` and `phase`)

## 2026-04-01 Organization API

- New `GET /v2/organization/feature-settings` endpoint added for retrieving feature flag metadata for the organization UI

## 2026-03-31 Customer Portal API

- New `search_snippets` and `templates_output_highlighted` optional fields added to entity search responses, providing highlighted text snippets for matched fields
- New `highlight` boolean option added to entity search requests to enable search result highlighting

## 2026-03-31 Integration Toolkit API

- New monitoring v2 endpoints: `POST /v2/integrations/{integrationId}/monitoring/events`, `POST /v2/integrations/{integrationId}/monitoring/stats`, `POST /v2/integrations/{integrationId}/monitoring/time-series`, `GET /v2/integrations/{integrationId}/monitoring/events/{eventId}/associated`
- New type generation endpoints: `POST /v1/integrations/{integrationId}/generate-types-preview`, `POST /v1/integrations/{integrationId}/generate-types`, `POST /v1/integrations/{integrationId}/commit-types` — for generating and committing TypeScript type definitions from managed call use cases
- New `type_annotations` and `types_locked` fields added to managed call use cases

## 2026-03-31 Message API

- New spam management endpoints added: `POST /v1/message/messages/{id}/spam`, `POST /v1/message/messages/{id}/unspam`, `POST /v1/message/threads/{id}/spam`, `POST /v1/message/threads/{id}/unspam`
- New `spam` count field added to the `GET /v1/message/messages/unread/{actor}` response

## 2026-03-30 Entity API

- New `exclude_types` query parameter added to the taxonomy classification search endpoint, allowing specific entity types to be excluded from results

## 2026-03-30 Workflows Definition API

- New `partner` optional field added to workflow steps (v1 definitions) and tasks (v2 flow templates), providing partner-specific task display details (`enabled`, `label`, `description`) for partner org users

## 2026-03-27 App API

- New `GET /v1/public/app/{appId}/proxy/{proxyName}/{path}` and `POST /v1/public/app/{appId}/proxy/{proxyName}/{path}` endpoints added for routing requests through a named API proxy configured on the app

## 2026-03-25 Entity API

- New `POST /v1/entity/schemas/{slug}/freeze` and `POST /v1/entity/schemas/{slug}/unfreeze` endpoints added for managing schema version lifecycle
- New `frozen` and `latest` boolean fields added to schema responses; `draft` field is now deprecated
- New `frozen_version` field added to schema versions response; `unpublished` query parameter deprecated in favour of the new `latest` parameter

## 2026-03-25 Workflows Execution API

- New `POST /v2/flows/executions/{execution_id}/tasks/{task_id}/schedule/run-now` endpoint added — cancels the pending schedule for a task and immediately triggers its automation execution

## 2026-03-24 Customer Portal API

- New `GET /v3/portal/widgets` and `POST /v3/portal/widgets` endpoints added for managing portal widgets (v3)
- New `POST /v3/portal/portal/files` endpoint added for uploading files in the portal context

## 2026-03-24 Email Settings API

- New MS Teams channel endpoints added: `POST /v2/channels/msteams/connect`, `POST /v2/channels/msteams/disconnect`, `GET /v2/channels/msteams/status`
- New `teams_enabled` boolean field added to the Outlook connection status response

## 2026-03-24 Kanban API

- New `group_by` field added to Kanban board configuration, enabling tasks to be grouped within each swimlane; supports `context_entity`, `phase`, and `task` grouping options
- New `group_by` field added to `POST /v1/kanban/query/flows:execute` request for grouping task query results

## 2026-03-23 Customer Portal API

- New `domain` parameter accepted as an alternative to `portal_id` across most public portal endpoints, allowing portal identification by domain name
- New `portal_id` field added to portal page objects in responses

## 2026-03-19 Event: InvoiceSimulationRequested

- New `meter` entity object added to the event payload, containing meter details associated with the simulation request

## 2026-03-18 App API

- New optional `secure_proxy` field added to all portal extension hook types (via `PortalExtensionSecureProxy` schema), routing hook HTTP requests through a VPC secure proxy

## 2026-03-18 Customer Portal API

- New `portal_id` parameter added to the admin login-as-user endpoint
- New `evaluate_targeting` boolean field added to the page interpolation request
- Deprecated endpoints: `GET /v2/portal/contract`, `POST /v2/portal/opportunities/search`, `GET /v2/portal/opportunities/searchable-attributes`, `GET /v2/portal/opportunity`, `GET /v2/portal/order`, `GET /v2/portal/request`

## 2026-03-18 Workflows Definition API

- `max_iterations` maximum for decision task loop configuration increased from 10 to 100

## 2026-03-16 Entity API

- New `GET /v2/entity/schemas` endpoint added, supporting `full`, `unpublished`, `exclude`, and `include` query parameters for flexible schema retrieval
- New `include` filter parameter added to `GET /v1/entity/schemas`
- New `_summary` boolean field added to schema response objects, indicating whether the schema is returned as a truncated summary

## 2026-03-16 ERP Integration API

- New `secure_proxy` use case type introduced across all use-case endpoints
- New `GET /v1/integrations/secure-proxies` endpoint lists all secure proxy use cases across integrations
- New `POST /v1/secure-proxy` endpoint proxies HTTP requests through a VPC tunnel using a configured secure proxy use case

## 2026-03-16 Webhooks API

- New optional `secureProxy` object added to webhook configuration — routes webhook HTTP requests through the VPC secure proxy; requires `integration_id` and `use_case_slug` referencing a configured ERP integration secure proxy use case

## 2026-03-12 Blueprint API

- New `POST /v2/blueprint-manifest/blueprints:publish` endpoint added for publishing a blueprint to the marketplace
- New `GET /v2/blueprint-manifest/marketplace/slugs` endpoint added for listing available marketplace slugs from the Webflow CMS

## 2026-03-12 Event: InvoiceSimulationRequested

- New `InvoiceSimulationRequested` event type introduced with fields: `meter_reading_value`, `meter_reading_date`, `customer_number`, `debitor_number`, `billing_group`, and an embedded `contract` entity reference

## 2026-03-11 Access Token API

- New `portal_preview` token type added, enabling tokens scoped for portal preview sessions
- New `portal_user_id` field added to `AccessTokenItem` responses

## 2026-03-11 Pricing API

- **Breaking:** Several fields in `ExternalCatalogPortalRequest` contract context changed type: `installment_amount` changed from `{value, currency}` object to `number`; `balance` changed from `{value, currency}` object to `number`; `customer` changed from an array to a single object; `delivery_address` changed from a single object to an array

## 2026-03-11 Submission API

- `POST /v1/submission/submissions` now returns a response body containing a `submission_id` string (previously returned `201 Created` with no body)
- Error responses (400, 401, 403, 500) are now documented for the submission creation endpoint

## 2026-03-10 Billing Event Entity

- New `invoice_number` string field added to the `billing_event` entity schema

## 2026-03-09 Message API

- New `POST /v1/message/threads/bulk:move` endpoint added for moving multiple threads to a different inbox in a single request
- New `POST /v1/message/threads/bulk:assign` endpoint added for bulk-assigning multiple threads
- New optional `assign_to` and `inbox_id` fields added to the bulk read/unread request payload

## 2026-03-07 GenAI API

- New `POST /v1/genai/search/query:generate` endpoint added — generates an AI-optimized Elasticsearch Lucene query from natural language input; accepts `input`, `schemas`, and `locale` in the request; returns `query`, `confidence`, and `intent` in the response

## 2026-03-05 ERP Integration API

- New `oauth2_password` auth type added to file proxy use case authentication configuration, with `username` and `password` credential fields

## 2026-03-04 File API

- New optional `version_only` query parameter added to `POST /v1/files` and `POST /v2/files` — when `true`, creates a new file version without overwriting top-level entity metadata
- `POST /v2/files` now accepts an array of up to 20 `BatchSaveFileVersionPayload` objects when `version_only=true`, enabling batch version saves in a single request

## 2026-03-03 Customer Portal API

- New `PRODUCT_RECOMMENDATIONS_WIDGET` widget type was added; the new `ProductRecommendationsWidget` schema (extending `TeaserWidget` with a `campaign_id` field) is now available across the `GET /v2/portal/widgets`, `GET /v2/portal/public-widgets`, and `POST /v2/portal/widgets` endpoints

## 2026-03-03 Pricing API External Catalog

- **Breaking:** The `catalog_type` enum values on `POST /integration/external-service` were renamed: `products` → `product` and `products-recommendation` → `product-recommendations`; the corresponding response schema was also renamed from `ExternalCatalogProductsRecommendationResponse` to `ExternalCatalogProductRecommendationsResponse`
- **Breaking:** The `POST /v1/public/integration/{integrationId}/products-recommendation` and `POST /v1/public/external-catalog/products-recommendation` endpoints were renamed to `product-recommendations`; new endpoints at the updated paths are now available
- **Breaking:** The `coupons` field in external catalog responses changed from an array to a single object
- New optional `before_discount_amount_subtotal` fields added to pricing line item responses
- `postal_code` is no longer a required field in availability filter requests

## 2026-03-03 Message API

- New `GET /v1/message/messages/{id}/eml` endpoint was added, returning a `302` redirect to a pre-signed URL for downloading the message as an EML file
- New optional `complete_thread` field was added to message creation and draft endpoints (`POST /v1/message/messages`, `POST /v1/message/drafts`), marking the thread as Done immediately after the message is sent

## 2026-03-02 Blueprint Manifest API

- New `POST /v2/blueprint-manifest/blueprints/{blueprint_id}:format-description` endpoint was added, which formats a blueprint description as markdown using AI (accepts a `text` field, returns `markdown`)
- **Breaking:** `compatible_apps` field was removed from `MarketplaceBlueprint` and replaced by `recommended_apps` across all blueprint endpoints
- New optional fields `docs_url`, `recommended_apps`, `required_features`, and `zip_file_name` were added to all blueprint types (`AppBlueprint`, `CustomBlueprint`, `DeployedBlueprint`, `FileBlueprint`, `MarketplaceBlueprint`)

## 2026-03-02 Workflows Definition API

- New `GET /v2/flows/templates/{flowId}/export` endpoint was added, exporting a flow template with all referenced automations resolved and bundled
- New `POST /v2/flows/templates/import` endpoint was added, importing a flow template from an export payload and creating all referenced automations in the caller's organization
- Two new `due_date_config/type` enum values were added to flow templates: `A_PRECEDING_TASK_COMPLETED` and `ALL_PRECEDING_TASKS_COMPLETED`, enabling task and phase due dates to be relative to predecessor task completion; affects all `/v2/flows/templates` endpoints

## 2026-02-27 Workflows Execution API

- The `assigned_to` field on executions, phases, and tasks now accepts variable assignment objects (`{ variable, value }`) in addition to plain user ID strings, enabling dynamic assignee resolution during workflow execution; affects `POST /v2/flows/executions`, `GET` and `PATCH /v2/flows/executions/{execution_id}`, `PATCH /v2/flows/executions/{execution_id}/phases/{phase_id}`, and task creation/update endpoints

## 2026-02-26 User API

- New passkey authentication and management endpoints were added: `POST /v2/users/public/passkeys:authenticateBegin` and `:authenticateBeginDiscoverable` start a WebAuthn authentication flow; `POST /v2/users/public/passkeys:resolveCredential` resolves user identity from a discoverable assertion; `POST /v2/users/me/passkeys:registerBegin` and `:registerComplete` handle passkey registration; `GET /v2/users/me/passkeys` lists registered passkeys; `DELETE /v2/users/me/passkeys/{credentialId}` removes a passkey
- New `passkey_enabled` boolean field was added to `LoginParameters` responses, indicating whether passkey login is available for the organization

## 2026-02-26 ERP Integration API

- **Breaking:** The `requires_vpc` field in File Proxy use-case configuration is now read-only after creation — it can no longer be set or updated via the API; affects `POST /v1/integrations/{integrationId}/use-cases`, `PUT /v1/integrations/{integrationId}/use-cases/{useCaseId}`, and their v2 equivalents

## 2026-02-26 Workflows Definition API

- `PhaseMarkedInProgress` and `PhaseSkipped` entity sync trigger event values were re-added to flow templates (reverting the 2026-02-23 removal) — affects all `/v2/flows/templates` endpoints

## 2026-02-26 Workflows Execution API

- `PhaseMarkedInProgress` and `PhaseSkipped` entity sync trigger event values were re-added to execution responses (reverting the 2026-02-23 removal); `TaskMarkedOnHold` entity sync trigger event value was also added — affects `POST /v2/flows/executions`, `GET /v2/flows/executions/{execution_id}`, `PATCH /v2/flows/executions/{execution_id}`, and `POST /v2/flows/executions:search`

## 2026-02-25 Access Token API

- New `last_used` field was added to access token responses, indicating the date the token was last used (`YYYY-MM-DD` format, 1-day accuracy); available in `GET /v1/access-tokens`, `POST /v1/access-tokens`, and `DELETE /v1/access-tokens/{id}` responses

## 2026-02-25 Billing API

- **Breaking:** `booking_date` (date) is now a required field when creating or updating billing events — affects `POST /v1/billing/events` and `PATCH /v1/billing/events/{id}`
- **Breaking:** `due_date` on `InstallmentEvent` changed from `date-time` to `date` format
- Six new billing event types were added to the `BillingEvent` union: `payment`, `dunning_fee`, `final_bill`, `bonus`, `correction`, and `custom` — clients parsing event responses should handle these new variants
- New optional fields were added to all billing event types: `direction` (debit/credit), `status` (open/closed), `related_event`, `external_link`, `attachments`, `note`, and `internal_note`

## 2026-02-25 App API

- New `CUSTOM_PAGE` app component type was added — the new `CustomPageComponent` schema includes a required `slug` field (URL route, e.g. `"zapier"`) and optional `nav_label`, `nav_icon`, and `nav_description` navigation fields; supported across all app and app-configuration endpoints

## 2026-02-25 GenAI API

- New `POST /v1/genai/entity/{slug}/{entity_id}/summary` endpoint was added to generate AI summaries for entities, streaming the response via `text/event-stream`; supports optional `language` (`de`/`en`), `variant` (`short`/`detailed`/`action_points`), and `current_summary` parameters

## 2026-02-25 Workflows Definition API

- Automation triggers and tasks in flow templates now support inline configuration: new optional `trigger_config` array on `AutomationTrigger` and new optional `action_config` object on `AutomationTask.automation_config` allow automation flows to be created or updated in place without a pre-existing ID — `automation_id` on triggers and `flow_id` on automation configs are now optional; affects all `/v2/flows/templates` endpoints

## 2026-02-24 ERP Integration API

- **Breaking:** `payload` field on event update endpoints now enforces stricter validation — string payloads require `minLength: 2` and object payloads require `minProperties: 1`; affects `POST /v1/erp/updates/events`, `POST /v2/erp/updates/events`, and `POST /v3/erp/updates/events`
- New `warnings` array was added to mapping simulation responses (`POST /v1/erp/updates/mapping_simulation`, `POST /v2/erp/updates/mapping_simulation`), reporting validation issues about the configuration such as unique ID fields referencing non-indexed attributes

## 2026-02-23 Message API

- New `POST /v2/message/threads/{id}/assign:users` endpoint was added, allowing users to be added or removed from a message thread

## 2026-02-23 Workflows Execution API

- `PhaseMarkedInProgress` and `PhaseSkipped` enum values were removed from the `trigger/event` field in entity sync responses — affects `POST /v2/flows/executions`, `GET /v2/flows/executions/{execution_id}`, `PATCH /v2/flows/executions/{execution_id}`, and `POST /v2/flows/executions:search`

## 2026-02-23 Workflows Definition API

- `PhaseMarkedInProgress` and `PhaseSkipped` enum values were removed from the `entity_sync/trigger/event` field across all flow template endpoints — affects request body of `POST` and `PUT /v2/flows/templates/{flowId}`, and responses of `GET`, `POST`, `PUT /v2/flows/templates`, `POST /v2/flows/templates:search`
- New `TaskMarkedOnHold` trigger event value was added to `entity_sync/trigger/event`, enabling entity sync rules to fire when a task is placed on hold

## 2026-02-23 Customer Portal API

- New `allowed_portal_entities` field was added to portal config request and response schemas — accepts an array of entity slugs (e.g., `contact`, `contract`) to restrict which entity types are accessible in the portal; available across all v2 and v3 portal config endpoints

## 2026-02-23 Automation API

- New `assign-thread` automation action type was added — `AssignThreadAction` and `AssignThreadConfig` schemas allow automations to add or remove assignees from message threads

## 2026-02-23 Meter Entity

- New `me_lo_id` field was added for storing the MeLo-ID (Messlokation) measurement location identifier

## 2026-02-22 Blueprint Manifest API

- New optional `archived` query parameter was added to `GET /v2/blueprint-manifest/blueprints` to filter by archived status
- New optional `archived` field was added to blueprint objects, indicating whether a blueprint is soft-deleted and hidden from the main list

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
