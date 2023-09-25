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
  InfiniteScroll,
  Freeze,
} from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";
import { DataUtil } from "@syncfusion/ej2-data";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useState } from "react";
import { DataGridModal } from "../DataGridModal";
import { generateNewColumns } from "../../helpers/generateNewColumns";

const DataGrid = ({ gridColumns, data }) => {
  const toolbarOptions = [
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
    showDropdownAlways: true,
  };

  const columnMenuItems = [
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
        setColumns((prevColumns) => {
          const newColumns = generateNewColumns(prevColumns);
          const lastIndex = prevColumns.length - 1;
          const restOfColumns = prevColumns.slice(0, lastIndex);
          return [...restOfColumns, ...newColumns, prevColumns[lastIndex]];
        });
        break;
      default:
        break;
    }
  };

  const onChange = (args) => {
    alert(args.value);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white" }}>
        Syncfusion Grid Example
      </h1>
      <GridComponent
        locale="es"
        height={"700"}
        dataSource={data}
        columns={columns}
        pageSettings={pageSettings}
        toolbar={toolbarOptions}
        showConfirmDialog={true}
        editSettings={editSettings}
        showColumnMenu={true}
        columnMenuItems={columnMenuItems}
        columnMenuClick={(args) => handleCustomMenuItem(args)}
        toolbarClick={(args) => handleCustomMenuItem(args)}
        enableInfiniteScrolling={true}
        enableStickyHeader={true}
        frozenColumns={2}
        frozenRows={0}
        rowDataBound={(args) => {
          if (args.row) {
            if (args.data.Cuentas < 10) {
              console.log(args, "ARGSSS");
              args.row.classList.add("below-10");
            } else {
            }
          }
        }}
        queryCellInfo={(args) => {
          if (args.column.field === "Saldo") {
            if (args.data.Saldo > 131067969.58) {
              args.cell.style.color = "red";
            } else {
              args.cell.style.color = "dark";
            }
          }

          if (args.column.field === "rubro") {
            const drop = DataUtil.distinct(data, "rubro");
            const val = getValue(args.column.field, args.data);
            ReactDOM.render(
              <div style={{ maxHeight: 15 }}>
                <DropDownListComponent
                  id="dropdown"
                  value={val}
                  dataSource={drop}
                  change={onChange}
                />
              </div>,
              args.cell
            );
          }
        }}
      >
        <Inject
          services={[
            Page,
            Toolbar,
            Edit,
            Reorder,
            Sort,
            ColumnMenu,
            InfiniteScroll,
            Freeze,
          ]}
        />
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
