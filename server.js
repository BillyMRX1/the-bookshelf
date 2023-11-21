import Hapi from "@hapi/hapi";
import booksRoutes from "./routes/books-routes.js";

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route(booksRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
