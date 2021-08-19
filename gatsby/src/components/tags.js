import * as React from "react"
import { Link } from "gatsby"
import tw, { css } from 'twin.macro'

const Tags = (props) => {
  const tags = props.data.map((text) => {
    return (
      <li css={tagStyles}>
        {/* NOTE: リンク先をtextで指定してていいのか……そもそもテキストをtag名として登録してるからいいのか */}
        <Link to={`tags/${text}`}>{text}</Link>
      </li>
    );
  });

  return (
    <ul css={tw`space-x-4 ml-0`}>
      {tags}
    </ul>
  );
}

export default Tags

const tagStyles = css`
  ${tw`inline-block m-0 px-2 py-1 border rounded text-sm list-none`}
  border-color: var(--color-primary);
`;
