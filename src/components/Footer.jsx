function Footer() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        padding: "20px",
        borderTop: "1px solid #ddd",
      }}
    >
      <h3>Anushka Gangwar</h3>
      <p>anushkagangwar987@gmail.com</p>

      <a
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Built for Digital Heroes
        </button>
      </a>
    </div>
  );
}

export default Footer;