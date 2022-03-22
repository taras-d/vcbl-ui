import { storage } from "@shared/utils";
import { LoginResponse, User } from "@shared/interfaces";

let user = storage.get('user') as User;

function save(response: LoginResponse): void {
  user = response.user;
  storage.set('token', response.accessToken);
  storage.set('user', response.user);
}

function remove(): void {
  user = null;
  storage.remove('token');
  storage.remove('user');
}

export const currentUser = {
  save,
  remove,
  get user() { return user; },
}
