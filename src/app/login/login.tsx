import React, { useState } from "react"

import { Input, Button } from '@shared/ui';
import './login.less';

export function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target
    setData(values => {
      return { ...values, [target.name]: target.value };
    });
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    setLoading(true);
  }

  function canSubmit(): boolean {
    return !!(data.email.trim() && data.password.trim());
  }
  
  return (
    <form className="login" autoCapitalize="off" onSubmit={handleSubmit}>
      <div className="login-header">Vocabulary</div>
      <Input
        name="email"
        value={data.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        value={data.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <Button text="Login" disabled={!canSubmit()} loading={loading}/>
    </form>
  );
}