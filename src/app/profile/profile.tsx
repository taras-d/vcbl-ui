import { Input } from '@shared/ui';
import { currentUser } from '@shared/utils';

import './profile.less';

export function Profile() {
  const user = currentUser.user;

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
          <Input defaultValue={user.createdAt} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-3">Updated</div>
        <div className="col-9">
          <Input defaultValue={user.updatedAt} disabled />
        </div>
      </div>
    </div>
  );
}