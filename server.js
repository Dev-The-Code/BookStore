
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var ip = require('ip');
const keys = require('./config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);
const moment = require('moment');
const QRCode = require('qrcode');
var session = require('express-session');
var Sequelize = require('sequelize');
const winston = require('winston');
const _ = require("underscore");
//const bcrypt = require('bcrypt');
const saltRounds = 10;
const Op = Sequelize.Op;

const port = process.env.PORT || 8000;
if (process.stdout._handle) process.stdout._handle.setBlocking(true);
const app = express();
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
app.use(cookieParser());



app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// // DB models
require('./models/User');
require('./models/category');
require('./models/businessyellowpages');
require('./models/posttoclassified');
require('./models/profile');
require('./models/roommatesSchema');
require('./models/categoryclassified');
require('./models/reviews');
require('./models/sendmessage');
require('./models/facebookLoginSchema');
require('./models/blog');
require('./models/jobPortalSchema');
require('./models/jobAppliedSchema');
require('./models/blogReviews');
require('./models/eventPortalSchema');
require('./models/eventTicketSchema');
require('./models/eventseatvenue');
require('./models/userVideos');
require('./models/postyourproduct');
require('./models/ecommerceProductRating');
require('./models/ecommercePayment');
require('./models/shopCollection');
require('./models/orderListCollection');
require('./models/postProduct');


require('./config/passport');

var User = mongoose.model('User');
var categorypost = mongoose.model('category');
var yellowPagesBusiness = mongoose.model('business');
var classifiedBusiness = mongoose.model('postclassified');
var profiledata = mongoose.model('profiledatabase');
var roomrentsdata = mongoose.model('roomdata');
var categoryclassified = mongoose.model('categoryclassified');
var reviewdata = mongoose.model('reviewschema');
var sendMessage = mongoose.model('sendmessage');
var facebookLogin = mongoose.model('facebookdatabase');
var blog = mongoose.model('blogdata');
var jobPortal = mongoose.model('jobschema');
var jobApplied = mongoose.model('jobApplied');
var blogReview = mongoose.model('blogReviews');
var eventPortal = mongoose.model('EventSchema');
var eventTicket = mongoose.model('EventTicketSchema');
var eventSeats = mongoose.model('EventVenue');
var uerVideos = mongoose.model('customData');
var postecommerce = mongoose.model('postyourproduct');
var ecommerceProductReview = mongoose.model('ecommercereview');
var ecommercerPayment = mongoose.model('ecommercepayment');
var postShopCollection = mongoose.model('shopCollection');
var postOrderListCollection = mongoose.model('orderListCollection');
var postEcomProduct = mongoose.model('postProduct');

var sess;

app.use(passport.initialize());

// //database Development
var configDB = require('./config/database.js');
mongoose.connect(configDB.EvenNodeDB, { useNewUrlParser: true }, function (err, db) {
  if (err) {
    console.log(err);
    db.on('error', console.error.bind(console, 'Database connection failed:'));
  }
  else {
    var db = mongoose.connection;
    console.log("Database :: pakjazba :: connection established successfully.");
  }
})

app.use((req, res, next) => {
  logger.log('info', 'A request was received');
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    console.log('111111111111')
  } else {
    console.log('2222222222222')
    next();
  }
};


// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });

});

app.get('/api/keys', (req, res) => {
  var publicKey = String(keys.stripePulishableKey)
  res.send({
    keys: publicKey
  })
});
/*=========================category List=====================================*/
app.get('/api/categoryPost', (req, res) => {
  var category = req.query.category;
  var date = new Date();
  var category_info = new categorypost({
    categoryName: category,
    insertedDate: date
  })
  category_info.save(function (err, data) {
    res.send({ err: err, data: data });
  })
});

app.post('/api/blogpost', (req, res) => {
  var maintitle = 'GOLD BUT NEVER OLD PAKISTANI DRAMAS',
    subtitle = 'Khuda Ki Basti (1969)';
  image = 'https://res.cloudinary.com/dxk0bmtei/image/upload/v1537355391/Khuda-ki-basti-d_m7jv89.jpg';
  discription = 'This drama is included in the syllabus of drama academies in Pune, India, and Europe It is one of the greatest dramas of all time Pakistan has produced. The drama was focused on the social issues and had a very compelling storyline.';
  var blog_info = new blog({
    maintitle: maintitle,
    subtitle: subtitle,
    image: image,
    description: discription
  });
  blog_info.save(function (err, data) {
    if (data) {
      res.send('blog data inserted');
    }
  })
});

app.get('/api/getblog', sessionChecker, (req, res) => {
  blog.find(function (err, data) {
    res.send({
      blog: data
    })
  })
});

app.get('/api/categoryclassifieddata', function (req, res) {
  categorypost.find(function (err, data) {
    res.send({
      code: 200,
      data: data
    })
  })
});

app.get('/api/getcategory', (req, res) => {
  categorypost.find(function (err, data) {
    res.send({ err: err, data: data });
  })

})


/*========================category List=====================================*/

/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "pakjazbap@gmail.com",
    pass: "pakjazba1234"
  },
  tls: {
    rejectUnauthorized: false
  }

});
var rand, mailOptions, host, link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
/*==================facebooklogin data get start==================*/

app.get('/api/facebookdata', function (req, res) {
  facebookLogin.find(function (err, data) {
    res.send({
      err: err,
      data: data
    })
  })
})

/*==================facebooklogin data get end==================*/
/*=================================user register start==================================*/
app.get('/api/userregister', (req, res) => {

  //var user = new User();

  var nickname = req.query.nickname;
  var email = req.query.email;
  var password = req.query.password;
  var notrobot = req.query.notrobot;
  var date = new Date();
  var ip = req.ip;
  console.log(ip);


  rand = Math.floor((Math.random() * 100) + 54);
  host = req.get('host');
  link = req.protocol + "://" + req.get('host') + "/verify?email=" + email + "&&id=" + rand;
  mailOptions = {
    to: req.query.email,
    subject: "Please confirm your Email account",
    html: `<html style="opacity: 1;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;box-sizing: border-box;border: solid;"><head><title>Verify your Email Address</title></head><body style="width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #555555;"><div class="email-di" style=" width:480px;margin:0 auto;padding:30px;"><table class="email" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;margin: 0;padding: 0;background-color: #FFFFFF;"><tr><td align="center" style="border: 1px groove;color: grey"><table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;margin: 0;padding: 0;"><tr><td><img src="http://res.cloudinary.com/dxk0bmtei/image/upload/v1534159021/pakjazba_f3orb0.png" style="display: block;margin-left: auto;margin-right: auto;"></td> </tr> <tr><td class="email-body" width="100%" style="width: 100%;margin: 0;padding: 0;border-top: 1px solid #FFFFFF;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="width: 570px;margin: 0 auto;padding: 0;"><tr><td class="content" style="padding: 35px;"><h1 style="margin-top: 0;color:#292E31;font-size: 19px;font-weight: bold;text-align: left;">Verify your email address</h1><p style="margin-top: 0;color: #555555;font-size: 16px;line-height: 1.5em;text-align: left;">Welcome to PakJazba! Please confirm your email account by clicking the button below</p><table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" style=" width: 100%;margin: 30px auto;padding: 0;text-align: center;"><tr><td align="center"><div> <a href="${link}" class="button button--blue" style="background-color: #8cbc40; display: inline-block;width: 200px;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: underline;cursor:pointer;">Verify Email</a></div></td> </tr><p style="margin-top: 0;color: #555555;font-size: 16px;line-height: 1.5em;text-align: left;">Team PakJazba<br>Level 23</p><tr><td>
                        <ul style="list-style-type: none;text-align: center;">
                            <li style="float: left;"><a href="#"><p style="align-content: left"><img class="social-icon" src="http://i.imgur.com/oyXO6zq.png" width="30" height="30"></p></a></li>
                            <li style="float: left;"><a href="#"><p class="text-center"><img class="social-icon" src="http://i.imgur.com/AJNmSZs.png" width="30" height="30"></p></a><li>
                            <li style="float: left;"><a href="#"><p class="text-center"><img class="social-icon" src="http://i.imgur.com/GLEVM7N.png" width="30" height="30"></p></a><li>
                      </ul>
                        </td>
                        </tr>
                        </table>

                     <table class="body-sub" style="margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;">
                      <tr>
                        <td>
                          <p class="sub" style="font-size: 12px;">Something not working? Please write to us at support@pakjazba.com.
                            </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="width: 570px;margin: 0 auto;padding: 0;text-align: center;">
                <tr>
                  <td class="content-cell">
                    <p class="sub center" style="text-align:center;">
                     <img src="http://res.cloudinary.com/dxk0bmtei/image/upload/v1534159021/pakjazba_f3orb0.png" style="display: block;margin-left: auto;margin-right: auto;" />
                      <br>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
</body>
</html>`

  }
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);

      res.end("sent");
    }
  });
  console.log(rand)
  // dont remove these encrypt or hash lines.........
  // bcrypt.hash(password, saltRounds, function(err, hash) {

  var user_info = new User({
    username: nickname,
    email: email,
    password: password, // change this to hash when doing work of encryption,
    InsertedDate: date,
    randomno: rand,
    subscribe: false,
    status: false,
    blocked: false
  });

  //res.send({message:user_info,code:200});
  //res.json({token: jwt.sign({ email: user_info.Useremail, _id: user_info._id}, 'RESTFULAPIs')})
  user_info.save(function (err, data) {
    if (err) {
      res.send({
        err: err
      })
    }
    else {
      var facebookLogindata = new facebookLogin({
        email: email,
        name: nickname,
        password: password // change this to hash when doing work of encryption
      })
      facebookLogindata.save(function (err, data) {
        console.log(data);
      })
      res.send({
        _id: user_info._id,
        name: user_info.username,
        email: user_info.email,
        token: jwt.sign({ email: user_info.email, _id: user_info._id }, 'RESTFULAPIs'),
        code: 200
      })
    }
  });
});
// });
// /*============================user register end===========================================*/

app.get('/verify', async function (req, res) {
  let response = await User.findOne({ email: req.query.email });
  console.log(req.protocol + ":/" + req.get('host'));
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {

    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == response.randomno) {
      console.log(response.randomno + 'randdddddddddddddd');
      console.log("email is verified");
      res.end("<h1>Email " + req.query.email + " is been Successfully verified");
    }
    else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  }
  else {
    res.end("<h1>Request is from unknown source");
  }
});

/*--------------------Routing Over----------------------------*/

/*--------------------Forgot password start----------------------------*/

app.post('/api/forgotPassword', (req, res) => {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }

  var host = req.host,
    protocol = req.protocol;
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user === null) {
      res.send({
        code: 403,
        message: 'email not in db'
      })
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      user.username = user.username;
      user.InsertedDate = user.InsertedDate;
      user.subscribe = user.subscribe;
      user.status = user.status;
      user.blocked = user.blocked;
      user._id = user._id;
      user.email = user.email;
      user.password = user.password;
      user.randomno = user.randomno;
      user.profileId = user.profileId;
      user.resetPasswordToken = token;
      user.resetPasswordExpires = moment().format();

      user.save((err, response) => {
        if (!err) {
          const mailOptions = {
            from: 'pakjazbap@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `https://pure-hollows-17968.herokuapp.com/reset/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };

          smtpTransport.sendMail(mailOptions, (err, response) => {
            if (err) {
              res.send({
                code: 404,
                message: 'error'
              })
            } else {
              res.send({
                code: 200,
                message: 'recovery email sent'
              })
            }
          });
        }
      });
    }
  });
});

/*--------------------Forgot password end----------------------------*/

/*--------------------Reset password start----------------------------*/

app.get('/api/reset', (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken
  }).then((user) => {
    if (user == null) {
      res.send({
        code: 403,
        message: 'password reset link is invalid or has expired'
      });
    }
    var time = moment(user.resetPasswordExpires).fromNow();
    if (time == 'an hour ago' || time == "a few seconds ago" || (time.slice(time.indexOf(" ") + 1, time.length)) == "minutes ago") {
      res.send({
        code: 200,
        email: user.email,
        message: 'password reset link a-ok',
      });
    } else {
      res.send({
        code: 403,
        message: 'password reset link is invalid or has expired'
      });
    }
  }).catch((err) => {
    res.send({
      code: 404,
      message: 'password reset link is invalid or has expired'
    })
  });
});

/*--------------------Reset password end----------------------------*/

/*===================Review api start==============================*/
app.post('/api/reviews', function (req, res) {
  var reviews = req.body;

  var review_info = new reviewdata({
    objid: reviews.objId,
    name: reviews.name,
    email: reviews.email,
    message: reviews.message,
    star: reviews.star,
    written: reviews.written,
    userId: reviews.userId,
    profileId: reviews.profileId,
    userImg: reviews.userImg
  })

  review_info.save(function (err, data) {
    if (err) {
      res.send({ error: 'something done wrong' })
    }
    else if (data) {
      res.send({
        code: 200,
        msg: 'reviews added successfully',
        content: data[0]
      })
    }
  })

})


app.get('/api/getreviews', function (req, res) {

  reviewdata.find({ __v: 0 }, function (err, reviews) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      })
    }//end if
    else if (reviews != '') {
      res.send({
        code: 200,
        content: reviews,
        msg: 'all user reviews'
      });
    }//end else if condition
    else {
      res.send({
        code: 404,
        content: 'Not Found',
        msg: 'no user reviews'
      });
    }//end else condition
  })

});


/*==================Review api end=================================*/

/*==================BlogReview api start=================================*/

app.post('/api/addBlogReviews', function (req, res) {
  var reviews = req.body;
  console.log(reviews, '3333333333333333')
  var review_info = new blogReview({
    objId: reviews.objId,
    user: reviews.user,
    comm: reviews.comm,
    userImg: reviews.userImg,
    userId: reviews.userId,
    written: reviews.written
  });

  review_info.save(function (err, data) {
    if (err) {
      res.send({ error: 'something done wrong' })
    }
    else if (data) {
      res.send({
        code: 200,
        msg: 'reviews added successfully',
        content: data
      });
    }
  });
});


app.get('/api/getBlogReviews', function (req, res) {
  blogReview.find({ __v: 0 }, function (err, reviews) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      });
    }//end if
    else if (reviews != '') {
      res.send({
        code: 200,
        content: reviews,
        msg: 'all user reviews'
      });
    }//end else if condition
    else {
      res.send({
        code: 404,
        content: 'Not Found',
        msg: 'no user reviews'
      });
    }//end else condition
  });
});

/*==================BlogReview api end=================================*/



/*========================user signin start==============================================*/
app.get('/api/usersignin', (req, res) => {
  sess = req.session;
  var Useremail = req.query.useremail,
    Password = req.query.password;
  boo = false;
  token = ''

  User.find({ email: Useremail }, { __v: 0 },
    function (err, User) {
      console.log(Password, User[0].password, 'forexample')
      if (err) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        });
      }//end if
      //console.log(User,'forexample')
      else if (User != '' && Password == User[0].password) {

        // bcrypt.compare(Password, User[0].password, function(err, response) {
        //     if(response){
        token = jwt.sign({ email: User[0].email, _id: User[0]._id }, 'RESTFULAPIs');
        console.log(jwt.sign({ email: User[0].email, _id: User[0]._id }, 'RESTFULAPIs'), 'userrrrrrrrrrrrr')
        // req.session.cookie.user = token;
        logger.log('info', 'A request was received');
        // logger.log(jwt.sign({ email: User[0].email, _id: User[0]._id}, 'RESTFULAPIs'), 'userrrrrrrrrrrrr');
        req.session.user = token;
        req.session.save((err) => {
          console.log(!err, 'kkkkkkk')
          console.log(err, 'llllllllll')
          if (!err) {
            res.send({
              _id: User[0]._id,
              name: User[0].username,
              email: User[0].email,
              profileId: User[0].profileId,
              token: jwt.sign({ email: User[0].email, _id: User[0]._id }, 'RESTFULAPIs'),
              code: 200,
              token: token,
              msg: 'User logged successfully',
            })
          }
        });
        //     }else {
        //         res.send({msg: 'Invalid Email or Password'});
        //     }
        // });
      }//end else if
      else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'No User found'
        });
      }
    })

  //   passport.authenticate('local', function(err, user, info){
  //   var token;

  //   // If Passport throws/catches an error
  //   if (err) {
  //     res.status(404).json(err);
  //     return;
  //   }

  //   // If a user is found
  //   if(user){
  //     token = user.generateJwt();
  //     res.status(200);
  //     res.json({
  //       "token" : token
  //     });
  //   } else {
  //     // If user is not found
  //     res.status(401).json(info);
  //   }
  // })(req, res);
});
// /*========================user sign End==================================================*/


// /*========================reset password API start=============================================*/
app.post('/api/resetpassword', function (req, res) {
  var Email = req.body.email;
  var Password = req.body.password;
  User.findOne({ email: Email })
    .then((user) => {
      if (user != '') {
        user.username = user.username;
        user.InsertedDate = user.InsertedDate;
        user.subscribe = user.subscribe;
        user.status = user.status;
        user.blocked = user.blocked;
        user._id = user._id;
        user.email = user.email;
        user.password = Password;
        user.randomno = user.randomno;
        user.profileId = user.profileId;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        user.save((err, response) => {
          if (!err) {
            res.send({
              code: 200,
              msg: 'Password is updated'
            });
          }
        })
      } else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'No User found'
        });
      }
    })
});
/*========================reset password API end===============================================*/

/*========================get all users========================================================*/
app.get('/api/allusers', function (req, res) {
  User.find({ __v: 0 }, function (err, user) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      })
    }//end if
    else if (user != '') {
      var userEmail = [];
      for (var i = 0; i < user.length; i++) {
        userEmail.push(user[i].email)
      }
      res.send({
        code: 200,
        content: userEmail,
        msg: 'all registered user'
      });
    }//end else if condition
    else {
      res.send({
        code: 404,
        content: 'Not Found',
        msg: 'no registered user found'
      });
    }//end else condition
  })
})

/*========================get all users========================================================*/

/*========================post business data start==================================================*/


app.post('/api/postbusinessdata', function (req, res) {
  var businessData = req.body;
  var user_id = businessData.user_id,
    address = businessData.address,
    businessname = businessData.businessName,
    businessnumber = businessData.businessNumber
  firstname = businessData.firstName,
    lastname = businessData.lastName,
    city = businessData.city,
    state = businessData.state,
    zipcode = businessData.zip,
    businessaddress = businessData.businessAddress,
    businessownername = businessData.businessOwner,
    businessemail = businessData.businessEmail,
    businesscategory = businessData.businessCategory,
    businessImages = businessData.arr_url,
    businessId = businessData.businessId;
  businessDescription = businessData.description;
  posted = businessData.posted;

  if (businessData.objectId == '' || businessData.objectId == undefined || businessData.objectId == null) {
    var yellowBusiness_info = new yellowPagesBusiness({
      user_id: user_id,
      address: address,
      businessname: businessname,
      businessnumber: businessnumber,
      firstname: firstname,
      lastname: lastname,
      businessemailid: businessId,
      city: city,
      state: state,
      zipcode: zipcode,
      businessaddress: businessaddress,
      businessownername: businessownername,
      businessemail: businessemail,
      businesscategory: businesscategory,
      businessImages: businessImages,
      openingTime: businessData.openingTime,
      closingTime: businessData.closingTime,
      socialFaceBook: businessData.socialFaceBook,
      socialGoogle: businessData.socialGoogle,
      socialLinkIn: businessData.socialLinkIn,
      profileId: businessData.profileId,
      description: businessDescription,
      posted: posted
    });

    yellowBusiness_info.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        })
      }//end if
      else if (data != '') {
        console.log(data);
        res.send({
          code: 200,
          msg: 'Data inserted successfully'
        });
      }//end else if condition
      else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'no  data inserted'
        });
      }//end else condition
    })
  }//end if objectId

  else if (businessData.objectId != '' || businessData.objectId != undefined || businessData.objectId != null) {
    yellowPagesBusiness.findOne({ "_id": businessData.objectId }, function (err, businessProfile) {
      if (err) {
        return res.status(400).json({ "Unexpected Error:: ": err });
      }//end err
      businessProfile.user_id = businessData.user_id;
      businessProfile.address = businessData.address;
      businessProfile.businessname = businessData.businessName;
      businessProfile.businessnumber = businessData.businessNumber;
      businessProfile.firstname = businessData.firstName;
      businessProfile.lastname = businessData.lastName;
      businessProfile.businessemailid = businessData.businessId;
      businessProfile.city = businessData.city;
      businessProfile.state = businessData.state;
      businessProfile.zipcode = businessData.zip;
      businessProfile.businessaddress = businessData.businessAddress;
      businessProfile.businessownername = businessData.businessOwner;
      businessProfile.businessemail = businessData.businessEmail;
      businessProfile.businesscategory = businessData.businessCategory;
      businessProfile.businessImages = businessData.arr_url;
      businessProfile.openingTime = businessData.openingTime;
      businessProfile.closingTime = businessData.closingTime;
      businessProfile.socialFaceBook = businessData.socialFaceBook;
      businessProfile.socialGoogle = businessData.socialGoogle;
      businessProfile.socialLinkIn = businessData.socialLinkIn;
      businessProfile.profileId = businessData.profileId;
      businessProfile.description = businessData.description;
      businessProfile.posted = businessData.posted;

      businessProfile.save(function (err, doc) {
        if (err) {
          //console.log("profile update error::" :err);
          return res.status(400).json({ "Unexpected Error::": err });
        }
        console.log('business data has been updated');
        return res.send({
          code: 200,
          msg: 'Business data updated successfully'
        });
      });
    })
  }//end else if businessData objectId

})
/*======================post business data end==================================================*/


/*======================post buy & sell business start==========================================*/
app.post('/api/postbuyselldata', function (req, res) {
  var modeofcontact = [],
    delivery = [],
    classifiedImages = [],
    sizedimension = [];

  var buyselldata = req.body;
  //console.log(buyselldata);
  var userid = buyselldata.user_id,
    contactname = buyselldata.contactName,
    contactemail = buyselldata.contactEmail,
    contactnumber = buyselldata.contactNumber;
  modeofcontact = buyselldata.contactMode;
  var address = buyselldata.address,
    state = buyselldata.state,
    category = buyselldata.category,
    city = buyselldata.city,
    condition = buyselldata.condition;
  delivery = buyselldata.delivery;
  var description = buyselldata.description,
    modelmake = buyselldata.make,
    modelnumber = buyselldata.number,
    modelname = buyselldata.modelName,
    title = buyselldata.postingTitle,
    postingtype = buyselldata.postingType,
    price = buyselldata.price;
  classifiedImages = buyselldata.arr_url;
  var hideprice = buyselldata.hidePrice,
    hideaddress = buyselldata.hideAddress;
  sizedimension = buyselldata.sizedimension;
  var subcategory = buyselldata.subCategory,
    subsubcategory = buyselldata.subSubCategory,
    profileid = buyselldata.profileId,
    streetaddress = buyselldata.streetAddress,
    posted = buyselldata.posted

  if (buyselldata.objectId == '' || buyselldata.objectId == undefined || buyselldata.objectId == null) {

    var classifiedBusiness_info = new classifiedBusiness({
      userid: userid,
      contactname: contactname,
      contactemail: contactemail,
      contactnumber: contactnumber,
      modeofcontact: modeofcontact,
      delivery: delivery,
      address: address,
      hideaddress: hideaddress,
      condition: condition,
      sizedimension: sizedimension,
      images: classifiedImages,
      city: city,
      state: state,
      postingtype: postingtype,
      category: category,
      title: title,
      description: req.body.description,
      price: price,
      hideprice: hideprice,
      modelmake: modelmake,
      modelnumber: modelnumber,
      modelname: modelname,
      subcategory: subcategory,
      subsubcategory: subsubcategory,
      profileid: profileid,
      streetaddress: streetaddress,
      posted: posted
    });

    classifiedBusiness_info.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        })
      }//end if
      else if (data != '') {
        res.send({
          code: 200,
          msg: 'Data inserted successfully'
        });
      }//end else if condition
      else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'no  data inserted'
        });
      }//end else condition
    })
  }//end if objectId
  else if (buyselldata.objectId != '' || buyselldata.objectId != undefined || buyselldata.objectId != null) {
    classifiedBusiness.findOne({ "_id": buyselldata.objectId }, function (err, buysell) {
      if (err) {
        return res.status(400).json({ "Unexpected Error:: ": err });
      }//end if
      buysell.userid = buyselldata.user_id;
      buysell.contactname = buyselldata.contactName;
      buysell.contactemail = buyselldata.contactEmail;
      buysell.contactnumber = buyselldata.contactNumber;
      buysell.modeofcontact = buyselldata.contactMode;
      buysell.delivery = buyselldata.delivery;
      buysell.address = buyselldata.address;
      buysell.hideaddress = buyselldata.hideAddress;
      buysell.condition = buyselldata.condition;
      buysell.sizedimension = buyselldata.sizedimension;
      buysell.images = buyselldata.arr_url;
      buysell.city = buyselldata.city;
      buysell.postingtype = buyselldata.postingtype;
      buysell.category = buyselldata.category;
      buysell.title = buyselldata.postingTitle;
      buysell.description = req.body.description;
      buysell.price = buyselldata.price;
      buysell.hideprice = buyselldata.hidePrice;
      buysell.modelmake = buyselldata.make;
      buysell.modelnumber = buyselldata.number;
      buysell.modelname = buyselldata.modelName;
      buysell.subcategory = buyselldata.subCategory;
      buysell.subsubcategory = buyselldata.subSubCategory;
      buysell.profileid = buyselldata.profileId;
      buysell.streetaddress = buyselldata.streetaddress;
      buysell.posted = buyselldata.posted;

      buysell.save(function (err, doc) {
        if (err) {
          return res.status(400).json({ "Unexpected Error:: ": err });
        }//end if
        return res.send({
          code: 200,
          msg: 'Buy and Sell data updated successfully'
        });

      });
    })
  }//end else
});


/*======================post buy & sell business end===========================================*/

/*======================get Market place start========================================================*/
app.get('/api/marketplace', function (req, res) {
  var session = req.query.session;

  yellowPagesBusiness.find(function (err, yellowPages) {
    // console.log(yellowPages);
    if (yellowPages != '') {
      var businesses = [];
      //buysell = [];
      for (var i = 0; i < yellowPages.length; i++) {
        businesses.push(yellowPages[i]);
      }//end for
    }//end if
    classifiedBusiness.find(function (err, classifiedData) {
      //console.log('classified:'+classifiedData);
      if (classifiedData != '') {
        var buysell = [];
        for (var j = 0; j < classifiedData.length; j++) {
          buysell.push(classifiedData[j]);
        }
      }//end if

      roomrentsdata.find(function (err, roomrents) {
        //console.log('roomrents:'+roomrents);
        if (roomrents != '') {
          var roomrentsdata = [];
          for (var k = 0; k < roomrents.length; k++) {
            roomrentsdata.push(roomrents[k]);
          }
        }//end if

        jobPortal.find(function (err, jobData) {
          if (jobData != '') {
            var jobPortalData = [];
            for (var l = 0; l < jobData.length; l++) {
              jobPortalData.push(jobData[l])
            }
          }

          eventPortal.find(function (err, eventData) {
            if (eventData != '') {
              var eventPortalData = [];
              for (var m = 0; m < eventData.length; m++) {
                eventPortalData.push(eventData[m])
              }
            }
            postecommerce.find(function (err, ecommerceData) {
              if (ecommerceData != '') {
                var ecommerceArray = [];
                for (var k = 0; k < ecommerceData.length; k++) {
                  ecommerceArray.push(ecommerceData[k]);
                }
              }


              res.send({
                code: 200,
                business: businesses,
                busell: buysell,
                roomrentsdata: roomrentsdata,
                jobPortalData: jobPortalData,
                eventPortalData: eventPortalData,
                ecommerce: ecommerceArray,
                msg: 'data recieve successfully'
              });
            });
          });
        });
      });
    });
  });
});
/*====================get market Market place end=====================================================*/

/*====================post profile api start=====================================================*/
app.post('/api/profile', function (req, res) {
  var profileData = req.body;
  var user_id = profileData.userId,
    name = profileData.name,
    description = profileData.description,
    email = profileData.email,
    phone = profileData.phone,
    location = profileData.location,
    facebooklink = profileData.facebook,
    twitterlink = profileData.twitter,
    googlelink = profileData.google,
    linkdin = profileData.linkdin,
    imageurl = profileData.url,
    blockprofile = false,
    verifiedprofile = true

  if (profileData.profileId == '') {
    var profileInfo = new profiledata({
      user_id: user_id,
      name: name,
      description: description,
      email: email,
      phone: phone,
      location: location,
      facebooklink: facebooklink,
      twitterlink: twitterlink,
      googlelink: googlelink,
      linkdin: linkdin,
      imageurl: imageurl,
      blockprofile: blockprofile,
      verifiedprofile: verifiedprofile
    })
    profileInfo.save(function (err, data) {
      res.send({
        code: 200,
        msg: 'data inserted successfully',
        content: data._id
      })

      /*====================ProfileId save in user schema start==========================*/
      User.findOne({ "_id": profileData.userId }, function (err, user) {
        if (err) {
          //console.log("Profile update Error:::", err);
          return res.status(400).json({ "Unexpected Error:: ": err });
        }//end err if
        user.profileId = data._id;
        user.save(function (err, doc) {
        })
      })

      /*====================ProfileId save in user schema end==========================*/
    })


  }
  else if (profileData.profileId != '') {
    profiledata.findOne({ "_id": profileData.profileId }, function (err, profile) {
      if (err) {
        //console.log("Profile update Error:::", err);
        return res.status(400).json({ "Unexpected Error:: ": err });
      }
      profile.user_id = profileData.userId;
      profile.description = profileData.description;
      profile.name = profileData.name,
        profile.email = profileData.email;
      profile.phone = profileData.phone;
      profile.location = profileData.location;
      profile.facebooklink = profileData.facebook;
      profile.twitterlink = profileData.twitter;
      profile.googlelink = profileData.google;
      profile.linkdin = profileData.linkdin;
      profile.imageurl = profileData.url;
      profile.blockprofile = false;
      profile.verifiedprofile = true;

      profile.save(function (err, doc) {
        if (err) {
          //console.log("profile update Error:::", err);
          return res.status(400).json({ "Unexpected Error:: ": err });
        }
        //console.log('profile has been updated successfully.');
        return res.status(200).json({ message: 'profile has been updated successfully.' });

      });
    })
  }
});

/*====================post profile api end=======================================================*/

/*====================get profile api start============================================================*/
app.get('/api/getprofile', function (req, res) {
  var profileId = req.query.profileId;
  profiledata.findOne({ "_id": profileId }, function (err, specificProfile) {
    if (err) {
      //console.log("Profile not found Error:::", err);
      return res.status(400).json({ "Unexpected Error:: ": err });
    }
    else if (specificProfile) {
      res.send({
        code: 200,
        content: specificProfile,
        msg: 'Specific Profile'
      })
    }
  });
});
/*====================get profile api end==============================================================*/

/*===================post change password API start==========================================================*/
app.post('/api/changepassword', function (req, res) {
  var resetPassword = req.body;
  //console.log(resetPassword);
  User.findOne({ "_id": req.body.userId }, function (err, speUser) {
    if (err) {
      //console.log("Profile not found Error:::", err);
      return res.status(400).json({ "Unexpected Error:: ": err });
    }//end
    else if (speUser) {
      if (req.body.currentPassword != speUser.password) {
        return res.status(200).json({ "error": "Password not belong to current user" });
      }
      else if (req.body.currentPassword == speUser.password) {
        speUser.password = req.body.newPassword;
        speUser.save(function (err, data) {
          if (err) {
            //console.log("Password update Error:::", err);
            return res.status(400).json({ "Unexpected Error:: ": err });
          }
          //console.log('Password has been updated successfully.');
          return res.status(200).json({ message: 'Password has been updated successfully.' });
        })
      }
    }
  });
})

/*===================post change password API end============================================================*/

/*===================post roommates API start================================================================*/
app.post('/api/postroomrent', function (req, res) {
  var postroomrent = req.body;
  if (postroomrent.objectId == '' || postroomrent.objectId == undefined || postroomrent.objectId == null) {
    var roommates_info = new roomrentsdata({
      user_id: postroomrent.user_id,
      city: postroomrent.city,
      propertylocation: postroomrent.propertyLocation,
      propertyzipcode: postroomrent.zipCode,
      category: postroomrent.category,
      housingtype: postroomrent.housingType,
      postingtitle: postroomrent.postingTitle,
      discription: postroomrent.description,
      startdate: postroomrent.dateRange.from,
      enddate: postroomrent.dateRange.to,
      rent: postroomrent.price,
      pricemode: postroomrent.priceMode,
      accomodates: postroomrent.accommodates,
      furnished: postroomrent.furnished,
      Attachedbath: postroomrent.attachedBath,
      amenitiesinclude: postroomrent.amenities,
      vegetariansprefered: postroomrent.vegNoVeg,
      smoking: postroomrent.smoking,
      petfriendly: postroomrent.petFriendly,
      imageurl: postroomrent.arr_url,
      contactname: postroomrent.contactName,
      contactemail: postroomrent.contactEmail,
      contactnumber: postroomrent.contactNumber,
      modeofcontact: postroomrent.contactMode,
      profileId: postroomrent.profileId,
      subCategory: postroomrent.subCategory,
      subSubCategory: postroomrent.subSubCategory,
      state: postroomrent.state,
      posted: postroomrent.posted,
      beds:postroomrent.beds,
    })
    roommates_info.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        })
      }//end if
      else if (data != '') {
        res.send({
          code: 200,
          msg: 'Data inserted successfully'
        });
      }//end else if condition
      else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'no  data inserted'
        });
      }//end else condition
    })
  }//end if objectId
  else if (postroomrent.objectId != '' || postroomrent.objectId != undefined || postroomrent.objectId != null) {
    roomrentsdata.findOne({ "_id": postroomrent.objectId }, function (err, roomrentsdata) {
      if (err) {
        return res.status(400).json({ "Unexpected Error:: ": err });
      }//end iff
      roomrentsdata.user_id = postroomrent.user_id;
      roomrentsdata.city = postroomrent.city;
      roomrentsdata.propertylocation = postroomrent.propertyLocation;
      roomrentsdata.propertyzipcode = postroomrent.zipCode;
      roomrentsdata.category = postroomrent.category;
      roomrentsdata.housingtype = postroomrent.housingType;
      roomrentsdata.postingtitle = postroomrent.postingTitle;
      roomrentsdata.discription = postroomrent.description;
      roomrentsdata.startdate = postroomrent.dateRange.from;
      roomrentsdata.enddate = postroomrent.dateRange.to;
      roomrentsdata.rent = postroomrent.price;
      roomrentsdata.pricemode = postroomrent.priceMode;
      roomrentsdata.accomodates = postroomrent.accommodates;
      roomrentsdata.furnished = postroomrent.furnished;
      roomrentsdata.Attachedbath = postroomrent.attachedBath;
      roomrentsdata.amenitiesinclude = postroomrent.amenities;
      roomrentsdata.vegetariansprefered = postroomrent.vegNoVeg;
      roomrentsdata.smoking = postroomrent.smoking;
      roomrentsdata.petfriendly = postroomrent.petFriendly;
      roomrentsdata.imageurl = postroomrent.arr_url;
      roomrentsdata.contactname = postroomrent.contactName;
      roomrentsdata.contactemail = postroomrent.contactEmail;
      roomrentsdata.contactnumber = postroomrent.contactNumber;
      roomrentsdata.modeofcontact = postroomrent.contactMode;
      roomrentsdata.profileId = postroomrent.profileId;
      roomrentsdata.subCategory = postroomrent.subCategory;
      roomrentsdata.subSubCategory = postroomrent.subSubCategory;
      roomrentsdata.state = postroomrent.state;
      roomrentsdata.posted = postroomrent.posted;
      roomrentsdata.beds = postroomrent.beds;

      roomrentsdata.save(function (err, doc) {
        if (err) {
          return res.status(400).json({ "Unexpected Error:: ": err });
        }//end if
        return res.send({
          code: 200,
          msg: 'roomrents data updated successfully'
        })
      });
    })
  }//else if
});

/*===================post Job API start================================================================*/
app.post('/api/postJobPortal', (req, res) => {
  let postJobPortal = req.body;
  if (postJobPortal.objectId === '') {
    let jobDataa = new jobPortal({
      user_id: postJobPortal.user_id,
      profileId: postJobPortal.profileId,
      compDescription: postJobPortal.compDescription,
      compEmail: postJobPortal.compEmail,
      compName: postJobPortal.compName,
      email: postJobPortal.email,
      experience: postJobPortal.experience,
      jobCat: postJobPortal.jobCat,
      city: postJobPortal.city,
      state: postJobPortal.state,
      jobDescription: postJobPortal.jobDescription,
      jobTitle: postJobPortal.jobTitle,
      jobType: postJobPortal.jobType[0],
      location: postJobPortal.location,
      salary: postJobPortal.salary,
      faceBook: postJobPortal.faceBook,
      LinkdIn: postJobPortal.LinkdIn,
      Google: postJobPortal.Google,
      Website: postJobPortal.Website,
      Tagline: postJobPortal.Tagline,
      arr_url: postJobPortal.arr_url,
      posted: postJobPortal.posted
    });

    jobDataa.save((error, response) => {
      if (error) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        });
      } else if (response !== '') {
        res.send({
          code: 200,
          msg: 'Data inserted successfully'
        });
      } else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'no data inserted'
        });
      }
    });
  } else {
    jobPortal.findOne({ objectId: postJobPortal.objectId }, (err, jobData) => {
      if (err) {
        return res.status(400).json({ "Unexpected Error:: ": err });
      }
      jobData.user_id = postJobPortal.user_id;
      jobData.profileId = postJobPortal.profileId;
      jobData.compDescription = postJobPortal.compDescription;
      jobData.compEmail = postJobPortal.compEmail;
      jobData.compName = postJobPortal.compName;
      jobData.email = postJobPortal.email;
      jobData.experience = postJobPortal.experience;
      jobData.jobCat = postJobPortal.jobCat;
      jobData.city = postJobPortal.city;
      jobData.state = postJobPortal.state;

      jobData.jobDescription = postJobPortal.jobDescription;
      jobData.jobTitle = postJobPortal.jobTitle;
      jobData.jobType = postJobPortal.jobType[0];
      jobData.location = postJobPortal.location;
      jobData.salary = postJobPortal.salary;
      jobData.faceBook = postJobPortal.faceBook;
      jobData.LinkdIn = postJobPortal.LinkdIn;
      jobData.Google = postJobPortal.Google;
      jobData.Website = postJobPortal.Website;
      jobData.Tagline = postJobPortal.Tagline;
      jobData.arr_url = postJobPortal.arr_url;
      jobData.posted = postJobPortal.posted;
    });
    jobData.save((error, doc) => {
      if (error) {
        return res.status(400).json({ "Unexpected Error:: ": error });
      }
      return res.send({
        code: 200,
        msg: 'Add job data updated successfully'
      });
    });
  }
});

/*===================post Job API end================================================================*/

/*===================post Event API start================================================================*/
app.post('/api/postEventPortal', (req, res) => {
  let postEventPortal = req.body;
  if (postEventPortal.objectId === '') {
    console.log(postEventPortal, 'if objId is empty')
    let eventData = new eventPortal({
      address: postEventPortal.address,
      city: postEventPortal.city,
      closingTime: postEventPortal.closingTime,
      dateRange: postEventPortal.dateRange,
      description: postEventPortal.description,
      earlyBird: postEventPortal.earlyBird,
      earlyBirdAvailableTickets: postEventPortal.earlyBirdAvailableTickets,
      earlyBirdDelivery: postEventPortal.earlyBirdDelivery,
      earlyBirdFree: postEventPortal.earlyBirdFree,
      earlyBirdPaymentMode: postEventPortal.earlyBirdPaymentMode,
      earlyBirdPrice: postEventPortal.earlyBirdPrice,
      earlyBirdTotalTickets: postEventPortal.earlyBirdTotalTickets,
      email: postEventPortal.email,
      eventCategory: postEventPortal.eventCategory,
      eventTitle: postEventPortal.eventTitle,
      faceBook: postEventPortal.faceBook,
      google: postEventPortal.google,
      images: postEventPortal.images,
      linkdIn: postEventPortal.linkdIn,
      name: postEventPortal.name,
      normalTicket: postEventPortal.normalTicket,
      normalTicketAvailableTickets: postEventPortal.normalTicketAvailableTickets,
      normalTicketDelivery: postEventPortal.normalTicketDelivery,
      normalTicketFree: postEventPortal.normalTicketFree,
      normalTicketPaymentMode: postEventPortal.normalTicketPaymentMode,
      normalTicketPrice: postEventPortal.normalTicketPrice,
      normalTicketTotalTickets: postEventPortal.normalTicketTotalTickets,
      number: postEventPortal.number,
      objectId: postEventPortal.objectId,
      openingTime: postEventPortal.openingTime,
      posted: postEventPortal.posted,
      profileId: postEventPortal.profileId,
      randomKey: postEventPortal.randomKey,
      state: postEventPortal.state,
      userId: postEventPortal.userId,
      website: postEventPortal.website,
      bannerSrc: postEventPortal.bannerSrc,
      coverPhotoSrc: postEventPortal.coverPhotoSrc,
      top: postEventPortal.top,
      termsCondition: postEventPortal.termsCondition,
      map: postEventPortal.map,
      customTicketDetail: postEventPortal.customTicketDetail
    });

    eventData.save((error, response) => {
      if (error) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        });
      } else if (response !== '') {
        res.send({
          code: 200,
          msg: 'Data inserted successfully'
        });
      } else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'no data inserted'
        });
      }
    });
  } else {
    eventPortal.findOne({ objectId: postEventPortal.objectId }, (err, eventData) => {
      if (err) {
        return res.status(400).json({ "Unexpected Error:: ": err });
      }
      console.log(eventData, 'else objId is not empty')
      eventData.address = postEventPortal.address;
      eventData.city = postEventPortal.city;
      eventData.closingTime = postEventPortal.closingTime;
      eventData.dateRange = postEventPortal.dateRange;
      eventData.description = postEventPortal.description;
      eventData.earlyBird = postEventPortal.earlyBird;
      eventData.earlyBirdAvailableTickets = postEventPortal.earlyBirdAvailableTickets;
      eventData.earlyBirdDelivery = postEventPortal.earlyBirdDelivery;
      eventData.earlyBirdFree = postEventPortal.earlyBirdFre;
      eventData.earlyBirdPaymentMode = postEventPortal.earlyBirdPaymentMode;
      eventData.earlyBirdPrice = postEventPortal.earlyBirdPrice;
      eventData.earlyBirdTotalTickets = postEventPortal.earlyBirdTotalTickets;
      eventData.email = postEventPortal.email;
      eventData.eventCategory = postEventPortal.eventCategory;
      eventData.eventTitle = postEventPortal.eventTitle;
      eventData.faceBook = postEventPortal.faceBook;
      eventData.google = postEventPortal.google;
      eventData.images = postEventPortal.images;
      eventData.linkdIn = postEventPortal.linkdIn;
      eventData.name = postEventPortal.name;
      eventData.normalTicket = postEventPortal.normalTicket;
      eventData.normalTicketAvailableTickets = postEventPortal.normalTicketAvailableTickets;
      eventData.normalTicketDelivery = postEventPortal.normalTicketDelivery;
      eventData.normalTicketFree = postEventPortal.normalTicketFree;
      eventData.normalTicketPaymentMode = postEventPortal.normalTicketPaymentMode;
      eventData.normalTicketPrice = postEventPortal.normalTicketPrice;
      eventData.normalTicketTotalTickets = postEventPortal.normalTicketTotalTickets;
      eventData.number = postEventPortal.number;
      eventData.objectId = postEventPortal.objectId;
      eventData.openingTime = postEventPortal.openingTime;
      eventData.posted = postEventPortal.posted;
      eventData.profileId = postEventPortal.profileId;
      eventData.randomKey = postEventPortal.randomKey;
      eventData.state = postEventPortal.state;
      eventData.userId = postEventPortal.userId;
      eventData.website = postEventPortal.website;
      eventData.bannerSrc = postEventPortal.bannerSrc;
      eventData.coverPhotoSrc = postEventPortal.coverPhotoSrc;
      eventData.top = postEventPortal.top;
      eventData.termsCondition = postEventPortal.termsCondition;
      eventData.map = postEventPortal.map;
      eventData.customTicketDetail = postEventPortal.customTicketDetail;
    });
    eventData.save((error, doc) => {
      if (error) {
        return res.status(400).json({ "Unexpected Error:: ": error });
      }
      return res.send({
        code: 200,
        msg: 'Add job data updated successfully'
      });
    });
  }
});

/*===================post Event API end================================================================*/

/*===================post Event Ticket API start================================================================*/

app.post('/api/eventTicket', (req, res) => {
  let ticketInfo = req.body.obj;
  let mailTicket = req.body.data;
  console.log(req.body, 'bodyyyyyyyy')

  let ticketData = new eventTicket({
    address: ticketInfo.address,
    city: ticketInfo.city,
    conEmail: ticketInfo.conEmail,
    docId: ticketInfo.docId,
    eBirdVal: ticketInfo.eBirdVal,
    email: ticketInfo.email,
    eventId: ticketInfo.eventId,
    firstName: ticketInfo.firstName,
    hoNumber: ticketInfo.hoNumber,
    lastName: ticketInfo.lastName,
    moNumber: ticketInfo.moNumber,
    nTicketVal: ticketInfo.nTicketVal,
    state: ticketInfo.state,
    total: ticketInfo.total,
    userId: ticketInfo.userId,
    zipCode: ticketInfo.zipCode,
    posted: ticketInfo.posted,
    selectSeat: ticketInfo.selectSeat,
    booked: ticketInfo.booked
  });
  ticketData.save((error, response) => {
    if (error) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      });
    } else if (response !== '') {
      res.send({
        code: 200,
        msg: 'yor request submitted successfully'
      });
      let title = mailTicket.eventTitle;
      allTickets = ticketInfo.booked.map((elem) => Object.values(elem).slice(0, 2).join(", "));
      ticketOne = "Early Bird $" + mailTicket.earlyBirdPrice;
      ticketTwo = "Normal Ticket $" + mailTicket.normalTicketPrice;
      address = mailTicket.address;
      startDate = moment(mailTicket.dateRange[0].from).format('LL');
      startDay = moment(mailTicket.dateRange[0].from).format('dddd');
      endDate = moment(mailTicket.dateRange[0].to).format('LL');
      endDay = moment(mailTicket.dateRange[0].to).format('dddd');
      eventDayTime = startDay + ' ' + startDate + ' at ' + mailTicket.openingTime + ' - ' + endDay + ' ' + endDate + ' at ' + mailTicket.closingTime;
      userDetail = 'Order no. ' + ticketInfo.docId + ', ordered by ';
      userDetail2 = ticketInfo.firstName + ' ' + ticketInfo.lastName;
      userDetail3 = ' on ' + moment(ticketInfo.posted, 'LL').format('LLLL');
      fullName = ticketInfo.firstName + " " + ticketInfo.lastName;
      description = mailTicket.description;
      strForURL = userDetail2 + ' Order no. ' + ticketInfo.docId;
      eachTicket = ticketInfo.booked.map((elem) => {
        return `<h3 style="margin-left: 15px;">
                              ${Object.values(elem).slice(0, 2).join(", ")}
                          </h3>`
      });
      showDiv = mailTicket.map === true ?
        `<h2 style="margin-left: 15px;margin-bottom: -35px;">${title}<br>
                      ${eachTicket}
                    </h2>` :
        `<h2 style="margin-left: 15px;">${title}<br>${ticketOne}<br>${ticketTwo}</h2><br>`
        ;
      quantityTicket = mailTicket.map === true ?
        `<h3 style="margin-left: 15px;">Ticket Quantity ${ticketInfo.booked.length}</h3>` :
        `<h3 style="margin-left: 15px;">Ticket Quantity ${+ticketInfo.nTicketVal + +ticketInfo.eBirdVal}</h3>`
      var resToFixed = 0;
      if (mailTicket.map === false) {
        let res = +ticketInfo.total;
        // str = ticketInfo.total.substring(0, calIndex),
        // res = +ticketInfo.total - +str;
        resToFixed = res.toFixed(2);
      } else if (mailTicket.map === true) {
        let totalPrice = 0;
        ticketInfo.booked.map((elem) => {
          totalPrice += elem.pay
        });
        let webSiteRate = totalPrice > 0 ? (1 * 100 / totalPrice).toFixed(2) : 0.00,
          stripeRate = totalPrice > 0 ? (2.9 * 100 / totalPrice).toFixed(2) : 0.00;
        resToFixed = (+totalPrice + +webSiteRate + +stripeRate).toFixed(2);
      }
      QRCode.toDataURL(strForURL, function (err, url) {
        if (!err) {
          mailOptions = {
            to: ticketInfo.email,
            subject: "Event Ticket",
            html: `<html>
                                    <head>
                                        <title>PakJazba</title>
                                    </head>
                                    <body>
                                        <div style="margin-bottom: 10px;">
                                            <span style="color:#37a99b; font-size: 40px; margin-left: 15%;">PakJazba</span>
                                            <span style="margin-left: 40%">Order no:${ticketInfo.docId}</span>
                                        </div>
                                        <div style="width: 70%;height: 940px; border:1px solid gray; margin: auto;">
                                            <div style="width: 50%; display: inline-block;">
                                                <div>
                                                    ${showDiv}
                                                    ${quantityTicket}
                                                    <p style="margin-left: 15px; display: inline-block;">${address}<br><br>${eventDayTime}</p>
                                                </div>
                                            </div>
                                            <div style="width: 30%; float: right;">
                                                <img style="width: 150px; height: 150px;" src=${mailTicket.images[0]}><br>
                                                <canvas style="" src=${url}>
                                            </div>
                                        <div>
                                            <div style="float: left; width: 34%;">
                                              <h3 style="margin-left: 15px; display: inline;">PakJazba Completed</h3>
                                              <h4 style="color: rgb(177,117,117); margin-left: 15px;">Order Information</h4>
                                              <p style="margin-left: 15px;">${userDetail}<br>${userDetail2}<br>${userDetail3}</p>
                                            </div>
                                            <div style="margin-left: 40px;">
                                                <h3>Vat $ ${resToFixed}</h3>
                                                <h4 style="color: rgb(177,117,117);">Name</h4>
                                                <p>${fullName}</p>
                                            </div><br><br>
                                            <h3 style="width: 60%; margin-left: 15px;">Event Information</h3>
                                            <p style="width: 60%; margin-left: 15px;">${description}</p>
                                        </div>
                                    </body>
                                </html>`
          }
          // console.log(mailOptions);
          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
              res.end("error");
            } else {
              console.log("Message sent: " + response);
              console.log("Message sent: " + response);
            }
          });
        }
      });
      console.log(QRCode.toFile, 'QRCode3333333333')
    } else {
      res.send({
        code: 404,
        content: 'Not Found',
        msg: 'no data inserted'
      });
    }
  });
});

/*===================post Event Ticket API end================================================================*/

/*===================Applied for Job start===========================================================*/

app.post('/api/AppliedForJob', (req, res) => {
  let appliedData = req.body;
  let applyData = new jobApplied({
    senFirName: appliedData.senFirName,
    senLastName: appliedData.senLastName,
    senEmail: appliedData.senEmail,
    senCV: appliedData.senCV,
    senMsg: appliedData.senMsg,
    resEmail: appliedData.resEmail,
    appliedOn: appliedData.appliedOn,
    jobId: appliedData.jobId
  })
  applyData.save((error, response) => {
    if (error) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      });
    } else if (response !== '') {
      res.send({
        code: 200,
        msg: 'yor request submitted successfully'
      });
    } else {
      res.send({
        code: 404,
        content: 'Not Found',
        msg: 'no data inserted'
      });
    }
  });
})
/*===============specific event find start======================================*/



/*===============specific event find start======================================*/
app.get('/api/getSpecific', function (req, res) {
  var eventkeyword = req.query.randomKey;
  if (eventkeyword != '' || eventkeyword != undefined) {
    eventPortal.findOne({ randomKey: eventkeyword }, function (err, eventData) {
      if (err === null && eventData === null) {
        res.send({
          code: 404,
          msg: 'there is no record found'
        })
      } else if (eventData !== null) {
        res.send({
          code: 200,
          content: eventData
        })
      }
    })
  } else {
    res.send({
      code: 404,
      msg: 'kindly send proper detail'
    })
  }
})


/*===================Applied for Job End===========================================================*/

app.post('/api/sendmessage', function (req, res) {
  var getuserfields = req.body;
  var username = getuserfields.name;
  var receiver = getuserfields.receiver;
  var message = getuserfields.msg;
  var sender = getuserfields.sender;
  var written = getuserfields.written;

  /*var username = 'farzan';
  var receiver = 'farzanhanif123@gmail.com';
  var message = 'asdasdsadsd';
  var sender = 'sdsadsadsadsad';
  var written = 'sadasdsadsad';*/

  mailOptions = {
    to: getuserfields.receiver,
    subject: " Pakjazba User want to talk to you",
    html: "<html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body><h2>User Details</h2><table> <tr><th>Name</th><th>Email</th><th>Message</th></tr><tr><td>" + username + " </td><td>" + sender + "</td><td>" + message + "</td></tr></table></body></html>"
  }
  //console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.send({
        code: 200,
        msg: 'Message sent'
      })
    }
  })

})

app.post("/api/charge", async (req, res) => {
  let data = req.body.body;
  console.log(data.name, data.email, data.amount, 'sab k sab')
  try {
    let { status } = await stripe.charges.create({
      amount: Math.round(data.amount * 100),
      currency: "usd",
      description: "An example charge",
      source: data.token
    });
    res.json({ status });
  } catch (err) {
    console.log(err, 'eeeeerrrrrrrr')
    res.status(500).end();
  }
});
/*===================post roommates API end =================================================================*/
/*===================event seats arragment API start===============================================================*/
app.post('/api/eventseats', (req, res) => {
  let seatsData = req.body;
  console.log(seatsData.eventName, seatsData.seats);
  eventSeats.find(function (err, eventData) {

    /*for(var i=0;i<eventData.length;i++){
      if(eventData[i].eventName == seatsData.eventName){
        var data1 = eventData[i].seats;
        //console.log(data1,'dddddaaatatatata1')
        var data2 = seatsData.seats;
        var updateseats = [];
        updateseats = [...data1,...data2];
        console.log(updateseats,'uuuuuuppppppppddddd')
        eventSeats.update({ eventName:eventData.eventName }, { $set: { "seats": [...data1,...data2] }})
        res.send('update seats')
      }
    }*/
    console.log(eventData, 'sadsadsadsad')
    var data1 = eventData[0].seats;
    //console.log(data1,'dddddaaatatatata1')
    var data2 = seatsData.seats;
    var updateseats = [];
    updateseats = [...data1, ...data2];
    let seatsarrangment = new eventSeats({
      eventName: seatsData.eventName,
      seats: updateseats,
    })

    seatsarrangment.save((error, response) => {
      if (error) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        });
      } else if (response !== '') {
        res.send({
          code: 200,
          msg: 'your request submitted successfully'
        });
      } else {
        res.send({
          code: 404,
          content: 'Not Found',
          msg: 'no data inserted'
        });
      }
    });
  })

});

app.get('/api/getseats', (req, res) => {
  console.log('kia ye api chaliiiiii')
  let eventId = req.query.eventId;
  eventTicket.find(function (err, eventData) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      });
    } else if (eventData !== '') {
      var finalSeatsArray = [];
      for (var i = 0; i < eventData.length; i++) {
        if (eventData[i].eventId == eventId) {
          finalSeatsArray.push({
            eventId: eventData[i].eventId,
            booked: eventData[i].booked
          })
        }
      }
      res.send({
        code: 200,
        msg: 'All Seats',
        finalSeats: finalSeatsArray
      });
    } else {
      res.send({
        code: 404,
        content: 'Not Found',
        msg: 'no data inserted'
      });
    }
  });
});
app.post('/api/customvideo', (req, res) => {
  var videoObject = req.body;
  //console.log(videoObject)
  const videoData = new uerVideos({
    title: videoObject.title,
    description: videoObject.description,
    videoLink: videoObject.videoLink,
    thumbnailImageLink: videoObject.thumbnailImageLink,
    tags: videoObject.tags,
    category: videoObject.category
  })
  videoData.save(function (err, data) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      })
    }
    else if (data) {
      res.send({
        code: 200,
        msg: 'Save user video',
        finalSeats: data
      });
    }
  })
});

/*===============post ecommerce data=========================*/
app.post('/api/postecommercedata', (req, res) => {
  var ecommerceData = req.body;
  // console.log(req.body.images,'iiiimmmmaaggessss')
  if (ecommerceData.objectId === '') {
    const postEcommerceData = new postecommerce({
      user_Id: ecommerceData.user_Id,
      profileId: ecommerceData.profileId,
      category: ecommerceData.category,
      status: ecommerceData.status,
      brandName: ecommerceData.brandName,
      UPC: ecommerceData.UPC,
      color: ecommerceData.color,
      gtin: ecommerceData.gtin,
      allTabs: ecommerceData.allTabs,
      itemLength: ecommerceData.itemLength,
      itemWeight: ecommerceData.itemWeight,
      itemWidth: ecommerceData.itemWidth,
      lenseColor: ecommerceData.lenseColor,
      manufacturer: ecommerceData.manufacturer,
      manufacturerPart: ecommerceData.manufacturerPart,
      materialType: ecommerceData.materialType,
      maximumWeight: ecommerceData.maximumWeight,
      orientation: ecommerceData.orientation,
      pakageQuantity: ecommerceData.pakageQuantity,
      product: ecommerceData.product,
      warrantyDescription: ecommerceData.warrantyDescription,
      shaft: ecommerceData.shaft,
      shape: ecommerceData.shape,
      size: ecommerceData.size,
      tension: ecommerceData.tension,
      variationTheme: ecommerceData.variationTheme,
      conditionNote: ecommerceData.conditionNote,
      condition: ecommerceData.condition,
      country: ecommerceData.country,
      countryLabeled: ecommerceData.countryLabeled,
      handlingTime: ecommerceData.handlingTime,
      importDesignation: ecommerceData.importDesignation,
      legalDesclaimer: ecommerceData.legalDesclaimer,
      price: ecommerceData.price,
      productId: ecommerceData.productId,
      quantity: ecommerceData.quantity,
      salePrice: ecommerceData.salePrice,
      seller: ecommerceData.seller,
      taxCode: ecommerceData.taxCode,
      offering: ecommerceData.offering,
      restockDate: ecommerceData.restockDate,
      salePriceDate1: ecommerceData.salePriceDate1,
      salePriceDate2: ecommerceData.salePriceDate2,
      sellingDate: ecommerceData.sellingDate,
      images: ecommerceData.images,
      description: ecommerceData.description,
      productFeature: ecommerceData.productFeature,
      IntendedUsekeyWords: ecommerceData.IntendedUsekeyWords,
      targetAudience: ecommerceData.targetAudience,
      intendedUse: ecommerceData.intendedUse,
      platinumKeywords: ecommerceData.platinumKeywords,
      searchTerms: ecommerceData.searchTerms,
      subjectMatter: ecommerceData.subjectMatter,
      shopId: ecommerceData.shopId,
      shopName: ecommerceData.shopName,
      percantageOfProduct: ecommerceData.percantageOfProduct,
      averageRateProduct: ecommerceData.averageRateProduct
    })
    postEcommerceData.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        })
      }
      else if (data) {
        res.send({
          code: 200,
          msg: 'Data saved successfully',
          content: data
        });
      }
    })
  }
  else if (ecommerceData.objectId != '') {
    postecommerce.findOneAndUpdate(
      { "_id": ecommerceData.objectId },
      { $set: _.omit(ecommerceData, '_id') },
      { new: true }
    ).then(() => {
      postecommerce.find({ "_id": ecommerceData.objectId }, function (err, documents) {
        res.send({
          error: err,
          content: documents,
          code: 200
        });
        //db.close();
      })


    }).catch(() => res.status(422).send({ msg: 'okay' }));
  }

})


/*==============post ecommerce data=========================*/

app.get('/api/getcustomvideo', (req, res) => {
  uerVideos.find(function (err, videos) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      });
    } else if (videos) {
      res.send({
        code: 200,
        content: videos,
        msg: 'All video content with thumbnail_url'
      })
    }
    else {
      res.send({
        code: 404,
        msg: 'Not Found'
      })
    }
  })
})


/*===================================getEcommerce API===================================================*/
app.get('/api/getecommercedata', (req, res) => {
  postecommerce.find(function (err, ecommerceData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (ecommerceData) {
      res.send({
        code: 200,
        msg: 'All Ecommerce Data',
        content: ecommerceData
      })
    }
  })
})


/*===================================get Ecommerce API ====================================================*/
/*===================================post Rating Ecommerce API==============================================*/


app.post('/api/getspecificproductbyid', (req, res) => {
  let productId = req.body.productId;
  //res.send(product);
  postEcomProduct.find({ "_id": productId }, function (err, ecommerceData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (ecommerceData) {
      res.send({
        code: 200,
        msg: 'All Ecommerce Data',
        content: ecommerceData
      })
    }
  })
})

app.post('/api/postecommercecomment', (req, res) => {
  let ecommerceRatingReview = req.body;
  const ecommerceObj = new ecommerceProductReview({
    userId: req.body.userId,
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    productId: req.body.productId,
    rating: req.body.rating,
    shopId: req.body.shopId,
    averageRatingProduct: req.body.averageRatingProduct

  })
  ecommerceObj.save(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        msg: 'something went wrong'
      })
    }
    else if (data) {
      res.send({
        code: 200,
        msg: 'Ecommerce rating posted',
        content: data
      })
    }
  })
})

/*===================================Get Rating Ecommerce API==============================================*/

app.post('/api/getecommercecomment', (req, res) => {
  let productId = req.body.productId;
  //res.send(product);
  ecommerceProductReview.find({ "productId": productId }, function (err, ecommerceData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (ecommerceData) {
      res.send({
        code: 200,
        msg: 'All Ecommerce Comment',
        content: ecommerceData
      })
    }
  })
})

app.post('/api/getecommercereview', (req, res) => {
  let productId = req.body.productId
  ecommerceProductReview.find({ "_id": productId }, function (err, ecommerceData) {
    if (err) {

    }
  })
})

app.post('/api/postecommercepayment', (req, res) => {
  let data = req.body;

  //console.log(data,'stripe data');

  stripe.customers.create({
    email: data.email,
    source: data.token
  })
    .then(customer =>
      //console.log(data,'asdaasdsadasd');
      stripe.charges.create({
        amount: Math.round(data.amount * 100), // Unit: cents
        currency: data.currency,
        customer: customer.id,
        source: customer.default_source.id,
        description: 'Test payment',
      }))
    .then(function (charge) {
      var stripeResponse = charge;
      console.log(charge, 'hfdhffhgfhgf')
      res.send({
        code: 200,
        amount: charge.amount,
        billing_details: charge.billing_details,
        created: charge.created,
        currency: charge.currency,
        description: charge.description,
        paid: charge.paid,
        status: charge.status
      })
      if (stripeResponse.status == "succeeded") {
        const paymentFinalModal = new ecommercerPayment({
          name: data.name,
          email: data.email,
          //serviceName: data.serviceName,
          //paymentMonth: data.paymentMonth,
          amount: data.amount,
          currency: data.currency,
          //transactionId: data.transactionId,
          //receiptImg: data.receiptImg,
          objectIds: data.objectIds,
          userId: data.userId,
        });
        paymentFinalModal.save(function (err, successData) {
          if (err) {
            // res.send({
            //   code:404,
            //   msg:'Error in API'
            // })
          }
          else if (successData) {
            // res.send({
            //   code:200,
            //   msg:'payment data successfully saved'
            // })
          }
        })
      }

    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({ error: err.code });
    });
})

app.post('/api/postshop', (req, res) => {
  var shopData = req.body;
  // console.log(req.body.images,'iiiimmmmaaggessss')
  if (shopData.objectId === '') {
    const postShopData = new postShopCollection({
      bannerPhotoSrc: shopData.bannerPhotoSrc,
      gridImageSrc: shopData.gridImageSrc,
      images: shopData.images,
      shopAddress: shopData.shopAddress,
      shopCategories: shopData.shopCategories,
      shopCity: shopData.shopCity,
      shopDescription: shopData.shopDescription,
      shopState: shopData.shopState,
      shopTitle: shopData.shopTitle,
      profileId: shopData.profileId,
      userId: shopData.userId,
      shopPurpose: shopData.shopPurpose,
      shopLogo: shopData.shopLogo,
      percantageOfShop: shopData.percantageOfShop,
      accountTitle: shopData.accountTitle,
      bankAddress: shopData.bankAddress,
      bankName: shopData.bankName,
      ibank: shopData.ibank,
      swift: shopData.swift,
    })
    postShopData.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: 'Internal Server Error',
          msg: 'API not called properly'
        })
      }
      else if (data) {
        res.send({
          code: 200,
          msg: 'Data saved successfully',
          content: data
        });
      }
    })
  }
  else if (shopData.objectId != '') {
    postShopCollection.findOneAndUpdate(
      { "_id": shopData.objectId },
      { $set: _.omit(shopData, '_id') },
      { new: true }
    ).then(() => {
      postShopCollection.find({ "_id": shopData.objectId }, function (err, documents) {
        res.send({
          error: err,
          content: documents,
          code: 200,
          msg: 'data updated successfullly'
        });
        //db.close();
      })
    }).catch(() => res.status(422).send({ msg: 'Internal server error' }));
  }
})

app.post('/api/getShopById', (req, res) => {
  let userId = req.body.userId;
  //res.send(product);
  postShopCollection.find({ "userId": userId }, function (err, shopSpecificData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (shopSpecificData) {
      res.send({
        code: 200,
        msg: 'Specific shop Data',
        content: shopSpecificData
      })
    }
  })
})


app.post('/api/getSpecificShopById', (req, res) => {
  let shopId = req.body.shopId;
  //res.send(product);
  postShopCollection.find({ "_id": shopId }, function (err, shopSpecificData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (shopSpecificData) {
      res.send({
        code: 200,
        msg: 'Specific shop Data',
        content: shopSpecificData
      })
    }
  })
})


app.post('/api/getShopProducts', (req, res) => {
  let shopIdForProduct = req.body.shopIdForProduct;
  postEcomProduct.find({ "shopId": shopIdForProduct }, function (err, shopSpecificData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (shopSpecificData) {
      res.send({
        code: 200,
        msg: 'Specific shop Data',
        content: shopSpecificData
      })
    }
  })
})

app.post('/api/getShops', (req, res) => {
  postShopCollection.find(function (err, shopCollection) {
    console.log(shopCollection , 'shopCollection')
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (shopCollection) {
      res.send({
        code: 200,
        msg: 'All Ecommerce Data',
        content: shopCollection
      })
    }
  })
})

app.post('/api/postOrdersByShop', (req, res) => {
  var oderList = req.body;
  // console.log(req.body.images,'iiiimmmmaaggessss')
  const postOrderList = new postOrderListCollection({
    cartCount: oderList.cartCount,
    images: oderList.images,
    objectId: oderList.objectId,
    price: oderList.price,
    productId: oderList.productId,
    productName: oderList.productName,
    profileId: oderList.profileId,
    shopId: oderList.shopId,
    shopName: oderList.shopName,
    user_Id: oderList.user_Id,
  })
  postOrderList.save(function (err, data) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      })
    }
    else if (data) {
      res.send({
        code: 200,
        msg: 'Data saved successfully',
        content: data
      });
    }
  })

})

app.post('/api/getSpecificORderProductShopId', (req, res) => {
  let shopId = req.body.shopId;
  //res.send(product);
  postOrderListCollection.find({ "shopId": shopId }, function (err, shopSpecificData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (shopSpecificData) {
      res.send({
        code: 200,
        msg: 'Specific shop Data',
        content: shopSpecificData
      })
    }
  })
})



app.post('/api/postYourProduct', (req, res) => {
  var postData = req.body;
  // console.log(req.body.images,'iiiimmmmaaggessss')
  // if (postData.objectId === '') {
  const postDataReq = new postEcomProduct({
    user_Id: postData.user_Id,
    profileId: postData.profileId,
    shopId: postData.shopId,
    shopName: postData.shopName,
    product: postData.product,
    categories: postData.categories,
    sizes: postData.sizes,
    quantity: postData.quantity,
    price: postData.price,
    salePrice: postData.salePrice,
    materialType: postData.materialType,
    description: postData.description,
    auther: postData.auther,
    images: postData.images,
  })
  postDataReq.save(function (err, data) {
    if (err) {
      res.send({
        code: 500,
        content: 'Internal Server Error',
        msg: 'API not called properly'
      })
    }
    else if (data) {
      res.send({
        code: 200,
        msg: 'Data saved successfully',
        content: data
      });
    }
  })
  // }
})


app.get('/api/getYourProduct', (req, res) => {
  postEcomProduct.find(function (err, ecommerceData) {
    if (err) {
      res.send({
        code: 404,
        msg: 'Something went wrong'
      })
    }
    else if (ecommerceData) {
      res.send({
        code: 200,
        msg: 'All Ecommerce Data',
        content: ecommerceData
      })
    }
  })
})

/*===================event seats arrangment API end================================================================*/
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
