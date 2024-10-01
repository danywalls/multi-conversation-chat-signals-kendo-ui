import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ChatConversation,
  mockConversations,
} from '../entities/chat-conversation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'conversation-chat';
  currentConversation = signal<ChatConversation | null>(null);

  conversations = signal<ChatConversation[]>(mockConversations);
}
