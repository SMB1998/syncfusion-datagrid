import "./App.css";
import DataGrid from "../components/DataGrid";
import {data} from "../data/variaciones";
import { orderColumns } from "../data/dataSource";

function App() {
  return (
    <div>
      <DataGrid gridColumns={orderColumns} data={data} />
    </div>
  );
}

export default App;
