export interface dataReturnProps<t> {
  data: data<t>;
  success: true;
  errors?: [];
}

export interface data<t> {
  success: boolean;
  data: t;
}

export interface dataNormal {
  success: boolean;
  data: any;
}