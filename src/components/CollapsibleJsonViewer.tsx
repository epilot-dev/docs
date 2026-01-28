import { useColorMode } from '@docusaurus/theme-common';
import Editor from '@monaco-editor/react';
import React, { useRef, useState, useCallback } from 'react';

import styles from './CollapsibleJsonViewer.module.css';

interface CollapsibleJsonViewerProps {
  data: string;
  fileName: string;
  downloadUrl: string;
  defaultFoldLevel?: number; // 0 = all collapsed, 1 = first level expanded, Infinity = all expanded
}

const CollapsibleJsonViewer: React.FC<CollapsibleJsonViewerProps> = ({
  data,
  fileName,
  downloadUrl,
  defaultFoldLevel = 1,
}) => {
  const editorRef = useRef<any>(null);
  const [isFoldingAll, setIsFoldingAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const { colorMode } = useColorMode();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Apply default folding based on defaultFoldLevel prop
    setTimeout(() => {
      if (defaultFoldLevel === Infinity) {
        // Expand all
        editor.getAction('editor.unfoldAll').run();
      } else if (defaultFoldLevel === 0) {
        // Collapse all
        editor.getAction('editor.foldAll').run();
      } else {
        // Fold all first
        editor.getAction('editor.foldAll').run();

        // Then unfold to specified level
        setTimeout(() => {
          const model = editor.getModel();
          if (model) {
            // Unfold the root
            editor.setPosition({ lineNumber: 1, column: 1 });
            editor.getAction('editor.unfold').run();

            // If level > 1, unfold additional levels
            if (defaultFoldLevel > 1) {
              for (let i = 1; i < defaultFoldLevel; i++) {
                editor.trigger('fold', 'editor.unfoldRecursively', {});
              }
            }
          }
        }, 50);
      }
    }, 100);
  };

  const expandAll = useCallback(() => {
    if (editorRef.current) {
      setIsFoldingAll(true);
      editorRef.current.getAction('editor.unfoldAll').run();
      setTimeout(() => setIsFoldingAll(false), 100);
    }
  }, []);

  const collapseAll = useCallback(() => {
    if (editorRef.current) {
      setIsFoldingAll(true);
      // Fold all first
      editorRef.current.getAction('editor.foldAll').run();

      // Then unfold the first level
      setTimeout(() => {
        const model = editorRef.current.getModel();
        if (model) {
          editorRef.current.setPosition({ lineNumber: 1, column: 1 });
          editorRef.current.getAction('editor.unfold').run();
        }
        setIsFoldingAll(false);
      }, 50);
    }
  }, []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.fileName}>{fileName}</span>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={expandAll}
            className={styles.controlButton}
            title="Expand all"
            disabled={isFoldingAll}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className={styles.controlButton}
            title="Collapse all"
            disabled={isFoldingAll}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 11 12 6 7 11" />
              <polyline points="17 18 12 13 7 18" />
            </svg>
            Collapse All
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className={styles.controlButton}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? (
              <React.Fragment>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </React.Fragment>
            ) : (
              <React.Fragment>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </React.Fragment>
            )}
          </button>
          <a href={downloadUrl} download className={styles.downloadButton} title="Download JSON">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </a>
        </div>
      </div>
      <div className={styles.editorWrapper}>
        <Editor
          height="600px"
          defaultLanguage="json"
          value={data}
          theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
          onMount={handleEditorDidMount}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'off',
            folding: true,
            foldingStrategy: 'indentation',
            renderLineHighlight: 'none',
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            fontSize: 13,
            fontFamily:
              getComputedStyle(document.documentElement).getPropertyValue('--ifm-font-family-monospace').trim() ||
              'monospace',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CollapsibleJsonViewer;
