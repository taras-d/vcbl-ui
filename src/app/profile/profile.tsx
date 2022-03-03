import { Input } from '@shared/ui';
import { currentUser, formatDate } from '@shared/utils';
import { useMemo } from 'react';

import './profile.less';

export function Profile() {
  const user = currentUser.user;

  const [created, updated] = useMemo(() => {
    return [formatDate(user.createdAt), formatDate(user.updatedAt)];
  }, []);

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
    </div>
  );
}
