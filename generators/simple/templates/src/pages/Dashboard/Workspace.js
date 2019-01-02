import React, { Component } from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Workspace.less';

class Workspace extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 600);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { loading } = this.state;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <Card loading={loading}>
              <Card.Meta
                title="Card A"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec molestie est. Cras porta, justo ut accumsan cursus, velit justo lobortis lacus neque a risus."
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card loading={loading}>
              <Card.Meta
                title="Card B"
                description="Nam nec massa vel odio vulputate malesuada. Maecenas blandit ligula eu leo dictum pharetra. Nunc nec lorem in augue venenatis rhoncus ac eu urna."
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card loading={loading}>
              <Card.Meta
                title="Card C"
                description="Aliquam a lectus a velit viverra rhoncus at eu sem. Aliquam diam urna, aliquet sed nisl vitae, suscipit lobortis justo. Nunc rhoncus placerat viverra."
              />
            </Card>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.welcomeCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <Tabs.TabPane tab="Intro" key="views">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dolor arcu,
                  eleifend vel euismod venenatis, facilisis quis nulla. Mauris ut leo a ipsum
                  laoreet laoreet. Donec sodales nisi non pulvinar aliquam. Pellentesque imperdiet
                  tellus ac orci hendrerit, vitae facilisis nisl consectetur. Morbi ac diam vitae
                  tortor feugiat congue non quis felis. Mauris libero ex, volutpat vitae massa non,
                  facilisis imperdiet leo. Maecenas venenatis lacinia porttitor. Vestibulum ut nisi
                  bibendum, efficitur quam non, pretium nibh. Vestibulum sit amet libero erat.
                </p>
                <p>
                  Nulla sagittis fermentum ipsum vitae eleifend. Suspendisse convallis a magna vel
                  scelerisque. Sed at venenatis elit, ut molestie nunc. Duis gravida mattis cursus.
                  Aliquam non mauris eu nulla varius fringilla. Quisque non purus arcu. Aenean
                  finibus dolor lacus, eget pharetra nibh finibus vel. Curabitur consequat semper
                  velit nec commodo. Morbi rutrum massa mauris, at maximus odio venenatis sit amet.
                  Suspendisse potenti. Mauris ac turpis augue.
                </p>
                <p>
                  Aenean aliquet tortor quis consectetur elementum. Donec vitae lacinia augue.
                  Phasellus pellentesque tincidunt felis eget egestas. Duis lorem augue, dignissim
                  eget bibendum eget, eleifend sit amet urna. Aenean faucibus ante tempor velit
                  elementum, sit amet convallis magna consectetur. Donec mollis elementum velit, in
                  consequat sem posuere quis. Integer eget viverra ex. Duis sed massa quis ante
                  sollicitudin dictum eget ut erat. Nam at nisl turpis. Curabitur tempus et neque eu
                  laoreet. Sed sed aliquet felis. Maecenas vel viverra augue. Vestibulum sit amet
                  lorem at sem lobortis tristique.
                </p>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Workspace;
