import { Component, model } from '@angular/core';
import {
  ChatConversation,
  initialConversation,
} from '../../../entities/chat-entities';
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
import { ButtonComponent } from '@progress/kendo-angular-buttons';

@Component({
  imports: [
    ListViewComponent,
    ItemTemplateDirective,
    EditCommandDirective,
    KENDO_LISTVIEW,
    FormsModule,
    ButtonComponent,
  ],
  selector: 'app-conversations-list',
  standalone: true,
  styleUrl: './conversations-list.component.css',
  templateUrl: './conversations-list.component.html',
})
export class ConversationsListComponent {
  conversations = model.required<ChatConversation[]>();
  conversationSelected = model.required<ChatConversation>();

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
    sender.closeItem(itemIndex);
    this.resetEdit();
    this.conversations.update((currentItems) =>
      currentItems.map((p) => (p.id === dataItem.id ? dataItem : p)),
    );
  }

  private resetEdit() {
    this.editedConversation = null;
    this.editedIndex = null;
  }

  removeHandler({ dataItem }: RemoveEvent) {
    this.conversations.update((conversations) =>
      conversations.filter((p) => p.id !== dataItem.id),
    );
    if (dataItem.id === this.conversationSelected().id) {
      dataItem.active = false;
      this.conversationSelected.set(initialConversation);
    }
  }

  private closeEditor(sender: any, itemIndex = this.editedIndex) {
    sender.closeItem(itemIndex);
    this.resetEdit();
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
