import { Message, User } from '@progress/kendo-angular-conversational-ui';

export type ChatConversation = {
  id: string;
  name: string;
  pinned: boolean;
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
    pinned: true,
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
    pinned: false,
    active: false,
    messages: [{ text: 'Want to learn Kendo UI?', author: AIBot }],
  },
];

export const initialConversation: ChatConversation = {
  id: crypto.randomUUID(),
  name: 'Initial conversation',
  messages: [],
  active: false,
  pinned: false,
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
  pinned: false,
};

export const defaultUser: User = {
  id: crypto.randomUUID(),
  name: 'Dany',
};
