import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Codetrial',
          title: 'Codetrial',
          href: 'https://codetrial.github.io/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/codetrial/generator-antd-pro',
          blankTarget: true,
        },
        {
          key: 'Felix Yang',
          title: 'Felix Yang',
          href: 'https://felixpy.com/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 Yo Antd Pro All Rights Reserved
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
