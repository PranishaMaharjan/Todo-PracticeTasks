export type TCard = {
  id: string;
  task: string;
};

export type TColumn = {
  id: string;
  title: string;
};

export type TBoard = {
  column: TColumn[];
};
