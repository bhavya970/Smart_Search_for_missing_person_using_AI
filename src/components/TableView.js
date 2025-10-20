import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./Gallery/Gallery.css";

const columns = [
    {
        name: "Photo",
        selector: row => <img src={row.imageUrl} alt={row.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "6px" }} />,
        sortable: false,
        width: "80px"
    },
    {
        name: "Name",
        selector: row => row.name,
        sortable: true,
    },
    {
        name: "Age",
        selector: row => row.age,
        sortable: true,
        // width: "70px"
    },
    {
        name: "Gender",
        selector: row => row.gender,
        sortable: true,
        // width: "90px"
    },
    {
        name: "Reward",
        selector: row => `₹${row.reward}`,
        sortable: true,
        // width: "100px"
    },
    {
        name: "Description",
        selector: row => (String(row.description ?? "").trim() ? row.description : "--"),
        sortable: false,
        grow: 2
    },
    {
        name: "Address",
        selector: row => `${row.city} , ${row.state}`,
        sortable: false,
        grow: 2
    },
    {
        name: "Likes",
        selector: row => row.likeCount,
        sortable: true,
        // width: "80px"
    }
];

const TableView = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/cases/${sessionStorage.getItem("userId")}`)
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter logic
  const filteredCases = cases.filter(item => {
    const matchesSearch =
      item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.description?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.state?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.city?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.country?.toLowerCase().includes(filterText.toLowerCase());
    const matchesGender = genderFilter ? item.gender === genderFilter : true;
    return matchesSearch && matchesGender;
  });

const customStyles = {
    table: {
        style: {
            border: "2px solid black",
            // borderCollapse: "collapse",
        },
    },
    tableWrapper: {
        style: {
            border: "2px solid black",
        },
    },
    headCells: {
        style: {
            fontSize: "16px",
            fontWeight:"700",
            fontFamily: "cursive",
            fontStyle: "italic",
            border: "2px solid black",
        },
    },
    cells: {
        style: {
            border: "2px solid black",
        },
    },
    pagination: {
        style: {
            border: "2px solid black",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        pageButtonsStyle: {
            // border: "2px solid black",
            padding: "6px 10px",
            borderRadius: "4px",
            margin: "0 4px",
            cursor: "pointer",
        },
    },
};

const [stateFilter, setStateFilter] = useState("");

// derive unique states for the dropdown
const uniqueStates = Array.from(
    new Set(
        cases
            .map((c) => (c.state ?? "").trim())
            .filter((s) => s.length > 0)
    )
).sort((a, b) => a.localeCompare(b));

// apply state filter on top of existing filteredCases
const displayedCases = filteredCases.filter((item) =>
    stateFilter ? (item.state ?? "").trim() === stateFilter : true
);

return (
    <div className="gallery-section">
        <h2>Missing Persons Gallery</h2>
        <div
            style={{
                display: "flex",
                gap: "16px",
                marginBottom: "16px",
                background: "#d4f4ee",
                padding: "100px",
                flexDirection: "column",
                borderRadius: "8px",
            }}
        >
            <div style={{ alignSelf: "flex-start", display: "flex", gap: "12px", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{
                        padding: "8px",
                        width: "250px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        minWidth: "160px",
                    }}
                >
                    <option value="">All States</option>
                    {uniqueStates.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            <DataTable
                columns={columns}
                data={displayedCases}
                progressPending={loading}
                pagination
                highlightOnHover
                pointerOnHover
                responsive
                striped
                noHeader
                customStyles={customStyles}
            />
        </div>
    </div>
);
};

export default TableView;