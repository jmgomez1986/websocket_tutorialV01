import { Component } from '@angular/core';
import { WebsocketChatService } from './services/websocketchat.service';
import { ChatService } from './services/chatservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketChatService, ChatService],
})
export class AppComponent {
  title = 'websocket_front';

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe((msg) => {
      console.log('Response recieved from websocket: ' , msg);
    });
  }

  private message = {
    user: 'Husnain',
    messageContent: 'Hello World!',
  };

  sendMessage() {
    console.log('new message from the client: ', this.message);
    this.chatService.messages.next(this.message);
    // this.message.messageContent = '';
  }
}
