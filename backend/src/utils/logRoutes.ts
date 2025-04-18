import expressListRoutes from "express-list-routes";

export const logAllRoutes = (app: any) => {
  console.log("📦 Available API Endpoints:");
  expressListRoutes(app);
};
