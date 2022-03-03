import React, { useMemo, useState } from 'react';

import { Input, Select, Button } from '@shared/ui';
import { currentUser, formatDate } from '@shared/utils';
import { api } from '@shared/api';

import './profile.less';

export function Profile() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('default');

  const user = currentUser.user;

  const [created, updated] = useMemo(() => {
    return [formatDate(user.createdAt), formatDate(user.updatedAt)];
  }, []);

  function handleLanguageChange(event: React.SyntheticEvent<HTMLSelectElement>): void {
    setLanguage((event.target as HTMLSelectElement).value);
  }

  function handleThemeChange(event: React.SyntheticEvent<HTMLSelectElement>): void {
    setTheme((event.target as HTMLSelectElement).value);
  }

  function handleLogoutClick(): void {
    api.logout();
  }

  return (
    <div className="profile">
      <div className="row">
        <div className="col-3">Email</div>
        <div className="col-9">
          <Input defaultValue={user.email} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">Created</div>
        <div className="col-9">
          <Input defaultValue={created} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">Updated</div>
        <div className="col-9">
          <Input defaultValue={updated} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">Language</div>
        <div className="col-9">
          <Select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
          </Select>
        </div>
      </div>
      <div className="row">
        <div className="col-3">Theme</div>
        <div className="col-9">
          <Select value={theme} onChange={handleThemeChange}>
            <option value="default">Default</option>
          </Select>
        </div>
      </div>
      <Button className="profile-logout" onClick={handleLogoutClick} text="Logout" />
    </div>
  );
}
