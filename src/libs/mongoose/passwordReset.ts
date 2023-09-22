import { dbCon } from "./dbCon";

// Create a Password Reset Record
export const createPasswordResetRecord = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    await dbCon();

    const resetRecord = new PasswordReset({
      email,
      token,
    });
    await resetRecord.save();
  } catch (error) {
    throw new Error("Error creating password reset record");
  }
};

// Find Password Reset Records
export const findPasswordResetRecord = async (
  email: string,
  token: string
): Promise<any | null> => {
  try {
    await dbCon();
    return await PasswordReset.findOne({ email, token }).exec();
  } catch (error) {
    throw new Error("Error finding password reset record");
  }
};

// Update Password Reset Records
export const markPasswordResetRecordAsUsed = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    await dbCon();
    await PasswordReset.updateOne({ email, token }, { isUsed: true }).exec();
    
  } catch (error) {
    throw new Error("Error marking password reset record as used");
  }
};
