import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    console.log(message);
    this.messages.push(message);
    setTimeout(() => {
      this.messages = [];
    }, 5000);
  }
}
