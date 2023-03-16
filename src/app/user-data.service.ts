import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private users: any[] = [];

  constructor() { }

  addItem(user: any) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  editItem(id: number, updatedUser: any) {
    const index = this.users.findIndex(u => u.e_id === id);
    if (index >= 0) {
      this.users[index] = updatedUser;
    }
  }

  deleteItem(index: number) {
    if (index >= 0 && index < this.users.length) {
      this.users.splice(index, 1);
    }
  }
}
