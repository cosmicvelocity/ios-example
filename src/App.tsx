import {FC, useState} from "react";
import {produce} from "immer";

export const App: FC = () => {
  const [inputs, setInputs] = useState(() => Array.from({length: 20}).map(() => ""));
  const [focus, setFocus] = useState(false);

  return (
    <div
      style={{
        // フォーカス中に親要素に下方向の余白を入れる事で、領域外の色が表示されるのを軽減する。
        paddingBottom: focus ? "300px" : "0"
      }}
    >
      <header>
        <h1>iOS Example</h1>
      </header>
      <div style={{marginTop: "40px"}}></div>
      <div>
        {inputs.map((_, i) => {
          return (
            <div
              key={i}
              style={{
                padding: "8px"
              }}
            >
              <label htmlFor={`input-${i}`}>ラベル {i + 1}</label>
              <div>
                <input
                  id={`input-${i}`}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onChange={(e) => {
                    setInputs(produce((draft) => {
                      draft[i] = e.target.value;
                    }));
                  }}
                  style={{
                    fontSize: "16px",
                    width: "100%",
                  }}
                  type="text"
                  value=""
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <button>ボタン</button>
      </div>
    </div>
  );
};
