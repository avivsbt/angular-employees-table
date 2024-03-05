import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  computed,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../models/models';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IActionTable } from './table/table.component';

@Component({
  selector: 'cora-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public users = signal<User[] | null>(null);
  public searchValue = signal<string>('');
  private usersSub: Subscription = Subscription.EMPTY;
  public selectedUser: User;

  public filteredUsers = computed(() => {
    if (this.searchValue().length < 2) return this.users();
    return this.users()?.filter(
      (user) => user.name.toLowerCase().indexOf(this.searchValue()) > -1
    );
  });

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.usersSub = this.dataService
      .loadUsers()
      .pipe(delay(2000))
      .subscribe((users) => {
        this.users.set(users);
      });
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }

  onSearch(e: Event): void {
    this.searchValue.set((e.target as HTMLInputElement).value);
  }

  onReset(): void {
    this.dataService.resetData();
  }

  onActionsTable(action: IActionTable): void {
    if (action.type === 'select') {
      this.selectedUser = action.user;
    }

    if (action.type === 'duplicate') {
      let userId = Math.max(...this.users().map((u) => u.id)) + 1;
      this.users.set([...this.users(), { ...action.user, id: userId }]);
    }

    if (action.type === 'delete') {
      this.users.set(this.users().filter((user) => user.id !== action.user.id));
    }
  }
}
