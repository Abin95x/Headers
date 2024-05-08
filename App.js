const App = () => {
  const [number, setNumber] = React.useState("");
  const [responseData, setResponseData] = React.useState(null);

  const handleInputChange = (e) => {
    const inputNumber = e.target.value;
    if (!isNaN(inputNumber)) {
      setNumber(inputNumber);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://chimpu.xyz/api/post.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number }),
    })
      .then((res) => {
        if (res.ok) {
          const headers = Array.from(res.headers.entries());
          setResponseData(headers);
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          pattern="[0-9]*"
          className="border border-gray-400 rounded-md p-2 mb-4"
          placeholder="Enter mobile number"
          value={number}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 mx-4 rounded"
        >
          Submit
        </button>
      </form>
      {responseData && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Response Headers:</h2>
          <ul>
            {responseData.map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
