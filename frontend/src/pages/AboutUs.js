import React from "react";

// Colors completely matched to the premium navy-to-raspberry gradient
const COLORS = {
  backgroundWhite: "#FFFFFF",
  gradientStart: "#2c3e50", // Deep Navy Blue
  gradientEnd: "#802060",   // Rich Deep Raspberry
  deepNavy: "#2c3e50",
  lightText: "#f1f1f1",
  polishedGold: "#FFD700",
  goldFrameBorder: "#D4AF37",
};

const AboutUs = () => {
  // Functionality explicitly preserved
  const principles = [
    {
      icon: "🌿",
      title: "Eco-first",
      text: "100% plastic-free packaging, sustainable materials, and responsible sourcing.",
    },
    {
      icon: "🤝",
      title: "Ethical making",
      text: "Fair wages, safe workplaces, and long-term partnerships with artisans.",
    },
    {
      icon: "♾️",
      title: "Timeless design",
      text: "Built to last with quality, comfort, and elegance.",
    },
    {
      icon: "🌳",
      title: "Climate positive",
      text: "Supporting environmental initiatives with every purchase.",
    },
  ];

  return (
    <div
      style={{
        background: COLORS.backgroundWhite,
        minHeight: "100vh",
        padding: "40px 0",
        fontFamily: "'Playfair Display', serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HERO SECTION - Exact same gradient as Quote Box */}
        <div
          style={{
            background: `linear-gradient(to right, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
            borderRadius: "35px",
            padding: "80px 40px",
            textAlign: "center",
            marginBottom: "70px",
            boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "700",
              color: COLORS.backgroundWhite,
              marginBottom: "25px",
              lineHeight: "1.2",
            }}
          >
            Rooted in nature,
            <br />
            woven with purpose
          </h1>

          <p
            style={{
              fontSize: "1.4rem",
              maxWidth: "900px",
              margin: "0 auto",
              color: COLORS.lightText,
            }}
          >
            TrendCart was born from a love for slow fashion — timeless pieces
            that honour both the wearer and the planet.
          </p>
        </div>

        {/* STORY SECTION - With 2 Overlapping/Collage Images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "3rem",
                color: COLORS.deepNavy,
                marginBottom: "30px",
              }}
            >
              Our story
            </h2>

            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "2",
                color: "#222",
                marginBottom: "20px",
              }}
            >
              Founded in 2026, TrendCart began as a small atelier dedicated to
              creating women's clothing that feels effortless and intentional.
              We believe that what you wear should be a reflection of your
              values — comfort, quality, and sustainability.
            </p>

            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "2",
                color: "#222",
                marginBottom: "20px",
              }}
            >
              Every garment is crafted with organic fibres, low-impact dyes, and
              ethical manufacturing. We work closely with family-owned mills and
              artisans who share our vision for a more transparent fashion
              industry.
            </p>

            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "2",
                color: "#222",
              }}
            >
              From thoughtful design to responsible sourcing, we create pieces
              that stand beyond trends and support a conscious lifestyle.
            </p>
          </div>

          {/* TWO IMAGES DISPLAY (Asymmetric Editorial Style Layout) */}
          <div 
            style={{ 
              position: "relative", 
              height: "650px",
              width: "100%"
            }}
          >
            {/* First Image (Top-Left Background Layer) */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "65%",
                height: "450px",
                border: `4px solid ${COLORS.goldFrameBorder}`,
                borderRadius: "25px",
                padding: "8px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                background: "#fff",
                zIndex: 1,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                alt="about main"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "18px",
                }}
              />
            </div>

            {/* Second Image (Bottom-Right Foreground Layer) */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "60%",
                height: "400px",
                border: `4px solid ${COLORS.goldFrameBorder}`,
                borderRadius: "25px",
                padding: "8px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                background: "#fff",
                zIndex: 2,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d" // Dynamic Second fashion image
                alt="about detail"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "18px",
                }}
              />
            </div>
          </div>
        </div>

        {/* PRINCIPLES SECTION */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontSize: "3rem",
              marginBottom: "40px",
              color: COLORS.deepNavy,
            }}
          >
            Our guiding principles
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "30px",
            }}
          >
            {principles.map((item, index) => (
              <div
                key={index}
                style={{
                  background: COLORS.backgroundWhite,
                  borderRadius: "25px",
                  border: `2px solid ${COLORS.goldFrameBorder}`,
                  padding: "40px 25px",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "3.5rem",
                    marginBottom: "20px",
                    color: COLORS.polishedGold,
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    marginBottom: "15px",
                    fontSize: "1.7rem",
                    color: COLORS.deepNavy,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#444",
                    lineHeight: "1.7",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QUOTE SECTION */}
        <div
          style={{
            background: `linear-gradient(to right, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
            borderRadius: "35px",
            padding: "60px 40px",
            textAlign: "center",
            boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              color: COLORS.polishedGold,
              marginBottom: "20px",
            }}
          >
            ❝
          </div>

          <p
            style={{
              fontSize: "2rem",
              fontStyle: "italic",
              maxWidth: "900px",
              margin: "0 auto 25px",
              lineHeight: "1.6",
              color: COLORS.backgroundWhite,
            }}
          >
            Fashion should never feel like a compromise — between style and
            conscience, between comfort and elegance. At TrendCart, we make
            sure you get both.
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              color: COLORS.polishedGold,
              fontWeight: "bold",
            }}
          >
            — Elena V., founder & creative director
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;