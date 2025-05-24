export type RequiredOnly<T, K extends keyof T> = Partial<T> &
  Pick<Required<T>, K>;

export type OptionalOnly<T, K extends keyof T> = Required<T> &
  Partial<Pick<T, K>>;

export type CollectionData<T> = T extends { data: infer D } ? D : never;

export interface HTMLAttributes {
  class?: string;
  id?: string;
  style?: string;
  [key: string]: unknown;
}

export interface EventHandlers {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
