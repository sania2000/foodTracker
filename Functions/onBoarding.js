const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const User = require('../model/user')
const fitnessCalculatorFunctions = require("fitness-calculator");
const sendEmail = require( '../utils/sendEmail')

const jwtSecret =
  "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";
  apiKey = '5a7d5e15a2db4b15b3b2ed318b1c9f19'

exports.onBoarding = async(req, res) => {
    const {gender, age, activity, weight, height, diet, firstname,
    email, password, dailyCalorieNeed} = req.body

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({
        message: "User Already Exist. Please Login"
      });
    }

    if (!(email && password && firstname)) {
      res.status(400).send("All input is required");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
        gender,
        age,
        weight,
        height,
        activity,
        firstname,
        email,
        password: encryptedPassword,
        diet,
        dailyCalorieNeed
    }).then ((user) => {
      const token = jwt.sign(
        {  _id: user._id },
        jwtSecret,
      );
        user.token = token
        // res.header("access-token", token)
        user.save()
        console.log('saved')
        res.status(200).json({
          message:"signed up successfully",
          token: token
        })
    }).catch((error) => {
      console.log(error)
        res.status(400).json(
            {
                error: error
            }
        )
    })
}

exports.reccomendingCalorie = async(req, res) => {
  const {gender, age, height, weight, activity} = req.body
  try{
    const recommendedCalorie = fitnessCalculatorFunctions.calorieNeeds(gender, age, height, weight, activity)
    res.send({balance: `${recommendedCalorie.balance}`,
    weightLoss: `${recommendedCalorie.heavyWeightLoss}`,
    weightGain: `${recommendedCalorie.heavyWeightGain}`
  })}
    catch(error){
      res.sendStatus(400)
    }
}

exports.forgotPasswordCode = async (req, res) => {
  let randomDigit = Math.floor(1000 + (9999 - 1000) * Math.random())
  const {email} = req.body
  User.findOneAndUpdate({email: email}, 
      {digit: JSON.stringify(randomDigit)},
      function (error, success) {
          if (error) {
              console.log(error);
              res.status(404)
          } else {
              const emailBody = "Hello our Food Tracker friend!\nWe've recived a request to reset your Food Tracker password. Please eneter the following code in the app:\n"
              sendEmail(email, "Food Tracker Password Reset", emailBody + JSON.stringify(randomDigit));
              res.status(200).json({
                  message: "Digit has been sent successfully"
              });
          }
      })
}

exports.checkDigits = async (req, res) => {
  const digit = req.params.digit
  const {email} = req.body
  // console.log(userid, digit)
  User.find({email: email, digit: digit}, function(err, user) 
  {
     if (err)
     {
         res.send(err);
     }
     if (user.length === 0){
      res.status(404).json({
          message: '"email" and/ or "digit" is not valid!'
      })
     }
     else{
      res.json({
          message: "Code is valid"
      })
     }
  });
 }


//hash the new password

exports.resetPassword = async(req, res) => {
  
  const {email, newPassword} = req.body
  encryptedPassword = await bcrypt.hash(newPassword, 10);
  User.findOneAndUpdate({email: email}, 
      {password: encryptedPassword, digit: "1"},
      function (error, success) {
          if (error) {
              console.log(error);
              res.status(500).json({
                  message: "An error accured!"
              })
          } else if (success.length === 0){
              res.status(404).json({
                  message: '"email" is invalid'
              })
          }else {
              console.log("success");
              res.json({
                  message: "Password's changed!"
              })
          }
      })
}



exports.login =  async (req, res) => {

  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { email },
        jwtSecret,
      );

      // save user token
      user.token = token;
      user.save()
      // user
      // res.header("access-token", token)
      res.status(200).json({
        message:"logged in successfully",
        token: token
      })
    } else{
      res.sendStatus(400)
    }
    // res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.sendStatus(400)
  }

};

// exports.userConnection = async(req, res) => {
//   const token = req.headers['token']

//   User.findOne({token: token}, function(error, user){
//     if (error){
//       res.sendStatus(404)
//     }
//     else{
//       console.log(user.firstname)
//     //   try{axios.post('https://api.spoonacular.com/users/connect?apiKey=' + apiKey, {
//     //     "username": user[0].username,
//     //     "firstName": user[0].firstName,
//     //     "lastName": user[0].lastname,
//     //     "email": user[0].email
//     //   }).then(resp => {
//     //     res.send(resp.data)
//     //     // res.sendStatus(200)
//     // })}catch(error){
//     //   res.sendStatus(400)
//     // }}
//   }})
// }

exports.logout = async(req, res) => {
  const token = req.headers['token']
  const filter = {token: token}
  try{  User.findOneAndUpdate(filter, 
    {$set:{token: "1"}},
    function (error, success){
      res.sendStatus(200)
  })} catch(error){
    res.sendStatus(500)
  }
}