import { IconComponentsMap } from '@epilot360/icons';
import Icon from '@site/src/components/Icon';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import CodeBlock from '@theme/CodeBlock';
import React, { useState } from 'react';

import styles from './EntitySchemaViewer.module.css';
import './mosaic-scoped.css';

interface EntitySchemaViewerProps {
  schema: string;
  displayName: string;
  description: string;
  apiLink?: string;
}

const EntitySchemaViewer: React.FC<EntitySchemaViewerProps> = ({ schema, displayName, description, apiLink }) => {
  const [exampleData, setExampleData] = useState<string>('');
  const [schemaData, setSchemaData] = useState<string>('');
  const [schemaObject, setSchemaObject] = useState<unknown>(null);
  const [activeTab, setActiveTab] = useState<'none' | 'example' | 'schema' | 'visual'>('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExample = async () => {
    if (activeTab === 'example') {
      setActiveTab('none');

      return;
    }

    if (exampleData) {
      setActiveTab('example');

      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/schemas/${schema}-example.json`);
      if (!response.ok) throw new Error('Failed to load example');
      const json = await response.json();
      setExampleData(JSON.stringify(json, null, 2));
      setActiveTab('example');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSchema = async () => {
    if (activeTab === 'schema') {
      setActiveTab('none');

      return;
    }

    if (schemaData) {
      setActiveTab('schema');

      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/schemas/${schema}-jsonschema.json`);
      if (!response.ok) throw new Error('Failed to load schema');
      const json = await response.json();
      setSchemaData(JSON.stringify(json, null, 2));
      setSchemaObject(json);
      setActiveTab('schema');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadVisual = async () => {
    if (activeTab === 'visual') {
      setActiveTab('none');

      return;
    }

    if (schemaObject) {
      setActiveTab('visual');

      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/schemas/${schema}-jsonschema.json`);
      if (!response.ok) throw new Error('Failed to load schema');
      const json = await response.json();
      setSchemaObject(json);
      if (!schemaData) {
        setSchemaData(JSON.stringify(json, null, 2));
      }
      setActiveTab('visual');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const icon = schema in IconComponentsMap ? schema : 'entity';

  return (
    <div className={`${styles.container} entitySchemaViewer`}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {icon && <Icon name={icon as keyof typeof IconComponentsMap} size={24} />}
          <h4 className={styles.entityTitle}>{displayName}</h4>
        </div>
        <p className={styles.description}>{description}</p>
        {apiLink && (
          <div className={styles.apiLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <a href={apiLink} className={styles.apiLinkText}>
              API Reference
            </a>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={loadExample}
            className={`${styles.button} ${activeTab === 'example' ? styles.buttonActive : ''}`}
            disabled={loading}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Sample
          </button>

          <button
            type="button"
            onClick={loadSchema}
            className={`${styles.button} ${activeTab === 'schema' ? styles.buttonActive : ''}`}
            disabled={loading}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            JSON Schema
          </button>

          <button
            type="button"
            onClick={loadVisual}
            className={`${styles.button} ${activeTab === 'visual' ? styles.buttonActive : ''}`}
            disabled={loading}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="9" cy="7" r="1" fill="currentColor" />
              <circle cx="9" cy="12" r="1" fill="currentColor" />
              <circle cx="9" cy="17" r="1" fill="currentColor" />
              <line x1="13" y1="7" x2="21" y2="7" />
              <line x1="13" y1="12" x2="21" y2="12" />
              <line x1="13" y1="17" x2="21" y2="17" />
            </svg>
            Fields
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {activeTab === 'example' && exampleData && (
        <div className={styles.codeContainer}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>{schema}-example.json</span>
            <a
              href={`/schemas/${schema}-example.json`}
              download
              className={styles.downloadButton}
              title="Download example JSON"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </div>
          <CodeBlock language="json" showLineNumbers>
            {exampleData}
          </CodeBlock>
        </div>
      )}

      {activeTab === 'schema' && schemaData && (
        <div className={styles.codeContainer}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>{schema}-jsonschema.json</span>
            <a
              href={`/schemas/${schema}-jsonschema.json`}
              download
              className={styles.downloadButton}
              title="Download JSON Schema"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </div>
          <CodeBlock language="json" showLineNumbers>
            {schemaData}
          </CodeBlock>
        </div>
      )}

      {activeTab === 'visual' && schemaObject && (
        <div className={`stoplight-viewer ${styles.visualContainer}`}>
          <MosaicProvider>
            <JsonSchemaViewer schema={schemaObject} defaultExpandedDepth={2} skipTopLevelDescription={true} />
          </MosaicProvider>
        </div>
      )}
    </div>
  );
};

export default EntitySchemaViewer;
