import React, { useMemo, useState } from 'react';

import { Input, Select, Button, tkey, } from '@shared/ui';
import { currentUser, formatDate, language } from '@shared/utils';
import { authApi } from '@shared/api/auth-api';
import { TranslateLang } from '@shared/interfaces';

import './profile.less';

export function Profile() {
  const [lang, setLang] = useState<TranslateLang>(language.get());
  const [theme, setTheme] = useState('default');

  const user = currentUser.user;

  const [created, updated] = useMemo(() => {
    return [formatDate(user.createdAt), formatDate(user.updatedAt)];
  }, []);

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value as TranslateLang;
    setLang(value);
    language.set(value);
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
        <div className="col-3">{tkey('profile_email')}</div>
        <div className="col-9">
          <Input defaultValue={user.email} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile_created')}</div>
        <div className="col-9">
          <Input defaultValue={created} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile_updated')}</div>
        <div className="col-9">
          <Input defaultValue={updated} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile_lang')}</div>
        <div className="col-9">
          <Select value={lang} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="uk">Ukrainian</option>
          </Select>
        </div>
      </div>
      <div className="row">
        <div className="col-3">{tkey('profile_theme')}</div>
        <div className="col-9">
          <Select value={theme} onChange={handleThemeChange}>
            <option value="default">Default</option>
          </Select>
        </div>
      </div>
      <Button className="profile-logout" onClick={handleLogoutClick} text={tkey('profile_logout')} />
    </div>
  );
}
