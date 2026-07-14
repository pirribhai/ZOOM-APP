let IS_PROD = false;
const server = IS_PROD ?
    "YOUR_RENDER_BACKEND_URL" :

    "http://localhost:5000"


export default server;