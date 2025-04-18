import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { JwtCustomPayload } from "../../types/common";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "sadaora_app_super_secret";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(
  options,
  async (jwtPayload: JwtCustomPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      console.log("✅ Authenticated user:", user);
      return done(null, { id: user.id, email: user.email });
    } catch (err) {
      return done(err, false);
    }
  }
);

passport.use(jwtStrategy);
export default passport;
