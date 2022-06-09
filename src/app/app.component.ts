import { Component } from '@angular/core';
import { WebsocketChatService } from './services/websocketchat.service';
import { ChatService } from './services/chatservice.service';
import { Message } from './models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketChatService, ChatService],
})
export class AppComponent {
  title = 'websocket_front';
  contentToSend = '';
  received: Message = { source: '', messageContent: '' };
  sent: Message = { source: '', messageContent: '' };
  private message: Message = {
    source: '',
    messageContent: '',
  };

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe((msg) => {
      console.log('Response recieved from websocket: ', msg);
      this.received = msg;
    });
  }

  sendMessage() {
    this.message = {
      source: 'localhost',
      messageContent: this.contentToSend,
    };
    console.log('new message from the client: ', this.message);
    this.sent = this.message;
    this.chatService.messages.next(this.message);
  }
}
