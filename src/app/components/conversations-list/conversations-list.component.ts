import { Component, model, output } from '@angular/core';
import { ChatConversation } from '../../../entities/chat-entities';
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
  conversationUpdated = output<ChatConversation>();
  conversationDeleted = output<string>();
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
    this.conversationUpdated.emit(dataItem);
  }

  private resetEdit() {
    this.editedConversation = null;
    this.editedIndex = null;
  }

  removeHandler({ dataItem }: RemoveEvent) {
    this.conversationDeleted.emit(dataItem);
  }

  private closeEditor(sender: any, itemIndex = this.editedIndex) {
    sender.closeItem(itemIndex);
    this.resetEdit();
  }

  onTogglePin(dataItem: ChatConversation) {
    dataItem.fav = !dataItem.fav;
    this.conversationUpdated.emit(dataItem);
  }

  onConversationSelect(dataItem: ChatConversation) {
    dataItem.active = true;
    this.conversationSelected.set(dataItem);
  }
}
