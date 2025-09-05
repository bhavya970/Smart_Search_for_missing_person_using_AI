import { useEffect, useState } from "react";

export default function Component1() {
    const text = "India's first One Click Solution for finding Missing Persons";
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
                    An easy-to-use collaborative platform for Police, NGOs, Social Workers, and families to get instant search results. Families are automatically notified when missing loved ones are found, ensuring a seamless and efficient process.
                </p>
            </div>

            <div
                style={{
                    height: "330px",
                    borderRadius: "36% / 74%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                    marginRight: "100px"
                }}
            >
                <img
                    src="/images/image1.png"
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