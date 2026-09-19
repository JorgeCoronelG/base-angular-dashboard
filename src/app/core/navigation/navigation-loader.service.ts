import { inject, Service } from "@angular/core";
import { VexLayoutService } from "@vex/services/vex-layout.service";
import { NavigationItem } from "./navigation-item.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Service()
export class NavigationLoaderService {
  private readonly layoutService = inject(VexLayoutService);

  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  constructor() {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.next([
      {
        type: "subheading",
        label: "Dashboards",
        children: [
          {
            type: "link",
            label: "Analytics",
            route: "/",
            icon: "mat:insights",
            routerLinkActiveOptions: { exact: true },
          },
        ],
      },
    ]);
  }
}
