import React, { useMemo, useState, useContext } from 'react';

import { Input, Select, Button, Translate, LanguageContext } from '@shared/ui';
import { currentUser, formatDate, theme } from '@shared/utils';
import { authApi } from '@shared/api/auth-api';

import './profile.less';

export function Profile() {
  const language = useContext(LanguageContext);
  const [themeVal, setThemeVal] = useState(theme.current);

  const user = currentUser.user;

  const [created, updated] = useMemo(() => {
    return [formatDate(user.createdAt), formatDate(user.updatedAt)];
  }, []);

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const code = event.target.value;
    language.change(code);
  }

  function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    setThemeVal(value);
    theme.change(value);
  }

  function handleLogoutClick(): void {
    authApi.logout();
  }

  return (
    <div className="profile">
      <div className="row">
        <div className="col-3">
          <Translate value="profile.email" />
        </div>
        <div className="col-9">
          <Input defaultValue={user.email} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Translate value="profile.created" />
        </div>
        <div className="col-9">
          <Input defaultValue={created} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Translate value="profile.updated" />
        </div>
        <div className="col-9">
          <Input defaultValue={updated} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Translate value="profile.lang" />
        </div>
        <div className="col-9">
          <Select value={language.current} onChange={handleLanguageChange}>
            {language.languages.map((code: string) => 
              <option value={code} key={code}>
                <Translate value={`profile.lang-${code}`} />
              </option>
            )}
          </Select>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Translate value="profile.theme" />
        </div>
        <div className="col-9">
          <Select value={themeVal} onChange={handleThemeChange}>
            {theme.themes.map((item: string) => 
              <option value={item} key={item}>
                <Translate value={`profile.theme-${item}`} />
              </option>
            )}
          </Select>
        </div>
      </div>
      
      <Button
        className="profile-logout"
        onClick={handleLogoutClick}
        text={<Translate value="profile.logout" />}
      />
    </div>
  );
}
