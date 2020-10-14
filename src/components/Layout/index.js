import Text from "../Text";
import * as e from "./styles";

export default function Layout({ children }) {
  return (
    <e.Container>
      <e.Layout>
        <e.Title>🍚 &lt;StickyRice /&gt;</e.Title>

        {new Array(5).fill(null).map((_, index) => (
          <Text key={`text_0_${index}`} />
        ))}

        <e.Raised>{children}</e.Raised>

        {new Array(10).fill(null).map((_, index) => (
          <Text key={`text_1_${index}`} />
        ))}
      </e.Layout>
    </e.Container>
  );
}
