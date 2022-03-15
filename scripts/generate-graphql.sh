#!/bin/sh

rm -rf graphql
mkdir graphql
npx docusaurus graphql-to-doc:customer-portal -f
