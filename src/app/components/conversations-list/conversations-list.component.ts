import { Component, model, output } from '@angular/core';
import { ChatConversation } from '../../../entities/chat-conversation';
import {
  CancelEvent,
  EditCommandDirective,
  EditEvent,
  ItemTemplateDirective,
  KENDO_LISTVIEW,
  ListViewComponent,
  RemoveEvent,
  SaveEvent,
} from '@progress/kendo-angular-listview';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-conversations-list',
  standalone: true,
  imports: [
    ListViewComponent,
    ItemTemplateDirective,
    EditCommandDirective,
    KENDO_LISTVIEW,

    FormsModule,
    JsonPipe,
  ],
  templateUrl: './conversations-list.component.html',
  styleUrl: './conversations-list.component.css',
})
export class ConversationsListComponent {
  conversations = model.required<ChatConversation[]>();
  conversationSelected = model.required<ChatConversation>();
  conversationUpdated = output<ChatConversation>();
  conversationDeleted = output<number>();

  public editedConversation: ChatConversation | null = null;
  public editedIndex: number | null = null;

  editHandler({ sender, itemIndex, dataItem }: EditEvent) {
    this.closeEditor(sender);

    this.editedConversation = { ...dataItem };
    this.editedIndex = itemIndex;

    sender.editItem(itemIndex);
  }

  cancelHandler({ sender, itemIndex }: CancelEvent) {
    this.closeEditor(sender, itemIndex);
  }

  saveHandler({ sender, itemIndex, dataItem }: SaveEvent) {
    console.log(dataItem);
    sender.closeItem(itemIndex);
    this.editedConversation = null;
    this.editedIndex = null;
    this.conversations.update((currentItems) =>
      currentItems.map((p) => (p.id === dataItem.id ? dataItem : p)),
    );
  }

  removeHandler({ dataItem }: RemoveEvent) {
    this.conversations.update((conversations) =>
      conversations.filter((p) => p.id !== dataItem.id),
    );
    if (dataItem.id === this.conversationSelected().id) {
      dataItem.active = false;
      this.conversationSelected.set(dataItem);
    }
  }

  private closeEditor(sender: any, itemIndex = this.editedIndex) {
    sender.closeItem(itemIndex);
    this.editedConversation = null;
    this.editedIndex = null;
  }

  onTogglePin(dataItem: ChatConversation) {
    dataItem.fav = !dataItem.fav;
    this.conversations.update((currentItems) =>
      currentItems.map((p) => (p.id === dataItem.id ? dataItem : p)),
    );
  }

  onConversationSelect(dataItem: ChatConversation) {
    dataItem.active = true;

    this.conversationSelected.set(dataItem);
  }
}
