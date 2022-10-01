import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public infoOrder: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() {}
}
