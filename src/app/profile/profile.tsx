import React, { useMemo, useState, useContext, useEffect } from 'react';

import { Input, Select, Button, Translate, LanguageContext, Spinner } from '@shared/ui';
import { formatDate, theme } from '@shared/utils';
import { userApi } from '@shared/api/auth-api';
import { User } from '@shared/interfaces';
import { useAbortController } from '@shared/hooks';

import './profile.less';

export function Profile() {
  const language = useContext(LanguageContext);
  const dataAbort = useAbortController();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(theme.current);

  useEffect(() => {
    userApi.getMe(dataAbort.signal())
      .catch(() => null)
      .then((res: User) => {
        setUser(res);
        setLoading(false);
      });
  }, []);

  const [created, updated] = useMemo(() => {
    return user ? [formatDate(user.createdAt), formatDate(user.updatedAt)] : [];
  }, [user]);

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const code = event.target.value;
    language.change(code);
  }

  function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    setCurrentTheme(value);
    theme.change(value);
  }

  function handleLogoutClick(): void {
    userApi.logout();
  }

  function renderContent(): JSX.Element {
    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="profile-form">
        {user && <>
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
        </>}

        {/* Language */}
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

        {/* Theme */}
        <div className="row">
          <div className="col-3">
            <Translate value="profile.theme" />
          </div>
          <div className="col-9">
            <Select value={currentTheme} onChange={handleThemeChange}>
              {theme.themes.map((item: string) => 
                <option value={item} key={item}>
                  <Translate value={`profile.theme-${item}`} />
                </option>
              )}
            </Select>
          </div>
        </div>
      
        {/* Logout */}
        <Button
          className="profile-logout"
          onClick={handleLogoutClick}
          text={<Translate value="profile.logout" />}
        />
      </div>
    );
  }

  return (
    <div className="profile">
      {renderContent()}
    </div>
  );
}
