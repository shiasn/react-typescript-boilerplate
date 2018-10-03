export interface TodoModel {
  id: number;
  content: string;
  updateTime: string;
  status: string;
}

export namespace TodoModel {
  export enum Filter {
    SHOW_ALL = 'SHOW_ALL',
    SHOW_ACTIVE = 'SHOW_ACTIVE',
    SHOW_COMPLETED = 'SHOW_COMPLETED'
  }
}
