export default function NGOSupport() {
  return (
    <div>
      <section className="carousel-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            margin: "10px 0px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(4deg, black, #710707)",
              borderRadius: "8px",
              height: "350px",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "36px 100px",
              marginBottom: "24px",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "2.6rem",
                fontWeight: "800",
                marginBottom: 24,
              }}
            >
              NGO Collaboration Hub

            </h1>
            <h3
              style={{
                fontSize: "1.4rem",
                color: "white",
                fontWeight: "400",
                marginBottom: 16,
              }}
            >
              A centralized platform to connect NGOs with AI-driven missing person cases.
            </h3>
            <p
              style={{ fontSize: "1.1rem", color: "white", fontWeight: "300" }}
            >
              Your submission will be securely stored and matched using
              AI-powered face recognition. Please provide clear images and
              accurate information to improve search results.
            </p>
          </div>
        </div>
      </section>
       <NGODirectory />
    </div>
  );
}

const NGODirectory = () => {
  const ngos = [
  {
    id: 1,
    name: "Hope Foundation",
    location: "Hyderabad, Telangana",
    contact: "hopefoundation@gmail.com | +91 98765 43210",
    area: "Telangana, Andhra Pradesh",
    specialization: ["Children", "Elderly"],
    verified: true,
    stats: {
      totalCases: 120,
      successfulReunions: 95,
      activeCases: 25,
      resolutionTimeline: "Avg 18 days",
      aiMatchRate: "87%",
    },
  },
  {
    id: 2,
    name: "Safe Life NGO",
    location: "Bengaluru, Karnataka",
    contact: "safelife@gmail.com | +91 91234 56789",
    area: "Karnataka",
    specialization: ["Women", "Mental Health"],
    verified: true,
    stats: {
      totalCases: 80,
      successfulReunions: 60,
      activeCases: 20,
      resolutionTimeline: "Avg 22 days",
      aiMatchRate: "82%",
    },
  },
  {
    id: 3,
    name: "Care & Rescue",
    location: "Chennai, Tamil Nadu",
    contact: "careandrescue@gmail.com | +91 99887 66554",
    area: "Tamil Nadu",
    specialization: ["Disaster Cases", "Elderly"],
    verified: false,
    stats: {
      totalCases: 40,
      successfulReunions: 28,
      activeCases: 12,
      resolutionTimeline: "Avg 30 days",
      aiMatchRate: "74%",
    },
  },
  {
    id: 4,
    name: "ChildSafe India",
    location: "Delhi",
    contact: "childsafe@india.org | +91 90123 45678",
    area: "Delhi, NCR",
    specialization: ["Children"],
    verified: true,
    stats: {
      totalCases: 200,
      successfulReunions: 170,
      activeCases: 30,
      resolutionTimeline: "Avg 14 days",
      aiMatchRate: "90%",
    },
  },
  {
    id: 5,
    name: "ElderCare Trust",
    location: "Pune, Maharashtra",
    contact: "eldercaretrust@gmail.com | +91 93456 78901",
    area: "Maharashtra",
    specialization: ["Elderly"],
    verified: true,
    stats: {
      totalCases: 95,
      successfulReunions: 72,
      activeCases: 23,
      resolutionTimeline: "Avg 26 days",
      aiMatchRate: "80%",
    },
  },
  {
    id: 6,
    name: "Ujjwala Support Network",
    location: "Mumbai, Maharashtra",
    contact: "ujjwala@support.org | +91 97654 32109",
    area: "Maharashtra, Gujarat",
    specialization: ["Women", "Human Trafficking"],
    verified: true,
    stats: {
      totalCases: 150,
      successfulReunions: 115,
      activeCases: 35,
      resolutionTimeline: "Avg 20 days",
      aiMatchRate: "85%",
    },
  },
  {
    id: 7,
    name: "MindCare Foundation",
    location: "Kolkata, West Bengal",
    contact: "mindcare@gmail.com | +91 88990 11223",
    area: "West Bengal",
    specialization: ["Mental Health"],
    verified: false,
    stats: {
      totalCases: 60,
      successfulReunions: 42,
      activeCases: 18,
      resolutionTimeline: "Avg 32 days",
      aiMatchRate: "71%",
    },
  },
  {
    id: 8,
    name: "Disaster Response India",
    location: "Bhubaneswar, Odisha",
    contact: "dri@ngo.org | +91 90011 22334",
    area: "Odisha, Andhra Pradesh",
    specialization: ["Disaster Cases", "Emergency Relief"],
    verified: true,
    stats: {
      totalCases: 180,
      successfulReunions: 140,
      activeCases: 40,
      resolutionTimeline: "Avg 16 days",
      aiMatchRate: "88%",
    },
  },
  {
    id: 9,
    name: "StreetHope Collective",
    location: "Jaipur, Rajasthan",
    contact: "streethope@gmail.com | +91 95566 77889",
    area: "Rajasthan",
    specialization: ["Homeless", "Children"],
    verified: false,
    stats: {
      totalCases: 55,
      successfulReunions: 38,
      activeCases: 17,
      resolutionTimeline: "Avg 28 days",
      aiMatchRate: "76%",
    },
  },
  {
    id: 10,
    name: "Samarpan Seva Trust",
    location: "Patna, Bihar",
    contact: "samarpanseva@ngo.org | +91 98877 66554",
    area: "Bihar, Jharkhand",
    specialization: ["Children", "Elderly", "Women"],
    verified: true,
    stats: {
      totalCases: 110,
      successfulReunions: 85,
      activeCases: 25,
      resolutionTimeline: "Avg 24 days",
      aiMatchRate: "83%",
    },
  },
];


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>NGO Directory & Verification</h2>
      <p style={styles.subHeading}>
        Verified NGOs with real-time impact statistics for missing person cases
      </p>

      <div style={styles.cardContainer}>
        {ngos.map((ngo) => (
          <div key={ngo.id} style={styles.card}>
            {/* NGO Header */}
            <div style={styles.header}>
              <h3 style={styles.ngoName}>{ngo.name}</h3>
              {ngo.verified && (
                <span style={styles.verifiedBadge}>✔ Verified</span>
              )}
            </div>
            <hr />

            {/* NGO Details */}
            <p><strong>📍 Location:</strong> {ngo.location}</p>
            <p><strong>📞 Contact:</strong> {ngo.contact}</p>
            <p><strong>🗺 Area:</strong> {ngo.area}</p>

            {/* Specialization Tags */}
            <div style={styles.tagsContainer}>
              {ngo.specialization.map((tag, index) => (
                <span key={index} style={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Statistics Section */}
            <div style={styles.statsContainer}>
              <h4 style={styles.statsHeading}>📊 NGO Statistics</h4>
              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <p style={styles.statNumber}>{ngo.stats.totalCases}</p>
                  <p style={styles.statLabel}>Total Cases</p>
                </div>
                <div style={styles.statBox}>
                  <p style={styles.statNumber}>{ngo.stats.successfulReunions}</p>
                  <p style={styles.statLabel}>Reunions</p>
                </div>
                <div style={styles.statBox}>
                  <p style={styles.statNumber}>{ngo.stats.activeCases}</p>
                  <p style={styles.statLabel}>Active</p>
                </div>
                <div style={styles.statBox}>
                  <p style={styles.statNumber}>{ngo.stats.aiMatchRate}</p>
                  <p style={styles.statLabel}>AI Match</p>
                </div>
              </div>

              <p style={styles.timelineText}>
                ⏱ Case Resolution Timeline:{" "}
                <strong>{ngo.stats.resolutionTimeline}</strong>
              </p>
            </div>

            {!ngo.verified && (
              <p style={styles.pendingText}>⏳ Verification Pending</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#d4f4ee",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#1f2937",
  },
  subHeading: {
    textAlign: "center",
    color: "#4b5563",
    marginBottom: "30px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "40px",
    margin:"100px"
  },
  card: {
    backgroundColor: "#d4f4ee",
    padding: "20px",
    borderRadius: "14px",
    border:"1px solid black",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ngoName: {
    margin: 0,
    color: "#111827",
  },
  verifiedBadge: {
    backgroundColor: "#16a34a",
    color: "#ffffff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  tagsContainer: {
    marginTop: "10px",
  },
  tag: {
    display: "inline-block",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    marginRight: "6px",
    marginTop: "6px",
  },
  statsContainer: {
    marginTop: "16px",
    backgroundColor: "#f9fafb",
    padding: "14px",
    borderRadius: "10px",
  },
  statsHeading: {
    margin: "0 0 10px 0",
    color: "#111827",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  statBox: {
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  statNumber: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
    color: "#1d4ed8",
  },
  statLabel: {
    fontSize: "12px",
    color: "#4b5563",
    margin: 0,
  },
  timelineText: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#374151",
  },
  pendingText: {
    marginTop: "10px",
    color: "#dc2626",
    fontSize: "13px",
  },
};


