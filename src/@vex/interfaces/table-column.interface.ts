export interface TableColumn {
  label: string;
  property: string;
  type: "text" | "image" | "badge" | "progress" | "checkbox" | "button";
  visible?: boolean;
  cssClasses?: string[];
}
