import "./DataGridModal.css";
export const DataGridModal = ({
  editingColumn,
  editingColumnText,
  setEditingText,
  setIsDialogVisible,
  setEditingColumn,
  handleSaveColumnName,
}) => {
  return (
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
  );
};
