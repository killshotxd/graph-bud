import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero containerWrap min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=494&q=80"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">COMPANY</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              onClick={() => navigate("/company")}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
