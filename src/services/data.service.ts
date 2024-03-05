import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _data: User[] = [
    { id: 4, name: 'Yossi', role: 'FE Developer', age: 30 },
    { id: 5, name: 'Mamta', role: 'BE Developer', age: 25 },
    { id: 3, name: 'Shkati', role: 'QA Engineer', age: 34 },
    { id: 1, name: 'Jon', role: 'Team Leader', age: 45 },
    { id: 2, name: 'Fima', role: 'Product Manager', age: 33 },
  ];

  private users$: BehaviorSubject<User[]> = new BehaviorSubject(this._data);

  resetData(): void {
    this.users$.next(this._data);
  }

  public loadUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }
}
