import "./App.css";
import EditContact from "./EditContact";

function App() {
  const handleSave = (updatedContact) => {
    console.log("Contact saved:", updatedContact);
  };

  return (
    <div className="App">
      <EditContact
        savedContact={{ id: 1, name: "Jane Doe", email: "jane@example.com" }}
        onSave={handleSave}
      />
      <EditContact
        savedContact={{ id: 2, name: "Jane Doe", email: "jane@example.com" }}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
