// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const mongoose = require('mongoose');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { googleAuth, session: sessionConfig } = require('./Config/Mongoconfig.js');
// const routes = require('./Routes/routes.js');
// const User = require('./Model/model.js');

// mongoose.connect('mongodb://localhost:27017/sso', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// passport.use(new GoogleStrategy(googleAuth, (accessToken, refreshToken, profile, done) => {
//     User.findOne({ googleId: profile.id }, (err, user) => {
//         if (err) {
//             return done(err);
//         }
//         if (!user) {
//             user = new User({
//                 googleId: profile.id,
//                 displayName: profile.displayName,
//                 email: profile.emails[0].value
//             });
//             user.save(err => {
//                 if (err) console.log(err);
//                 return done(err, user);
//             });
//         } else {
//             return done(err, user);
//         }
//     });
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

// const app = express();

// app.use(session(sessionConfig));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/', routes);

// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleAuth, session: sessionConfig } = require('./Config/Mongoconfig.js');
const routes = require('./Routes/routes.js');
const User = require('./Model/model.js');

mongoose.connect('mongodb://localhost:27017/sso', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

passport.use(new GoogleStrategy(googleAuth, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value
            });
            user.save(err => {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

const app = express();

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to log errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
app.use('/api',routes);
module.exports = app;

