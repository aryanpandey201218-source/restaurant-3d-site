import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import menu from "../data/menu.json";

// 3D ROTATING OBJECT
function RotatingBox() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return ( 
    <mesh ref={mesh}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // Load reviews
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(saved);
  }, []);

  // Add review
  const addReview = () => {
    const newReviews = [...reviews, { name, text }];
    setReviews(newReviews);
    localStorage.setItem("reviews", JSON.stringify(newReviews));
    setName("");
    setText("");
  };

  return (
    <div style={{ fontFamily: "Arial" }}>

      {/* HERO + 3D */}
      <section style={{ height: "100vh" }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingBox />
          <OrbitControls />
        </Canvas>
        <h1 style={{ position: "absolute", top: 20, left: 20 }}>
          My Restaurant
        </h1>
      </section>

      {/* MENU */}
      <section style={{ padding: "20px" }}>
        <h2>Menu</h2>
        {Object.keys(menu).map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            {menu[category].map((item, i) => (
              <div key={i}>
                <img src={item.image} width="120" />
                <p>{item.name} - {item.price}</p>
                <small>{item.description}</small>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "20px" }}>
        <h2>Reviews</h2>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <textarea
          placeholder="Your Review"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />

        <button onClick={addReview}>Submit</button>

        {reviews.map((r, i) => (
          <div key={i}>
            <strong>{r.name}</strong>
            <p>{r.text}</p>
          </div>
        ))}
      </section>

      {/* BOOKING */}
      <section style={{ padding: "20px" }}>
        <h2>Book a Table</h2>

        <input placeholder="Name" /><br />
        <input placeholder="Phone" /><br />
        <input type="date" /><br />
        <input type="time" /><br />
        <input placeholder="Guests" /><br />

        <button>Book Now</button>
      </section>

      {/* LOCATION */}
      <section style={{ padding: "20px" }}>
        <h2>Location</h2>
        <iframe
          src="https://www.google.com/maps?q=kolkata&output=embed"
          width="100%"
          height="300"
        ></iframe>
      </section>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "green",
          color: "white",
          padding: "10px",
          borderRadius: "5px"
        }}
      >
        Chat on WhatsApp
      </a>

    </div>
  );
}