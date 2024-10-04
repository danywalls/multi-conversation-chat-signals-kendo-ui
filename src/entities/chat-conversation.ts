import { Message } from '@progress/kendo-angular-conversational-ui';

export type ChatConversation = {
  id: number;
  name: string;
  pinned: boolean;
  messages: Array<Message>;
};

export const mockConversations: ChatConversation[] = [
  {
    id: 1,
    name: 'NBA Chat',
    pinned: true,
    messages: [
      {
        text: 'Let’s chat about the NBA!',
        author: {
          name: 'Dany ',
          id: 1,
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Kendo UI Chat',
    pinned: false,
    messages: [
      { text: 'Want to learn Kendo UI?', author: { name: 'Mandy AI' } },
    ],
  },
];
