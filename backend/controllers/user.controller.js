import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshToken = async (userId) => {
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    // adding refreshtoken in user
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})  //  here if save click so through error that username etc field are required so use {} in save() 

    return {accessToken, refreshToken}

  } catch (error){
    throw new ApiError(500, "something went wrong while generating refresh and access token")
  }
}

const Register = asyncHandler(async(req, res) => {
    console.log("first")
   const {email, username, password} = req.body
  console.log("second")
   if(!email || !username || !password) throw new ApiError(400, "All fields are required")
    console.log(email, username, password)

   const existedUser = await User.findOne({
    $or: [{username}, {email}]  // return if any among username or email exist
   })
   if(existedUser) 
    res.status(400).json({
        success: false,
        message: "User already exists"
    })

    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfuly"))
    
})

const login = asyncHandler(async(req, res) => {

 // data from req body
    // username or email
    // find the user
    // password check
    // generate access and refresh token 
    // send these through cookie
    console.log("yes")
    const {email, password} = req.body
    console.log(email)

    if(!email) throw new ApiError(400, "email is required")

    const user = await User.findOne({
        email
    }) 
    
    if(!user) throw new ApiError(400, "User does not exist")

    // here we use user not User coz such methods belongs to every specific user but not User schema of mongoose(IMP)
    const isPasswordValid = await user.isPasswordCorrect(password)  
    if(!isPasswordValid) throw new ApiError(400, "password is incorrect")

      // acess and generate token is used lot of times so create a new method

      const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)  // refresh token is update here so user does not have refresh token

      // same user is access with new refresh token 
      const loggedInuser = await User.findById(user._id).select("-password -refreshToken")
      
      // sending these tokens into cookies
      const options = {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production", // Only secure in production
   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for production, "lax" for dev
   maxAge: 24 * 60 * 60 * 1000, // 1 day
}

      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInuser, accessToken,
            refreshToken
          },
          "User logged in succesfully"
        )
      )
})

const logout = asyncHandler( async(req, res) => {
    // remove refresh and access token from cookie
    // remove refresh token from database
     // here a probem hoe to access user we dont have any mail, pass or id

     // due to ading cookie-parser as a midleware we are able to aaccess an object to both req and res that's why we didres.cookie(refreshToken)
     
     await User.findByIdAndUpdate(
        req.user?._id,  // find by this
        {
          $unset: {  // update by this
            refreshToken: 1
          }
        },{
          new: true
        }
     )
     console.log("refresh token updated")
     // you can even do search by id then update the user by deleting refresh token

     const options = {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production", // Only secure in production
   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for production, "lax" for dev
   maxAge: 24 * 60 * 60 * 1000, // 1 day
}

     return res.status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(new ApiResponse(200, {}, "User logged out"))
})

const addPassword = asyncHandler( async(req, res) => {
    const {link, linkUsername, linkPassword} = req.body
    if(!link || !linkUsername || !linkPassword) throw new ApiError(400, "All fields are required")

    const update = await User.updateOne(
  { _id: req.user._id },
  {
    $push: {
      data:{
        link,
        linkUsername,
        linkPassword
      } 
      
    }
  }
)
    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken")
          

    return res.status(200).json(new ApiResponse(200, updatedUser, "Password added successfully"))
})

const deletePassword = asyncHandler( async(req, res) => {
    const { link, linkUsername, linkPassword } = req.body;

    if (!link || !linkUsername || !linkPassword) {
      throw new ApiError(400, "All fields are required");
    }

    await User.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          data: {
            link: link,
            linkUsername: linkUsername,
            linkPassword: linkPassword
          }
        }
      }
    );
    
    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, updatedUser, "Password added successfully"))
});

const updatePassword = asyncHandler( async(req, res) => {
    const { oldLink, oldLinkUsername, oldLinkPassword, newLink, newLinkUsername, newLinkPassword } = req.body;
    
    if(!oldLink || !oldLinkUsername || !oldLinkPassword || !newLink || !newLinkUsername || !newLinkPassword) {
      throw new ApiError(400, "All fields are required");
    }
    
    const result = await User.updateOne(
      {
        _id: req.user._id
      },
      {
        $set: {
          "data.$[elem].link": newLink,
          "data.$[elem].linkUsername": newLinkUsername,
          "data.$[elem].linkPassword": newLinkPassword
        }
      },
      {
        arrayFilters: [
          {
            "elem.link": oldLink,
            "elem.linkUsername": oldLinkUsername,
            "elem.linkPassword": oldLinkPassword
          }
        ]
      }
    );
    

    return res.json({ success: true, result });
});  

export { Register, login, logout, addPassword, deletePassword, updatePassword };