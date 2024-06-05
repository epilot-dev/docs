---
sidebar_position: 6
---
# Integrating GIS Data
While usually updating the address suggestions file from the Journey Builder UI there might be cases to automate this by utilising our APIs.
This example provides guidelines for integrating the GIS (Geo Information System) data with the epilot. The integration focuses on automating the process of uploading address information within a CSV file into epilot and using this data for address auto-complete functionality within journey blocks.

The process involves:
1. **Uploading a CSV File**: Upload a CSV file containing the new address information.
2. **Validating Address Data**: Validate the address data of the newly uploaded file
3. **Configuring Journey Settings**: Attach the validated file to the journey configuration, so it's used in the address auto-complete functionality.

Follow the steps outlined in the detailed instructions below to implement this integration.

## Prerequisites
Please make sure to have the following parts set up already:
- The CSV template downloaded. You can find it [here](https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/shared/address-suggestions-file-template.csv)
- A Journey with an initial CSV file attached and an Address or Availability Block configured to use that CSV file
- An Access Token setup with the permissions to work with the [File API](https://docs.epilot.io/api/file/#tag/files), [Address Suggestions API](https://docs.epilot.io/api/address-suggestions), and [Journey API](https://docs.epilot.io/api/journey)

## Steps to Integrate GIS data with epilot
### 1. Upload the CSV File
To automate the uploading of a CSV file containing address information, use the [File API](https://docs.epilot.io/api/file/#tag/files). This API allows the CSV file to be uploaded programmatically without manual intervention. 

**Tip:**
If you use JavaScript, you can use our [epilot sdk](https://github.com/epilot-dev/sdk-js) to invoke the APIs via the sdk clients.

**Required Steps:**  
There are 3 steps required to have the address suggestions file in the epilot ecosystem:
1. Get a presigned URL in order to upload the file to an S3 Bucket via the [uploadFile Endpoint](https://docs.epilot.io/api/file#tag/files/operation/uploadFile)
```shell
curl --location --request POST 'https://file.sls.epilot.io/v1/files/upload' \
--header 'Authorization: Bearer <AUTH-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "filename": "<FILE-NAME>.csv",
  "mime_type": "text/csv"
}'
```
2. Upload the file via the previously received presigned URL (`upload_url`)
```shell
curl --location --request PUT '<UPLOAD-URL>' \
--header 'Content-Type: text/csv' \
--data-binary '@<PATH-TO-THE-FILE>.csv'
```
3. Persist the uploaded file and create a file entity via the [saveFile Endpoint](https://docs.epilot.io/api/file#tag/files/operation/saveFile). Use the returned `s3ref` from the first request.
```shell
curl --location --request POST 'https://file.sls.epilot.io/v1/files' \
--header 'Authorization: Bearer <AUTH-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "s3ref": <S3REF-OBJECT>,
    "filename": "<FILE-NAME>.csv",
    "access_control": "private",
    "_tags": [
        "address-suggestions"
    ]
}'
```

### 2. Validate the CSV File
After uploading the CSV file, use the [Address Suggestions API](https://docs.epilot.io/api/address-suggestions#tag/Addresses-API/operation/validateAddresses) to validate the address data contained within the file.

This ensures that we provide correct address suggestions in Address or Availability Blocks.

**Required Steps:**  
1. Get the `public_url` from the response of the `saveFile` request (this shouldn't include "temp" in the path)
2. Call the [validateFile Endpoint](https://docs.epilot.io/api/address-suggestions#tag/Addresses-API/operation/validateAddresses) by passing the `public_url` value as a query parameter.
3. If that call responds with a `200` status code, proceed with the next section, if not adjust the file according to the reponse.

```shell
curl --location --request GET 'https://address-suggestions-api.sls.epilot.io/v1/suggestions:validate?s3FileUrl=<PUBLIC-URL>' \
--header 'Authorization: Bearer <AUTH-TOKEN>'
```

### 3. Attach the file to the Journey
Finally, link the validated CSV file to your journey using the Journey API.

**Required Steps:**
1. Call the [patchUpdateJourney Endpoint](https://docs.epilot.io/api/journey#tag/Journeys/operation/patchUpdateJourney) by passing the journey id you would like to update, with the value of the `public_url` under the property name `settings.addressSuggestionsFileUrl`.

```shell
curl --location --request PATCH 'https://journey-config.sls.epilot.io/v1/journey/configuration' \
--header 'Authorization: Bearer <AUTH-TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "journeyId": "<JOURNEY-ID>",
  "settings.addressSuggestionsFileUrl": "<PUBLIC-URL>"
}'
```

**Tip**
You can get the journey id by opening the journey in a new tab from the Journey Builder

## Additional Resources
For more detailed information on each API and additional configuration options, please refer to the [epilot dev center](https://docs.epilot.io/docs/intro).









