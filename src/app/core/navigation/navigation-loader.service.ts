import { Service, signal } from "@angular/core";
import { NavigationItem } from "./navigation-item.interface";

@Service()
export class NavigationLoaderService {
  private readonly _items = signal<NavigationItem[]>([]);
  readonly items = this._items.asReadonly();

  constructor() {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.set([
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
