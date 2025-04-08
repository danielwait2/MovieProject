

const HomePage = () => {
    
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand fs-3 fw-bold text-danger" href="#">
          CineNiche
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Movies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Create Account
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="hero-text text-white">
          <h1 className="display-3 fw-bold">Unlimited movies, TV shows, and more.</h1>
          <p className="fs-5 mt-3">Watch anywhere. Cancel anytime.</p>
          <button className="btn btn-danger btn-lg mt-4">Get Started</button>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
