export const formComponent = [
  {
    type: "select",
    label: "User Id",
    required: true,
    fullWidth: true,
    margin: "normal",
    name: "userId",
  },
  {
    type: "text",
    label: "Task Name",
    required: true,
    fullWidth: true,
    margin: "normal",
    name: "taskName",
  },
  {
    type: "text",
    label: "Task Description",
    required: false,
    fullWidth: true,
    margin: "normal",
    name: "taskdesc",
    multiline: true,
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "userId", headerName: "User ID", width: 120 },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
  {
    field: "taskName",
    headerName: "Task name",
    width: 150,
    editable: true,
  },

  {
    field: "taskDesc",
    headerName: "Task Description",
    width: 200,
    editable: true,
  },
];

export const rows = [
  {
    id: 1,
    userId: 1,
    lastName: "Snow",
    firstName: "Jon",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 2,
    userId: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 3,
    userId: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 4,
    userId: 4,
    lastName: "Stark",
    firstName: "Arya",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 5,
    userId: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 6,
    userId: 6,
    lastName: "Melisandre",
    firstName: null,
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 7,
    userId: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
];
