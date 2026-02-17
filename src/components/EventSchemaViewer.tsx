import { IconComponentsMap } from '@epilot360/icons';
import Icon from '@site/src/components/Icon';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import React, { useEffect, useState } from 'react';

import CollapsibleJsonViewer from './CollapsibleJsonViewer';
import styles from './EntitySchemaViewer.module.css';
import './mosaic-scoped.css';

interface EventConfig {
  event_name: string;
  event_title: string;
  event_description: string;
  event_tags?: string[];
}

interface EventSchemaViewerProps {
  event: string;
  apiLink?: string;
  icon?: string;
}

const EventSchemaViewer: React.FC<EventSchemaViewerProps> = ({ event, apiLink, icon = 'entity' }) => {
  const [sampleData, setSampleData] = useState<string>('');
  const [configData, setConfigData] = useState<string>('');
  const [schemaData, setSchemaData] = useState<string>('');
  const [schemaObject, setSchemaObject] = useState<unknown>(null);
  const [activeTab, setActiveTab] = useState<'none' | 'sample' | 'config' | 'schema' | 'visual'>('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventConfig, setEventConfig] = useState<EventConfig | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch(`/events/${event}.config.json`);
        if (response.ok) {
          const json: EventConfig = await response.json();
          setEventConfig(json);
          setConfigData(JSON.stringify(json, null, 2));
        }
      } catch {
        // Config loading is optional, fail silently
      }
    };
    loadConfig();
  }, [event]);

  const loadSample = async () => {
    if (activeTab === 'sample') {
      setActiveTab('none');

      return;
    }

    if (sampleData) {
      setActiveTab('sample');

      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/events/${event}.sample.json`);
      if (!response.ok) throw new Error('Failed to load sample');
      const json = await response.json();
      setSampleData(JSON.stringify(json, null, 2));
      setActiveTab('sample');
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
      const response = await fetch(`/events/${event}.schema.json`);
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
      const response = await fetch(`/events/${event}.schema.json`);
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

  const displayName = eventConfig?.event_title ?? event;
  const description = eventConfig?.event_description ?? '';

  return (
    <div id={event} className={`${styles.container} entitySchemaViewer`}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {icon && <Icon name={icon as keyof typeof IconComponentsMap} size={24} />}
          <h4 className={styles.entityTitle}>{displayName}</h4>
          <code className={styles.eventName}>{event}</code>
          <a href={`#${event}`} className={styles.anchorLink} aria-label={`Link to ${displayName}`}>
            #
          </a>
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
            onClick={loadSample}
            className={`${styles.button} ${activeTab === 'sample' ? styles.buttonActive : ''}`}
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

      {activeTab === 'sample' && sampleData && (
        <CollapsibleJsonViewer
          data={sampleData}
          fileName={`${event}.sample.json`}
          downloadUrl={`/events/${event}.sample.json`}
          defaultFoldLevel={1}
        />
      )}

      {activeTab === 'config' && configData && (
        <CollapsibleJsonViewer
          data={configData}
          fileName={`${event}.config.json`}
          downloadUrl={`/events/${event}.config.json`}
          defaultFoldLevel={1}
        />
      )}

      {activeTab === 'schema' && schemaData && (
        <CollapsibleJsonViewer
          data={schemaData}
          fileName={`${event}.schema.json`}
          downloadUrl={`/events/${event}.schema.json`}
          defaultFoldLevel={Infinity}
        />
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

export default EventSchemaViewer;
