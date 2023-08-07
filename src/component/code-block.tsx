import { Highlight, themes } from 'prism-react-renderer';
import React, { memo } from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = (props) => {
  const { code } = props;

  return (
    <Highlight theme={themes.vsDark} code={code} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style, fontSize: 16, padding: 20 }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default memo(CodeBlock);
