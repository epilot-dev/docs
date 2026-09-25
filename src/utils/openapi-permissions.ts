/**
 * Renders the `x-epilot-permissions` OpenAPI extension into operation descriptions,
 * so the API reference shows which permissions (role grants) each operation requires.
 *
 * Redoc ignores unknown `x-` extensions, so we prepend a short markdown block to the
 * operation description instead. The extension is a list of grants that are all required:
 *
 *   x-epilot-permissions:
 *     - action: entity:create
 *       resource: '{slug}'
 *     - anyOf:
 *         - action: workflow:execution:task:update
 *         - action: workflow:execution:task:update_assigned
 *
 * An empty list means no specific grant is needed (any authenticated caller).
 */

export const PERMISSIONS_EXTENSION = 'x-epilot-permissions';

export const PERMISSIONS_REFERENCE_URL = '/docs/auth/grant-actions';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

export interface Grant {
  action: string;
  resource?: string;
}

export type PermissionRequirement = Grant | { anyOf: Grant[] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OpenAPIDocument = { paths?: Record<string, any> };

const isGrant = (value: unknown): value is Grant =>
  typeof value === 'object' && value !== null && typeof (value as Grant).action === 'string';

const formatGrant = (grant: Grant) =>
  grant.resource ? `\`${grant.action}\` on \`${grant.resource}\`` : `\`${grant.action}\``;

const formatRequirement = (requirement: unknown): string | null => {
  if (isGrant(requirement)) {
    return formatGrant(requirement);
  }

  const anyOf = (requirement as { anyOf?: unknown })?.anyOf;

  if (Array.isArray(anyOf)) {
    const grants = anyOf.filter(isGrant).map(formatGrant);

    return grants.length ? `one of ${grants.join(' or ')}` : null;
  }

  return null;
};

/**
 * Returns the markdown shown at the top of an operation description,
 * or null when the operation does not declare its permissions.
 */
export const formatPermissions = (permissions: unknown): string | null => {
  if (!Array.isArray(permissions)) {
    return null;
  }

  const label = `**[Required permissions](${PERMISSIONS_REFERENCE_URL}):**`;

  if (permissions.length === 0) {
    return `> ${label} none – any authenticated caller`;
  }

  const requirements = permissions.map(formatRequirement).filter(Boolean);

  if (!requirements.length) {
    return null;
  }

  return `> ${label} ${requirements.join(' and ')}`;
};

/**
 * Returns a copy of the spec with required permissions rendered into each operation description.
 */
export const enrichSpecWithPermissions = <T extends OpenAPIDocument>(spec: T): T => {
  if (!spec?.paths) {
    return spec;
  }

  const paths = Object.fromEntries(
    Object.entries(spec.paths).map(([path, pathItem]) => {
      if (!pathItem || typeof pathItem !== 'object') {
        return [path, pathItem];
      }

      const enrichedPathItem = { ...pathItem };

      for (const method of HTTP_METHODS) {
        const operation = pathItem[method];
        const permissions = formatPermissions(operation?.[PERMISSIONS_EXTENSION]);

        if (permissions) {
          enrichedPathItem[method] = {
            ...operation,
            description: [permissions, operation.description].filter(Boolean).join('\n\n'),
          };
        }
      }

      return [path, enrichedPathItem];
    }),
  );

  return { ...spec, paths };
};
