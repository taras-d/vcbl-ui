import React, { useState } from "react";

import { Input, Button, Modal } from '@shared/ui';
import { ApiResponse } from "@shared/interfaces";
import { authApi } from '@shared/api';
import { useAbortController } from "@shared/hooks";
import './login.less';

export function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const loginAbort = useAbortController();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target
    setData(values => {
      return { ...values, [target.name]: target.value };
    });
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    setLoading(true);

    event.preventDefault();

    authApi.login(data, loginAbort.signal())
      .catch((res: ApiResponse) => {
        if (res.aborted) {
          return;
        }

        if (res.status === 401) {
          Modal.alert('Login failed', 'Email or password incorrect');
        }
        
        setLoading(false);
      });
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
