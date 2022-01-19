#!/bin/sh

npx mr-pdf \
  --initialDocURLs="https://docs.epilot.io/docs/intro" \
  --contentSelector="article" \
#  --disableTOC \
  --paginationSelector=".pagination-nav__item--next > a" \
  --excludeSelectors=".margin-vert--xl a,.theme-doc-footer-edit-meta-row,.theme-doc-toc-mobile" \
  --pdfMargin="50,80,50,80" \
  --cssStyle "body {zoom: .8;}" \
  --coverImage="https://docs.epilot.io/img/logo.png" \
  --coverTitle="Developer Handbook" \
  --outputPDFFilename "epilot-docs.pdf"
