import type { IComponent, ICreateFormConfig } from './types';

import { Form, Row, Col, Input } from 'antd';
import { isValidElement, cloneElement, useEffect } from 'react';

import FormItem from '@/components/FormItem';

const useForm = ({
  formConfig: {
    itemSpan = 24,
    form: outerForm,
    showValue = false,
    itemsRequire = false,
    data,
    ...formConfig
  } = {},
  components
}: ICreateFormConfig) => {
  const [localForm] = Form.useForm();
  const form = outerForm || localForm;
  const { getFieldValue } = form;

  const getKey = (key: number) => `key-${key}`;

  // const getSafeVal = compose(defaultTo(-), getFieldValue);

  const convertConfig = (config: IComponent, index: number) => {
    // string
    if (typeof config === 'string') return <span key={getKey(index)}>{config}</span>;

    // undefined null true false
    if (typeof config !== 'object' || config == null) return null;

    // <h1/>
    if (isValidElement(config))
      return (
        <Col span={24} key={getKey(index)}>
          {config}
        </Col>
      );

    // {name: xx, label: qq}
    const {
      span,
      label,
      name,
      require,
      autoFit = false,
      displayOnly = false,
      render = (val) => val,
      placeholder = `请输入${label}`,
      element = <Input allowClear />,
      ...formItemProps
    } = config;

    const localSpan = span ?? itemSpan;
    const localRequire = require ?? itemsRequire;

    const children =
      showValue || displayOnly ? (
        <FormItem label={label} name={name} {...formItemProps}>
          <span>{render(getFieldValue(name || ''))}</span>
        </FormItem>
      ) : (
        <FormItem require={localRequire} label={label} name={name} {...formItemProps}>
          {element && cloneElement(element, { placeholder })}
        </FormItem>
      );

    return (
      <Col
        key={getKey(index)}
        span={autoFit ? undefined : localSpan}
        style={{ flexGrow: autoFit ? 1 : undefined }}
      >
        {children}
      </Col>
    );
  };

  const createJSX = (arr: IComponent[]) => arr.map(convertConfig);

  const getComponents = () => {
    if (typeof components === 'function') return components(form);

    return components;
  };

  useEffect(() => form.setFieldsValue(data), [data, form]);

  const formStructure = (
    <Form form={form} {...formConfig}>
      <Form.Item shouldUpdate noStyle>
        {() => <Row>{createJSX(getComponents())}</Row>}
      </Form.Item>
    </Form>
  );

  return { form, formStructure };
};
export default useForm;