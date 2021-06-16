import * as React from "react"
import { Link } from "gatsby"

const Tags = (props) => {
  const tags = props.data.map((text) => {
    return (
      <li style={{listStyle:'none', display: 'inline-block', margin: '0 1em'}}>
        {/* NOTE: リンク先をtextで指定してていいのか……そもそもテキストをtag名として登録してるからいいのか */}
        <Link to={`tags/${text}`}>{text}</Link>
      </li>
    );
  });

  return (
    <ul>
      {tags}
    </ul>
  );
}

export default Tags
