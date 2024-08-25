import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import { Form, Button, Input } from 'antd';
import styles from './SignForm.module.css';

export type FieldType = {
  email?: string;
  password?: string;
};

type Props = {
  onFinish: (values: FieldType) => void;
};

export function SignForm({ onFinish }: Props) {
  return (
    <Form name="signup" className={styles.SignForm} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Please provide a valid email',
          },
          { required: true, message: 'Please provide your email' },
        ]}
      >
        <Input autoFocus placeholder="Email" />
      </Form.Item>
      <FormItem<FieldType>
        label="Password"
        name="password"
        rules={[
          { min: 6, message: 'Should be min 6 symbols' },
          { required: true, message: 'Please input your password!' },
        ]}
      >
        <Password placeholder="Password" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
}

export default SignForm;
