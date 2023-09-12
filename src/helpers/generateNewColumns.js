import { v4 as uuidv4 } from "uuid";

export const generateNewColumns = (prevColumns) => {
    const saldoContableCount = prevColumns.filter(col => col.headerText.startsWith("Saldo Contable anterior")).length;
    const variacionCount = prevColumns.filter(col => col.headerText.startsWith("Variación")).length;

    return Array.from({length:3}, (_, index) => {
        let headerText;

        if (index === 0){
            headerText = `Saldo Contable anterior ${saldoContableCount + 1}`;
        } else if (index === 1){
            headerText = `Variación ${variacionCount + 1}`;
        } else {
            headerText = `Variacion % ${variacionCount + 1}`;
        }

        return{
            field: uuidv4(),
            headerText: headerText,
            textAlign: "right",
            width: 150,
            allowEditing: true,
        }
    })
}