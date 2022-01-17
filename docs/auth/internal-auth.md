---
sidebar_position: 4
---

# Internal Auth

[[API Docs](/api/internal-auth)]
[[SDK](https://www.npmjs.com/package/@epilot/internal-auth)]

To facilitate backend microservices calling each other, we provide an internal identity provider called [Internal Auth API](/api/internal-auth)

The API works by converting the caller's IAM role to a valid JWT token accepted by the API Gateway Authorizer.

API calls must be called using a signed [AWS SigV4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) request.

## Usage

```sh
npm install --save @epilot/internal-auth
```

To be able to get internal tokens, your runtime role must have invoke permissions to this API.

```yaml
# SAM example
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Policies:
      - Statement:
        - Effect: Allow
          Action: execute-api:Invoke
          Resource:
            - arn:aws:execute-api:eu-central-1:*:*/*/GET/v1/internal-auth/auth # internal auth api
            - arn:aws:execute-api:eu-central-1:*:*/*/GET/v?/mock-api/* # api you want to call
```

Call the API to obtain your token

```js
import { getToken } from '@epilot/internal-auth'

const token = await getToken()
```

## Example Token

```json
{
  "callerIdentity": "arn:aws:sts::912468240823:assumed-role/ep_prod_access_admin/awsmfa_20210225T193753",
  "policies": [
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": "*",
          "Resource": "*"
        }
      ]
    }
  ],
  "iss": "https://internal-auth.sls.epilot.io/v1/internal-auth",
  "iat": 1614278397,
  "exp": 1614281997
}
```

##  Links

- Internal Auth package: https://www.npmjs.com/package/@epilot/internal-auth