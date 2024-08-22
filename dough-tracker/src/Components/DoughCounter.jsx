import { useState } from "react";
import "./DoughCounter.css";

export default function DoughCounter() {
  const INITIAL_FORM_STATE = {
    date: "",
    pulled: 0,
    proofed: 0,
    rolled: 0,
  };

  const [inventory, setInventory] = useState(INITIAL_FORM_STATE);
  const [rows, setRows] = useState([]);
  const [desired, setDesired] = useState(0);
  const [onhand, setOnhand] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === 'date' ? value : Number(value);

    setInventory(prevInventory => ({
      ...prevInventory,
      [name]: newValue,
    }));
  };

  const handleDesiredChange = (event) => {
    setDesired(Number(event.target.value));
  };

  const handleOnhandChange = (event) => {
    setOnhand(Number(event.target.value));
  };

  function addToTable(event) {
    event.preventDefault();
    setRows(prevRows => [...prevRows, { ...inventory, desired, onhand }]);
    setInventory(INITIAL_FORM_STATE);
  }

  const calculateSuggested = () => {
    if (rows.length === 0) return 0;

    const lastRow = rows[rows.length - 1];
    const { pulled, rolled, proofed } = lastRow;

    const suggested = desired - (onhand + (pulled + rolled + proofed) / 32);
    return Math.round(suggested * 2) / 2; // Round to nearest 0.5
  };

  const calculateTotal = (row) => row.pulled + row.proofed + row.rolled;

  return (
    <>
      <form onSubmit={addToTable} className="form-container">
        <fieldset>
          <div className="form-field">
            <label htmlFor="date-input">Date:</label>
            <input
              className="input"
              id="date-input"
              type="date"
              name="date"
              value={inventory.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="pulled-input">Pulled:</label>
            <input
              className="input"
              id="pulled-input"
              name="pulled"
              type="number"
              min={0}
              value={inventory.pulled}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="proofed-input">Proofed:</label>
            <input
              className="input"
              id="proofed-input"
              type="number"
              min={0}
              name="proofed"
              value={inventory.proofed}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="rolled-input">Rolled:</label>
            <input
              className="input"
              id="rolled-input"
              type="number"
              min={0}
              name="rolled"
              value={inventory.rolled}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="button">Add Inventory</button>
        </fieldset>
      </form>

      <div className="static-fields">
        <div className="form-field">
          <label htmlFor="desired-static">Desired Cases:</label>
          <input
            className="input"
            id="desired-static"
            type="number"
            min={0}
            value={desired}
            onChange={handleDesiredChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="onhand-static">Cases On-hand:</label>
          <input
            className="input"
            id="onhand-static"
            type="number"
            min={0}
            value={onhand}
            onChange={handleOnhandChange}
          />
        </div>
      </div>

      {rows.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Pulled</th>
                <th>Proofed</th>
                <th>Rolled</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((existingRow, index) => (
                <tr key={index}>
                  <td>{existingRow.date}</td>
                  <td>{existingRow.pulled}</td>
                  <td>{existingRow.proofed}</td>
                  <td>{existingRow.rolled}</td>
                  <td>{calculateTotal(existingRow)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="floating-fields">
            <p><strong>Suggested Cases To Order:</strong> {calculateSuggested()}</p>
          </div>
        </>
      )}
    </>
  );
}
