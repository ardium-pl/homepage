import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private address: string = 'Warszawa, PL';
  private phone: string = '+48 998';
  private email: string = 'skskskskAardiumpl';

  getAddress(): string {
    return this.address;
  }

  getPhone(): string {
    return this.phone;
  }

  getEmail(): string {
    return this.email;
  }
}
