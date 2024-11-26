import registerSchema from "./mongo.js";
const setStatusToInactive = async () => {
    try {
      const result = await registerSchema.updateMany(
        { /* Add your filter criteria here */ }, // Filter to select documents
        { $set: { status: "inactive" } } // Update operation
      );
      console.log("Updated documents:", result);
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };
  
  // Call the function
  setStatusToInactive();