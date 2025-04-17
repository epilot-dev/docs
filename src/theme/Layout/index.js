/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// The Layout was swizzled (modified) to allwo for hiding the navbar using hideNavBar.
// The ability to do such was added in later versions of Docusaurus, so it's likely you can
// just delete this file without any concerns if you're upgrading Docusaurus.

import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ThemeClassNames, useKeyboardNavigation } from '@docusaurus/theme-common';
import AnnouncementBar from '@theme/AnnouncementBar';
import ErrorPageContent from '@theme/ErrorPageContent';
import Footer from '@theme/Footer';
import LayoutHead from '@theme/LayoutHead';
import LayoutProviders from '@theme/LayoutProviders';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';
import clsx from 'clsx';
import React from 'react';
import './styles.css';

function Layout(props) {
  const { children, noFooter, wrapperClassName, pageClassName, hideNavBar } = props;
  useKeyboardNavigation();

  return (
    <LayoutProviders>
      <LayoutHead {...props} />

      <SkipToContent />

      <AnnouncementBar />

      {!hideNavBar && <Navbar />}

      <div className={clsx(ThemeClassNames.wrapper.main, wrapperClassName, pageClassName)}>
        <ErrorBoundary fallback={ErrorPageContent}>{children}</ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  );
}

export default Layout;
