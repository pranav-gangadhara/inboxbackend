import mongoose from "mongoose";


const Connection = () => {
  try {
    mongoose.connect("mongodb+srv://pranavgangadhara:pranav@cluster0.kqtfdpk.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {console.log("DATABASE CONNECTED SUCCESSFULLY");});
    
  } catch (error) {
    console.log("ERROR IN CONNECTING TO DATABASE", error.message);
  }  
};

export default Connection; 
