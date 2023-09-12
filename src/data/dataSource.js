export const orderColumns = [
  {
    field: "Cuentas",
    headerText: "Código de Cuenta",
    textAlign: "Left",
    validationRules: { required: true, number: true },
    width: 100,
    defaultValue: "",
    template: (props) => {
      return props.Cuentas;
    },
  },
  {
    field: "Descripción",
    headerText: "Nombre de la cuenta",
    validationRules: { required: true },
    width: 180,
    defaultValue: "",
    textAlign: "Left",
  },
  {
    field: "Saldo",
    headerText: "Saldo contable",
    validationRules: { required: true },
    width: 200,
    defaultValue: "",
    textAlign: "Right",
    template: (props) => {
      const formattedSaldo = props.Saldo.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
      });
      return props.Saldo > 131067969.58 ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <i className="e-icons e-warning" style={{ color: "red" }}></i>
          {formattedSaldo}
        </div>
      ) : (
        <>{formattedSaldo}</>
      );
    },
  },

  {
    field: "p1",
    headerText: "Ajustes y reclasificaciones",
    textAlign: "Center",
    width: 200,
    columns: [
      {
        field: "haber",
        headerText: "HABER",
        textAlign: "Right",
        validationRules: { required: true, number: true },
        width: 110,
        defaultValue: "",
        format: "C2",
      },
      {
        field: "debe",
        headerText: "DEBE",
        textAlign: "Right",
        validationRules: { required: true, number: true },
        width: 110,
        defaultValue: "",
        format: "C2",
      },
    ],
  },
  {
    field: "p2",
    headerText: "Saldo según Auditoría",
    width: 160,
    validationRules: { required: true },
    textAlign: "Right",
    format: "C2",
  },
  {
    field: "p2",
    headerText: "Saldo Contable anterior",
    width: 160,
    validationRules: { required: true },
    textAlign: "Right",
    format: "C2",
  },
  {
    field: "p3",
    headerText: "Variación",
    width: 160,
    defaultValue: "",
    format: "C2",
    textAlign: "Right",
  },
  {
    field: "variacion",
    isPrimaryKey: true,
    headerText: "Varacion %",
    textAlign: "Right",
    validationRules: { required: true, number: true },
    width: 110,
    defaultValue: "",
    format: "p",
  },
  {
    field: "rubro",
    width: 180,
    headerText: "Rubro al que corresponde en el Plan de Auditoria",
    textAlign: "Right",
    editType: "dropdownedit",
    editSettings: {
      showDropdownAlways: true,
    },
  },
];
