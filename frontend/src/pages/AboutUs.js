import React from "react";

const AboutUs = () => {
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
        background: "#faf9f4",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HERO */}

        <div
          style={{
            background: "FFF1D3",
            borderRadius: "35px",
            padding: "80px 40px",
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "700",
              color: "#e91e63",
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
              color: "#2c4d2c",
            }}
          >
            TrendCart was born from a love for slow fashion — timeless pieces
            that honour both the wearer and the planet.
          </p>
        </div>

        {/* STORY */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "3rem",
                color: "#e91e63",
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

          <div>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
              alt="about"
              style={{
                width: "100%",
                height: "650px",
                objectFit: "cover",
                borderRadius: "35px",
              }}
            />
          </div>
        </div>

        {/* PRINCIPLES */}

        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontSize: "3rem",
              marginBottom: "40px",
              color: "#e91e63",
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
                  background: "#fff",
                  borderRadius: "25px",
                  padding: "40px 25px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "20px",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    marginBottom: "15px",
                    fontSize: "1.7rem",
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

        {/* QUOTE */}

        <div
          style={{
            background: "#EFE3CA",
            borderRadius: "35px",
            padding: "40px 30px",
maxHeighht: "10px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              color: "#6b6b45",
              marginBottom: "10px",
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
              color: "#1f1f1f",
            }}
          >
            Fashion should never feel like a compromise — between style and
            conscience, between comfort and elegance. At TrendCart, we make
            sure you get both.
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#333",
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