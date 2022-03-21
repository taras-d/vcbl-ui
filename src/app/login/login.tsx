import React, { useState } from "react";

import { Input, Button, Modal } from '@shared/ui';
import { ApiResponse } from "@shared/interfaces";
import { authApi } from '@shared/api';
import { useAbortController } from "@shared/hooks";
import { tkey } from "@shared/utils";
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
          Modal.alert(
            tkey('login_failed_title'),
            tkey('login_failed_text')
          );
        }
        
        setLoading(false);
      });
  }

  function canSubmit(): boolean {
    return !!(data.email.trim() && data.password.trim());
  }
  
  return (
    <form className="login" autoCapitalize="off" onSubmit={handleSubmit}>
      <div className="login-header">{tkey('login_header')}</div>
      <Input
        name="email"
        placeholder={tkey('login_email')}
        value={data.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        placeholder={tkey('login_password')}
        type="password"
        value={data.password}
        onChange={handleChange}
      />
      <Button text={tkey('login_submit')} disabled={!canSubmit()} loading={loading}/>
    </form>
  );
}
