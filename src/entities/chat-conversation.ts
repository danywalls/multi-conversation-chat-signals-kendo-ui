import { Message, User } from '@progress/kendo-angular-conversational-ui';

export type ChatConversation = {
  id: string;
  name: string;
  fav: boolean;
  active: boolean;
  messages: Array<Message>;
};

export const AIBot: User = {
  id: crypto.randomUUID(),
  name: 'Mandy AI',
};

export const mockConversations: ChatConversation[] = [
  {
    id: crypto.randomUUID(),
    name: 'NBA Chat',
    fav: true,
    active: true,
    messages: [
      {
        text: 'Let’s chat about the NBA!',
        author: AIBot,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Kendo UI Chat',
    fav: false,
    active: false,
    messages: [{ text: 'Want to learn Kendo UI?', author: AIBot }],
  },
];

export const initialConversation: ChatConversation = {
  id: crypto.randomUUID(),
  name: 'Initial conversation',
  messages: [],
  active: false,
  fav: false,
};

export const firstAIInteraction: Omit<ChatConversation, 'name'> = {
  active: true,
  id: crypto.randomUUID(),
  messages: [
    {
      author: AIBot,
      text: 'Welcome to Kendo AI',
    },
  ],
  fav: false,
};

export const defaultUser: User = {
  id: crypto.randomUUID(),
  name: 'Dany',
};
