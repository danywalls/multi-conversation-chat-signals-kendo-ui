import { Message, User } from '@progress/kendo-angular-conversational-ui';

export type ChatConversation = {
  id: string;
  name: string;
  fav: boolean;
  active: boolean;
  messages: Array<Message>;
};

export const defaultUser: User = {
  id: crypto.randomUUID(),
  name: 'Dany',
};

export const AIBot: User = {
  id: crypto.randomUUID(),
  name: 'Mandy AI',
};

export const initialConversation: ChatConversation = {
  id: crypto.randomUUID(),
  name: 'Initial conversation',
  messages: [],
  active: false,
  fav: false,
};

export const firstAIInteraction: Omit<ChatConversation, 'name' | 'id'> = {
  active: true,
  messages: [
    {
      author: AIBot,
      text: 'Welcome to Kendo AI',
    },
  ],
  fav: false,
};
