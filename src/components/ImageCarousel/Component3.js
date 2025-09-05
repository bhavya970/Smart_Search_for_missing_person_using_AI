import { useEffect, useState } from "react";

export default function Component3() {
    const text = "Upload Unknown Person Photo";
    const typingSpeed = 150; // ms per character

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i === text.length) clearInterval(interval);
        }, typingSpeed);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ background: "linear-gradient(4deg, black, #710707)", borderRadius: "8px", height: "500px", width: "100vw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            
            <div style={{ marginLeft: "100px", width: "50vw", color: "white" }}>
                <h2 style={{ color: "white", fontSize: "2.2rem", fontWeight: "700" }}>
                    {displayedText}
                    <span style={{ borderRight: "2px solid white", marginLeft: "2px", animation: "blink 1s steps(1) infinite" }}>&nbsp;</span>
                </h2>
                <p style={{ fontSize: "1.1rem", fontWeight: "400" }}>
                    NGOs, Child care institutions, shelters homes, and social workers can easily upload unidentified person details on the platform to help find their families.
                </p>
            </div>

            <div
                style={{
                    height: "330px",
                   width:"400px",
                   borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                    marginRight: "100px"
                }}
            >
                <img
                    src="/images/image3.png"
                    alt="family"
                    style={{
                        width: "100%",
                        height: "100%",
                        // objectFit: "cover"
                    }}
                />
            </div>

            
            <style>
                {`
                    @keyframes blink {
                        0% { opacity: 1; }
                        50% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
}