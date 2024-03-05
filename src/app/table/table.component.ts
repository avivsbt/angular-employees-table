import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { User } from '../../models/models';

export interface IActionTable {
  user: User;
  type: 'duplicate' | 'select' | 'delete';
}

@Component({
  selector: 'cora-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() users: User[];
  headers: string[] = ['ID', 'Name', 'Role', 'Age', 'Actions'];
  @Output() onActionsTable = new EventEmitter<IActionTable>();

  onActions(user: User, type: 'duplicate' | 'select' | 'delete') {
    this.onActionsTable.emit({ user, type });
  }
}
