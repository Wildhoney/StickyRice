import starwars from "starwars";
import { nanoid } from "nanoid";
import * as e from "./styles";
import Text from "../Text";

export default function Table() {
  return (
    <e.Table>
      <thead>
        <tr>
          <e.TH size="auto">Image</e.TH>
          <e.TH size="auto">ID</e.TH>
          <e.TH size="200px">Price</e.TH>
          <e.TH size="10vw">Tagline</e.TH>
          <e.TH size="25vw">Description</e.TH>
          <e.TH size="auto">Actions</e.TH>
        </tr>
      </thead>

      <tbody>
        {new Array(3).fill(null).map((_, index) => (
          <tr key={`row_${index}`}>
            <e.TD>
              <img
                key={`image_${index}`}
                src={`https://picsum.photos/200?hash=${index}`}
              />
            </e.TD>
            <e.TD>ID_{nanoid()}</e.TD>
            <e.TD>1</e.TD>
            <e.TD>{starwars()}</e.TD>
            <e.TD>
              {/* <Text /> */}
            </e.TD>
            <e.TD>
              <button
                style={{ pointerEvents: "all" }}
                onClick={() => alert("Bought!")}
              >
                Buy
              </button>
            </e.TD>
          </tr>
        ))}
      </tbody>
    </e.Table>
  );
}
