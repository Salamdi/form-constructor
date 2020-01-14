export interface ITask {
  id: string;
  content: string;
}

export interface ITasks {
  [name: string]: ITask;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: Array<string>
}

export interface IColumns {
  [name: string]: IColumn;
}

export interface IData {
  tasks: ITasks;
  columns: IColumns;
  columnOrder: Array<string>
}

export const initialData: IData = {
  tasks: {
    'task-1': {id: 'task-1', content: 'Take out the garbage'},
    'task-2': {id: 'task-2', content: 'Watch my favorite show'},
    'task-3': {id: 'task-3', content: 'Charge my phone'},
    'task-4': {id: 'task-4', content: 'Cook dinner'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}
