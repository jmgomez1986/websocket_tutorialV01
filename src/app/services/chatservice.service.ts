import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';

import { WebsocketChatService } from './websocketchat.service';

const CHAT_URL = 'ws://localhost:5000/';


@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wscService: WebsocketChatService) {
    this.messages = <Subject<Message>>(
      wscService.connect(CHAT_URL).pipe(map((response: MessageEvent): Message => {
        let content = JSON.parse(response.data);

        return {
          source: content.source,
          messageContent: content.content,
          messageReceived: content.message
        };
      }))
    );
  }
}
