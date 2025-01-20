import {Spacer} from "@nextui-org/react";
import CifrasCard1 from "./CifrasCard1";
import CifrasCard2 from "./CifrasCard2";
import CifrasCard3 from "./CifrasCard3";

export default function App() {
  return (
    <div className="flex">
      <CifrasCard1 />
      <Spacer x={32} />
      <CifrasCard2 />
      <Spacer x={32} />
      <CifrasCard3 />
    </div>
  );
}