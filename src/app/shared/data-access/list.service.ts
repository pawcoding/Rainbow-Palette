import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { Palette } from '../model';

export type PaletteListItem = {
  id: string;
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class ListService {
  /**
   * List of palette ids stored in local storage
   */
  private readonly _list$ = new BehaviorSubject<Array<PaletteListItem>>([]);

  /**
   * List of palette ids stored in local storage
   */
  public readonly list$ = this._list$.asObservable();

  public constructor() {
    // Load list from local storage
    const list = localStorage.getItem(LocalStorageKey.PALETTE_IDS);

    // If there is a list in local storage, parse it and update the list subject
    if (list) {
      try {
        this._list$.next(JSON.parse(list));
      } catch (e) {
        console.error('Could not parse list from local storage.', e);
      }
    }

    // Update list in local storage when it changes
    this.list$.subscribe((list) => {
      localStorage.setItem(LocalStorageKey.PALETTE_IDS, JSON.stringify(list));
    });
  }

  /**
   * Add a palette id to the list
   */
  public add(palette: Palette): void {
    const list = this._list$.value;

    const index = list.findIndex((item) => item.id === palette.id);
    if (index > -1) {
      list.splice(index, 1);
    }

    this._list$.next([{ id: palette.id, name: palette.name }, ...list]);
  }

  /**
   * Remove a palette id from the list
   */
  public remove(id: string): void {
    const index = this._list$.value.findIndex((item) => item.id === id);
    if (index > -1) {
      const list = this._list$.value;
      list.splice(index, 1);
      this._list$.next(list);
    }
  }
}

export class ListServiceMock {
  public add(_palette: Palette): void {}
  public remove(_id: string): void {}
  public list$ = new BehaviorSubject<Array<PaletteListItem>>([]).asObservable();
}
