const User = require("../models/usermodel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { JWT_SECRET_KEY } = require("../config");

async function handlesignup(req, res) {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists, try a different one" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

async function handlesignin(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render("signin", { error: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.render("signin", { error: "Incorrect username or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.render("signin", { error: "Incorrect username or password" });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, JWT_SECRET_KEY);

        res.cookie("token", token);// set cookie for session
        return res.status(201).json({
            message: "Account logged in successfully.",
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                gender: user.gender,
                profilePhoto: user.profilePhoto
            },
            token
        });


    } catch (error) {
        console.log(error);
        return res.render("signin", { error: "Something went wrong. Try again." });
    }
}


async function handlelogout(req, res) {
    try {
        return res.status(200).cookie("token", "").json({
            message: "Logged out successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};




module.exports = { handlesignin, handlesignup, handlelogout,};
