import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formItemLayout, formSubmitLayout } from '@/constants/layout.form';

const FormItem = Form.Item;

@connect(({ sample, loading }) => ({
  sample,
  submitting: loading.effects['sample/saveSample'],
}))
@Form.create()
class SampleForm extends PureComponent {
  state = {
    isNew: true,
  };

  static getDerivedStateFromProps(nextProps) {
    const { match } = nextProps;
    const sampleId = match.params.id;
    return {
      id: sampleId,
      isNew: sampleId == null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch({
      type: 'sample/updateEntity',
      payload: {},
    });

    if (!id) {
      return;
    }

    dispatch({
      type: 'sample/getSample',
      payload: id,
    });
  }

  handleSubmit() {
    const { id } = this.state;
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'sample/saveSample',
          payload: {
            id,
            ...values,
          },
        });
      }
    });
  }

  render() {
    const { submitting } = this.props;
    const {
      sample: { sampleEntity },
      form: { getFieldDecorator },
    } = this.props;
    const { isNew, id } = this.state;

    return (
      <PageHeaderWrapper title={isNew ? '新建示例' : '修改示例'} content="一个基础的表单页面。">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {!isNew && (
              <FormItem {...formItemLayout} label="ID">
                <span className="ant-form-text">{id}</span>
              </FormItem>
            )}
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('name', {
                initialValue: sampleEntity.name,
                rules: [
                  {
                    required: true,
                    message: '名称为必填项',
                  },
                ],
              })(<Input placeholder="示例的名称字段" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="时间">
              {getFieldDecorator('time', {
                initialValue: sampleEntity.time || '2019-01-01 00:00:00',
                rules: [],
              })(<Input placeholder="示例的时间字段" />)}
            </FormItem>
            <FormItem {...formSubmitLayout} style={{ marginTop: 32 }}>
              <Button type="primary" onClick={() => this.handleSubmit()} loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={() => router.goBack()}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleForm;
