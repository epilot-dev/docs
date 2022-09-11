# Epilot Developer Portal

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Quick Start

```
npm install
npm start
```

The start command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Deployment

The documentation website is hosted by AWS Amplify. All changes merged to the `main` branch are automatically deployed to [docs.epilot.io](https://docs.epilot.io/)

## Documenting APIs Locally

When documenting your APIs, it's possible to perform changes and eval how they look within the docs portal while running locally.

For that, all you need to do is follow the instructions below:

1. Point your API spec on the file `docusaurus.config.js` to your localhost: `http://localhost:3001/openapi.json`
2. `npm start` to run the docs portal locally
3. `npm run swagger-ui:watch` to serve your api docs locally on your API project
4. Finally to bypass CORS you will want to get this Chrome [extension](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc)

When you are done, just deploy your `openapi.yml` as you normally would. And don't forget to update your client sdk [here](https://github.com/epilot-dev/sdk-js).
