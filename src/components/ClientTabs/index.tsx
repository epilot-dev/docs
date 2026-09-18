import Tabs from '@theme/Tabs';
import React, { Children, isValidElement } from 'react';

import { ChatGPTIcon, ClaudeIcon, CodexIcon, PlugTabIcon } from '../ClientIcons';
import styles from './styles.module.css';

/**
 * A segmented-control style switcher for AI clients, built on the Docusaurus Tabs component.
 * Use it with regular <TabItem> children; the icon is picked from the TabItem's `value`.
 *
 * Tab choice is shared across pages through the `ai-client` group id, so a reader who picks
 * ChatGPT once sees ChatGPT instructions everywhere.
 */

const icons: Record<string, () => JSX.Element> = {
  claude: ClaudeIcon,
  openai: ChatGPTIcon,
  chatgpt: ChatGPTIcon,
  codex: CodexIcon,
  other: PlugTabIcon,
};

type TabItemProps = { value: string; label?: string; default?: boolean };

export default function ClientTabs({ children }: { children: React.ReactNode }): JSX.Element {
  const values = Children.toArray(children)
    .filter((child): child is React.ReactElement<TabItemProps> => isValidElement(child))
    .map((child) => {
      const { value, label } = child.props;
      const Icon = icons[value];
      return {
        value,
        label: (
          <>
            {Icon ? (
              <span className={styles.icon}>
                <Icon />
              </span>
            ) : null}
            <span>{label ?? value}</span>
          </>
        ),
      };
    });

  return (
    <Tabs className={styles.tabs} groupId="ai-client" values={values}>
      {children}
    </Tabs>
  );
}
