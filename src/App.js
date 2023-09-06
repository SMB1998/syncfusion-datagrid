import "./App.css";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Edit,
  Toolbar,
  Page,
  Inject,
  Sort,
  Reorder,
  ColumnMenu,
} from "@syncfusion/ej2-react-grids";
import data from "./variaciones.json";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const orderColumns = [
  {
    field: "Cuentas",
    isPrimaryKey: true,
    headerText: "Cuentas",
    textAlign: "Center",
    validationRules: { required: true, number: true },
    width: 120,
    defaultValue: "",
  },
  {
    field: "Descripción",
    headerText: "Descripción",
    validationRules: { required: true },
    width: 140,
    defaultValue: "",
    textAlign: "Center",
  },
  {
    field: "p1",
    headerText: "p1",
    textAlign: "Center",
    width: 120,
    format: "C2",
    validationRules: { required: true },
  },
  {
    field: "p2",
    headerText: "p2",
    width: 170,
    validationRules: { required: true },
    textAlign: "center",
    format: "C2",
  },
  {
    field: "p3",
    headerText: "p3",
    width: 150,
    defaultValue: "",
    format: "C2",
    textAlign: "center",
  },
];

function App() {
  const toolbarOptions = [
    "Add",
    "Delete",
    "Update",
    "Cancel",
    "Search",
    {
      text: "Agregar Columnas",
      id: "add_column",
      buttonOptions: {
        iconCss: "e-icons e-plus-icon",
      },
    },
  ];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    mode: "Dialog",
  };
  const pageSettings = { pageCount: 5 };
  const [editingColumn, setEditingColumn] = useState(null);
  const [editingColumnField, setEditingField] = useState(null);
  const [editingColumnText, setEditingText] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [columns, setColumns] = useState(orderColumns);

  const handleSaveColumnName = () => {
    const updatedColumns = columns.map((column) => {
      if (column.field === editingColumnField) {
        console.log(column.field, editingColumnField.replace(" ", ""));
        return { ...column, headerText: editingColumn };
      }
      return column;
    });
    setEditingText(null);
    setColumns(updatedColumns);
    setIsDialogVisible(false);
    setEditingColumn(null);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Syncfusion Grid Example</h1>
      <h1 style={{ textAlign: "center" }}>Syncfusion Grid Example</h1>
      <GridComponent
        locale="es"
        dataSource={data}
        columns={columns}
        pageSettings={pageSettings}
        toolbar={toolbarOptions}
        allowPaging={true}
        allowReordering={true}
        showConfirmDialog={true}
        editSettings={editSettings}
        showColumnMenu={true}
        columnMenuItems={[
          {
            text: "Editar",
            id: "customEditOption",
          },
          {
            text: "Eliminar",
            id: "customDeleteOption",
          },
        ]}
        columnMenuClick={(args) => {
          if (args.item.id === "customEditOption") {
            setEditingField(args.column.field);
            setEditingColumn(args.column.headerText);
            setEditingText((prevText) =>
              prevText !== null ? prevText : args.column.headerText
            );
            setIsDialogVisible(true);
          } else if (args.item.id === "customDeleteOption") {
            const updatedColumns = columns.filter(
              (column) => column.field !== args.column.field
            );
            setColumns(updatedColumns);
          }
        }}
        toolbarClick={(args) => {
          if (args.item.id === "add_column") {
            const newColumn = {
              field: uuidv4(),
              headerText: "Nueva Columna",
              textAlign: "Center",
              width: 80,
              allowEditing: true,
            };
            setColumns((prevColumns) => [...prevColumns, newColumn]);
          }
        }}
      >
        <Inject services={[Page, Toolbar, Edit, Reorder, Sort, ColumnMenu]} />
      </GridComponent>
      {isDialogVisible && (
        <div className="modal-background">
          <div className="dialog">
            <h2>Editar nombre de columna</h2>
            <p>Nombre actual: {editingColumnText}</p>
            <input
              type="text"
              value={editingColumn}
              onChange={(e) => setEditingColumn(e.target.value)}
            />
            <button onClick={() => handleSaveColumnName()}>Guardar</button>
            <button
              onClick={() => {
                setEditingText(null);
                setIsDialogVisible(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
