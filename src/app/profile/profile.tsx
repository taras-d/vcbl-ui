import React, { useMemo, useState } from 'react';

import { Input, Select, Button, } from '@shared/ui';
import { currentUser, formatDate, language, tkey } from '@shared/utils';
import { authApi } from '@shared/api/auth-api';
import { TranslateLang } from '@shared/interfaces';

import './profile.less';

export function Profile() {
  const [theme, setTheme] = useState('default');

  const user = currentUser.user;

  const [created, updated] = useMemo(() => {
    return [formatDate(user.createdAt), formatDate(user.updatedAt)];
  }, []);

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    language.set(event.target.value as TranslateLang);
  }

  function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setTheme(event.target.value);
  }

  function handleLogoutClick(): void {
    authApi.logout();
  }

  return (
    <div className="profile">
      <div className="row">
        <div className="col-3">{tkey('profile.email')}</div>
        <div className="col-9">
          <Input defaultValue={user.email} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile.created')}</div>
        <div className="col-9">
          <Input defaultValue={created} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile.updated')}</div>
        <div className="col-9">
          <Input defaultValue={updated} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile.lang')}</div>
        <div className="col-9">
          <Select value={language.get()} onChange={handleLanguageChange}>
            <option value="en">{tkey('profile.langEn')}</option>
            <option value="uk">{tkey('profile.langUk')}</option>
          </Select>
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile.theme')}</div>
        <div className="col-9">
          <Select value={theme} onChange={handleThemeChange}>
            <option value="default">{tkey('profile.themeDefault')}</option>
          </Select>
        </div>
      </div>
      
      <Button
        className="profile-logout"
        onClick={handleLogoutClick}
        text={tkey('profile.logout')}
      />
    </div>
  );
}
