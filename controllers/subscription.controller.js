import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res) => {
  try {
    const sub = await Subscription.create({
        ...req.body,
        user: req.user._id // Assuming userId is passed in headers
    });
    return res.status(201).json({
        success: true,
        data: sub,
        message: "Subscription created successfully!"
    });
  }catch(error){
    console.log("Error creating subscription:", error);
    return res.status(500).json({
        success: false,
        message: "Internal server error on subscription creation!",
    });
  }
}

export const getAllSubscriptionForAUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is passed in headers
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID Absent for Subscription List",
      });
    }
    if(userId != req.params.id){
        return res.status(403).json({
            success: false,
            message: "Access denied. You can only access your own subscriptions.",
        });
    }
    
    const subscriptions = await Subscription.find();
    return res.status(200).json({
      success: true,
      data: subscriptions,
    }); 
  }catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}