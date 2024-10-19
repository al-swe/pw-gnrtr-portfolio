import { useState } from "react";
import "./App.css";

function App() {
  const [api, setApi] = useState(
    "https://password-generator-fs-backend.vercel.app"
  );

  const [defaultLength, setDefaultLength] = useState(12);
  const [result, setResult] = useState("");
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLengthChange = (event) => {
    setDefaultLength(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const length = event.target.elements.number.value;

    const apiUrlWithLength = `${api}/?length=${length}`;

    try {
      const response = await fetch(apiUrlWithLength);
      const result = await response.json();

      setResult(result.password);
      setVisible(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  function handleCopy() {
    const el = document.createElement("textarea");
    el.value = result;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="number">Password length</label>
            <input
              type="number"
              min={8}
              max={128}
              id="number"
              value={defaultLength}
              onChange={handleLengthChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={loading ? "generate-disabled" : ""}
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              "Generate"
            )}
          </button>
        </form>

        <div className={`result ${visible ? "visible" : ""}`}>
          <p>{result}</p>
          <button onClick={handleCopy}>
            <i className="fa-regular fa-copy"></i>
            <span className={`copied ${copied ? "visible" : ""}`}>Copied!</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
