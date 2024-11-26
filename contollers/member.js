import mongoose from "mongoose";
import registerSchema from "../mongo.js";
export const getMembers = async (req, res) => {
  const { userType, page = 1, limit = 10, searchTerm} = req.query;

  let filter = {};
  if (userType === "Students") {
    filter.user = "Student";
  } else if (userType === "Teacher") {
    filter.user = "Teacher";
  }else{
    filter={};
  }

console.log(searchTerm)
  if (searchTerm) {
    filter.username = { $regex: searchTerm, $options: "i" }; 
  }
  console.log(filter)
  const skip = (page - 1) * limit;
  const take = parseInt(limit);

  try {
   
    const users = await registerSchema.find(filter)
      .select("-password") 
      .skip(skip)
      .limit(take)
      .lean();

    
    const totalUsers = await registerSchema.countDocuments(filter);

    res.status(200).json({
      users,
      pagination: {
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

export const deleteUserById = async (req,res) => {
  const {userId}=req.query;
  console.log(userId)
  try {
    const result = await registerSchema.findByIdAndDelete(userId);
    if (result) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(500).json({ error: "Failed to delete user" });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const updateUser = async (req, res) => {

  const { user, status,userId } = req.body; 

  try {
    
      if (!user || !status) {
          return res.status(400).json({ message: 'User and status fields are required.' });
      }
      const updatedUser = await registerSchema.findByIdAndUpdate(
          userId,
          { user, status },
          { new: true, runValidators: true } 
      );
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found.' });
      }
      console.log("updated")
      return res.status(200).json({
          message: 'User updated successfully.',
      });
  } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Internal server error.', error });
  }
};