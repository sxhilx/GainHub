import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleAuthService } from "../models/authModel.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
  },
   async (accessToken, refreshToken, profile, done) => {   

    try {
        const email = profile.emails[0].value;
        const fullname = profile.displayName;

        if (!email) {
        return done(new Error("Email not found in Google profile"), null);
        }

        const { user } = await googleAuthService({ email, fullname });
        done(null, user);
    } catch (error) {
        console.log(error, "ERROR");        
        done(error, null)
    }

  }
));