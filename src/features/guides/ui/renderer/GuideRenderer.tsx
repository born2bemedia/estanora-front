import type { Children } from "../../model/types";
import { GuideContent } from "../content/GuideContent";

export const GuideRenderer = ({ content }: { content: Children[] }) => (
  <>
    {!Array.isArray(content) ? null : (
      <>
        {content.map((node, i) => (
          <GuideContent
            key={String(`node-${i}`)}
            node={node}
            type={node.type}
          />
        ))}
      </>
    )}
  </>
);
