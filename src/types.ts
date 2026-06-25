export interface CustomFormEvent {
  target: {
    name: string;
    value: any;
    type?: string;
    checked?: boolean;
  };
}