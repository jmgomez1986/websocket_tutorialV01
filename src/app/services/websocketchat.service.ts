import { Injectable } from '@angular/core';
import * as Rj from 'rxjs';
import { Observable } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable()
export class WebsocketChatService {

  private subject: AnonymousSubject<MessageEvent> | undefined;

  public connect(url: any): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected To: ' + url);
    }
    return this.subject;
  }

  private create(url: any): Rj.Subject<MessageEvent> {
    let wsc = new WebSocket(url);

    let observable = new Observable((obs: Rj.Observer<MessageEvent>) => {
      wsc.onmessage = obs.next.bind(obs);
      wsc.onerror = obs.error.bind(obs);
      wsc.onclose = obs.complete.bind(obs);
      return wsc.close.bind(wsc);
    });
    let observer = {
      error: () => null,
      complete: () => null,
      next: (data: Object) => {
        if (wsc.readyState === WebSocket.OPEN) {
          wsc.send(JSON.stringify(data));
        }
      },
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
