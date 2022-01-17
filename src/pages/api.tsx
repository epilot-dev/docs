import { Redirect } from '@docusaurus/router';
import React from 'react';

function Api(): JSX.Element {
  return <Redirect to="/api/user" />;
}

export default Api;
