export const formComponent = [
    {
      type: "select",
      label: "User Id",
      required: true,
      fullWidth: true,
      margin: "normal",
      name: "id",
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
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'fullName',
      headerName: 'Full name',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
    {
      field: 'taskName',
      headerName: 'Task name',
      width: 150,
      editable: true,
    },
    
    {
        field: 'taskDesc',
        headerName: 'Task Description',
        width: 200,
        editable: true,
      },
  ];

  export const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei'},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime'},
    { id: 4, lastName: 'Stark', firstName: 'Arya'},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
    { id: 6, lastName: 'Melisandre', firstName: null },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara'},
    { id: 8, lastName: 'Frances', firstName: 'Rossini'},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey'},
  ];
  