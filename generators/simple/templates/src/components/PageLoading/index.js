import React from 'react';
import { Spin, Icon } from 'antd';

const loadingIcon = <Icon type="loading" spin />;

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin indicator={loadingIcon} size="large" />
  </div>
);
