import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ChatConversation,
  defaultUser,
  firstAIInteraction,
  initialConversation,
  mockConversations,
} from '../entities/chat-conversation';
import { ConversationsListComponent } from './components/conversations-list/conversations-list.component';
import {
  KENDO_CHAT,
  SendMessageEvent,
} from '@progress/kendo-angular-conversational-ui';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConversationsListComponent, KENDO_CHAT, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly defaultUser = defaultUser;
  currentConversation = signal<ChatConversation>(initialConversation);
  conversations = signal<ChatConversation[]>(mockConversations);

  createNewConversation() {
    const newConversation: ChatConversation = {
      ...firstAIInteraction,
      name: `New Chat ${this.conversations().length + 1}`,
    };

    this.conversations.update((currentItems) => [
      ...currentItems,
      newConversation,
    ]);

    this.currentConversation.set(newConversation);
  }

  updateMessage($event: SendMessageEvent) {
    this.currentConversation.update((c) => ({
      ...c,
      messages: [...c.messages, $event.message],
    }));

    this.conversations.update((currentItems) =>
      currentItems.map((p) =>
        p.id === this.currentConversation().id ? this.currentConversation() : p,
      ),
    );
  }
}
