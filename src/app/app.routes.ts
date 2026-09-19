import { LayoutComponent } from "./layouts/layout/layout.component";
import { AppRoutes } from "@ui/interfaces/app-route.interface";

export const appRoutes: AppRoutes = [
  {
    path: "",
    component: LayoutComponent,
    children: [],
  },
];
