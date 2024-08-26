import { Button } from 'antd';

export default function Home() {
  return (
    <section>
      <h1>Welcome! </h1>
      <div className="button_welcome_wrapper">
        <Button type="primary">Sign Up</Button>
        <Button type="primary">Sign In</Button>
      </div>
    </section>
  );
}
