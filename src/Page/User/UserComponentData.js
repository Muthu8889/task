export const formComponent = [
  {
    type: "text",
    label: "User Id",
    required: true,
    fullWidth: true,
    margin: "normal",
    name: "id",
  },
  {
    type: "text",
    label: "First Name",
    required: true,
    fullWidth: true,
    margin: "normal",
    name: "firstName",
  },
  {
    type: "text",
    label: "Last Name",
    required: false,
    fullWidth: true,
    margin: "normal",
    name: "lastName",
  },
  {
    type: "text",
    label: "User Name",
    required: false,
    fullWidth: true,
    margin: "normal",
    name: "username",
  },
  {
    type: "text",
    label: "Password",
    required: false,
    fullWidth: true,
    margin: "normal",
    name: "password",
  },
];

export const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
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