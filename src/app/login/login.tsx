import React, { useState } from "react";

import { Input, Button, Modal, Translate } from '@shared/ui';
import { ApiResponse } from "@shared/interfaces";
import { userApi } from '@shared/api';
import { useAbortController, useTranslate } from "@shared/hooks";
import './login.less';

export function Login() {
  const translate = useTranslate();
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

    userApi.login(data, loginAbort.signal())
      .catch((res: ApiResponse) => {
        if (res.aborted) {
          return;
        }

        if (res.status === 401) {
          Modal.alert({
            title: translate('login.failedTitle'),
            text: translate('login.failedText')
          });
        }
        
        setLoading(false);
      });
  }

  function canSubmit(): boolean {
    return !!(data.email.trim() && data.password.trim());
  }
  
  return (
    <form className="login" autoCapitalize="off" onSubmit={handleSubmit}>
      <div className="login-header">
        <Translate value="login.header" />
      </div>
      <Input
        name="email"
        placeholder={translate('login.emailHolder')}
        value={data.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        placeholder={translate('login.passwordHolder')}
        type="password"
        value={data.password}
        onChange={handleChange}
      />
      <Button
        text={<Translate value="login.submit" />} 
        disabled={!canSubmit()}
        loading={loading}
      />
    </form>
  );
}
