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

  onSelectConversation(conversation: ChatConversation) {
    this.currentConversation.set(conversation);
  }

  onConversationUpdated(updatedConversation: ChatConversation) {
    this.conversations.update((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedConversation.id ? { ...updatedConversation } : item,
      ),
    );
  }

  onConversationDeleted(conversationId: number) {
    this.conversations.update((currentItems) =>
      currentItems.filter((item) => item.id !== conversationId),
    );
  }

  createNewConversation() {
    const newConversation: ChatConversation = {
      id: this.conversations().length + 1,
      name: `New Chat ${this.conversations().length + 1}`,
      pinned: false,
      messages: [],
    };
    this.conversations.set([...this.conversations(), newConversation]);
    this.currentConversation.set(newConversation);
  }
}
