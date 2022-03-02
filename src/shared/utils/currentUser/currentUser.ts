import { storage } from "@shared/utils";
import { LoginResponse, User } from "@shared/interfaces";

let token = storage.get('token') as string;
let user = storage.get('user') as User;

function save(response: LoginResponse): void {
  token = response.accessToken;
  user = response.user;
  storage.set('token', token);
  storage.set('user', user);
}

function remove(): void {
  token = null;
  user = null;
  storage.remove('token');
  storage.remove('user');
}

export const currentUser = {
  save,
  remove,
  get token() { return token; },
  get user() { return user; },
}
