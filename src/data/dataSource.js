const selectOptions = [
  { id: 1, name: "Opción 1", description: "Descripción 1" },
  { id: 2, name: "Opción 2", description: "Descripción 2" },
];

function handleSelectChange(event, rowData) {
  const selectedId = event.target.value;
  // Aquí puedes manejar el cambio. Por ejemplo, actualizar el estado, o hacer algo con el ID seleccionado y la fila de datos.
  console.log("ID seleccionado:", selectedId, "para la fila:", rowData);
}

export const orderColumns = [
  {
    "field": "Cuentas",
    "isPrimaryKey": true,
    "headerText": "Código de Cuenta",
    "textAlign": "Center",
    "validationRules": { "required": true, "number": true },
    "width": 60,
    "defaultValue": ""
  },
  {
    "field": "Descripción",
    "headerText": "Nombre de la cuenta",
    "validationRules": { "required": true },
    "width": 110,
    "defaultValue": "",
    "textAlign": "Center"
  },
  {
    "field": "Saldo",
    "headerText": "Saldo contable",
    "textAlign": "Center",
    "validationRules": { "required": true },
    "width": 90,
    "defaultValue": "",
    "format": "C2"
  },
  {
    "field": "debe",
    "headerText": "DEBE",
    "textAlign": "Center",
    "validationRules": { "required": true, "number": true },
    "width": 60,
    "defaultValue": "",
    "format": "C2"
  },
  {
    "field": "haber",
    "headerText": "HABER",
    "textAlign": "Center",
    "validationRules": { "required": true, "number": true },
    "width": 60,
    "defaultValue": "",
    "format": "C2"
  },
  {
    "field": "p1",
    "headerText": "p1",
    "textAlign": "Center",
    "width": 100,
    "format": "C2",
    "validationRules": { "required": true }
  },
  {
    "field": "p2",
    "headerText": "p2",
    "width": 100,
    "validationRules": { "required": true },
    "textAlign": "Center",
    "format": "C2"
  },
  {
    "field": "p3",
    "headerText": "p3",
    "width": 100,
    "defaultValue": "",
    "format": "C2",
    "textAlign": "Center"
  },
  {
    "field": "haber",
    "isPrimaryKey": true,
    "headerText": "Varacion %",
    "textAlign": "Center",
    "validationRules": { "required": true, "number": true },
    "width": 60,
    "defaultValue": "",
    "format": "C2"
  },
  { 
    field: 'rubro',
    width: 120,
    headerText: 'Seleccionar',
    textAlign: 'Center',
    editType: 'dropdownedit',
  }
]
