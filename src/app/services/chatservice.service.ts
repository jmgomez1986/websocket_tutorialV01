import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebsocketChatService } from './websocketchat.service';

const CHAT_URL = 'ws://localhost:5000/';

export interface Message {
  user: string;
  messageContent: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wscService: WebsocketChatService) {
    this.messages = <Subject<Message>>(
      wscService.connect(CHAT_URL).pipe(map((response: MessageEvent): Message => {
        let content = JSON.parse(response.data);
        return {
          user: content.source,
          messageContent: content.content,
        };
      }))
    );
  }
}
