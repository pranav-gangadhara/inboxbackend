import Email from "../model/email.js";

export const saveSentEmails = async(req, res) => {
  try {
    const email = new Email(req.body);
    console.log(req.body)
    await email.save();
    res.status(200).json({
      message: "Email Saved Successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getEmails = async (req, res) => {
  try {
    let emails;
    if (req.params.type === "bin") {
      emails = await Email.find({ bin: true });
    } else if (req.params.type === "allmail") {
      emails = await Email.find({});
    } else if (req.params.type === "starred") {
      emails = await Email.find({ starred: true, bin: false });
    } else {
      emails = await Email.find({ type: req.params.type });
      console.log(emails)
    }
    return res.status(200).json(emails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const moveEmailsToBin = async (req, res) => {
  try {
    console.log(req.body);
    await Email.updateMany(
      { _id: { $in: req.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );
    return res.status(200).json({ message: "email deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const toggleStarredMails = async (req, res) => {
  try {
    await Email.updateOne(
      { id: req.body.id },
      { $set: { starred: req.body.value } }
    );
    return res.status(200).json("email is mark starred");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const deleteEmails = async (req, res) => {
  try {
    await Email.deleteMany({ _id: { $in: req.body } });
    return res.status(200).json("email deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
