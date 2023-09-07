import "./DataGrid.css";
import {
  GridComponent,
  Edit,
  Toolbar,
  Page,
  Inject,
  Sort,
  Reorder,
  ColumnMenu,
  InfiniteScroll
} from "@syncfusion/ej2-react-grids";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DataGridModal } from "../DataGridModal";

const DataGrid = ({ gridColumns, data }) => {
  const toolbarOptions = [
    "Add",
    "Delete",
    "Search",
    {
      text: "Agregar Periodos",
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

  const columnMenuItems = [
    {
      text: "Editar",
      id: "customEditOption",
    },
    {
      text: "Eliminar",
      id: "customDeleteOption",
    },
  ];
  const pageSettings = { pageCount: 5 };
  const [editingColumn, setEditingColumn] = useState(null);
  const [editingColumnField, setEditingField] = useState(null);
  const [editingColumnText, setEditingText] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [columns, setColumns] = useState(gridColumns);

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

  const handleCustomMenuItem = (args) => {
    switch (args.item.id) {
      case "customEditOption":
        setEditingField(args.column.field);
        setEditingColumn(args.column.headerText);
        setEditingText((prevText) =>
          prevText !== null ? prevText : args.column.headerText
        );
        setIsDialogVisible(true);
        break;
      case "customDeleteOption":
        const updatedColumns = columns.filter(
          (column) => column.field !== args.column.field
        );
        setColumns(updatedColumns);
        break;
      case "add_column":
        const newColumns = Array.from({ length: 3 }, (_, index) => {
          return {
            field: uuidv4(),
            headerText: `Periodo ${index + 1}`,
            textAlign: "Center",
            width: 80,
            allowEditing: true,
          };
        });
        setColumns((prevColumns) => [...prevColumns, ...newColumns]);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Syncfusion Grid Example</h1>
      <h1 style={{ textAlign: "center" }}>Syncfusion Grid Example</h1>
      <GridComponent
        dataSource={data}
        columns={columns}
        pageSettings={pageSettings}
        toolbar={toolbarOptions}
        allowReordering={true}
        showConfirmDialog={true}
        editSettings={editSettings}
        showColumnMenu={true}
        columnMenuItems={columnMenuItems}
        columnMenuClick={(args) => handleCustomMenuItem(args)}
        toolbarClick={(args) => handleCustomMenuItem(args)}
        enableInfiniteScrolling={true}
        height={380} 
      >
        <Inject services={[Page, Toolbar, Edit, Reorder, Sort, ColumnMenu, InfiniteScroll]} />
      </GridComponent>
      {isDialogVisible && (
        <DataGridModal
          editingColumn={editingColumn}
          editingColumnText={editingColumnText}
          setIsDialogVisible={setIsDialogVisible}
          setEditingColumn={setEditingColumn}
          handleSaveColumnName={handleSaveColumnName}
        />
      )}
    </div>
  );
};

export default DataGrid;
