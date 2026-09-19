import { Service } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Service()
export class SearchService {
  valueChangesSubject = new BehaviorSubject<string>("");
  valueChanges$ = this.valueChangesSubject.asObservable();

  submitSubject = new Subject<string>();
  submit$ = this.submitSubject.asObservable();

  isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  constructor() {}
}
