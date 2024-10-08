import { Component, signal } from '@angular/core';

import {
  ChatConversation,
  defaultUser,
  firstAIInteraction,
  initialConversation,
} from '../entities/chat-entities';
import { ConversationsListComponent } from './components/conversations-list/conversations-list.component';
import {
  KENDO_CHAT,
  SendMessageEvent,
} from '@progress/kendo-angular-conversational-ui';
import { ButtonComponent } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConversationsListComponent, KENDO_CHAT, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly defaultUser = defaultUser;
  currentConversation = signal<ChatConversation>(initialConversation);
  conversations = signal<ChatConversation[]>([]);

  createNewConversation() {
    const newConversation: ChatConversation = {
      ...firstAIInteraction,
      name: `New Chat ${this.conversations().length + 1}`,
      id: crypto.randomUUID(),
    };

    this.conversations.update((currentItems) => [
      ...currentItems,
      newConversation,
    ]);

    this.currentConversation.set(newConversation);
  }

  updateConversation(conversation: ChatConversation) {
    this.conversations.update((currentItems) =>
      currentItems.map((p) => (p.id === conversation.id ? conversation : p)),
    );
  }

  deleteConversation(id: string) {
    this.conversations.update((conversations) =>
      conversations.filter((p) => p.id !== id),
    );

    if (id === this.currentConversation().id) {
      this.currentConversation.set(initialConversation);
    }
  }

  updateMessage($event: SendMessageEvent) {
    this.currentConversation.update((c) => ({
      ...c,
      messages: [...c.messages, $event.message],
    }));

    this.updateConversation(this.currentConversation());
  }
}
