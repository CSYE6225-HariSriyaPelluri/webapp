const User = require('../models/User');
const passwordGenerator = require('../helpers/passwordGenerator');
const logger = require('../util/logger');

const getUserDetails = async(req, res)=>{
    try {
        
        if (req.user) {
            const result = req.user.toJSON();
            delete result.password;
            logger.info("User details fetched");
            return res.status(200).json(result).send();
        } else {
            logger.error("User doesnt exist");
            return res.status(404).json().send();
        }
    } catch (error) {
        logger.error("Cannot fetch user details")
        return res.status(400).json().send();
    }
}

const updateUser = async(req,res) =>{
    const userData = req.body;
    try {
        if(userData.password){
            userData.password = await passwordGenerator(userData.password)
        }
        const [updated] = await User.update(userData, {
            where: { id: req.user.id }
        });
        if (updated) {
            logger.info("User updated successfully")
            return res.status(204).json().end();
        } else if(!updated) {
            logger.error("User couldnt be updated")
            res.status(404).json().send();
        }
    } catch (error) {

        logger.error("Bad request")
        res.status(400).json().send();
    }

}

const addUser = async(req, res) =>{
    const {username, password} = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {

            logger.error("User already exists")
            return res.status(409).json().send();
        }
        const generatedPassword = await passwordGenerator(password)
        
        const user = await User.create({
            ...req.body,
            password: generatedPassword,
        });

        const result = user.toJSON();
        delete result.password;
        logger.info("User creation successful")
        return res.status(201).json(result).send();
    } catch (error) {
        logger.error("Bad request")
        return res.status(400).json().send();
    }

}

module.exports={getUserDetails, updateUser, addUser}