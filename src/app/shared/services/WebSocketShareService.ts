import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class WebSocketShareService implements OnDestroy {

  private _blogDataSubject = new BehaviorSubject<string>("");

  constructor() { }
  ngOnDestroy(): void {
    this._blogDataSubject.unsubscribe();
  }

  onNewValueReceive(msg: any) {
    this._blogDataSubject.next(msg);
  }

  getNewValue(): Observable<any> {
    return this._blogDataSubject.asObservable();
  }
}
