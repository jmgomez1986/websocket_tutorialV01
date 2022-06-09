import { TestBed } from '@angular/core/testing';

import { WebsocketChatService } from './websocketchat.service';

describe('WebsocketchatService', () => {
  let service: WebsocketChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
