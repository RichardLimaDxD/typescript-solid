import app from "./app";
import env from "./env";

const port: number = env.PORT ?? 3333;

app.listen({ host: "0.0.0.0", port }).then(() => {
  console.log(`🚀 Server is running on port ${port}`);
});
