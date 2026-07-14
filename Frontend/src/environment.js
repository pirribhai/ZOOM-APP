let IS_PROD = true;

const server = IS_PROD
  ? "https://zoom-app-pw9u.onrender.com"
  : "http://localhost:5000";

export default server;