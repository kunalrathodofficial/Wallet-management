import { UserModel } from "../models";
import { User } from "../models/user.model";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";


/**
 * @description This function is used to find a User by email
 * @param {String} email
 * @author Kunal Rathod
 * @returns {Promise<User|null>}
 */

export async function findUserByEmail(email: string): Promise<User | null> {
  return await UserModel.findOne({ email });
}

/**
 * @description This function is used to find a User by id
 * @param {String} id
 * @author Kunal Rathod
 * @returns {Promise<User|null>}
 */

export async function findUserById(id: string): Promise<User | null> {
  const objectId = new ObjectId(id);
  return await UserModel.findOne({ _id: objectId });
}

/**
 * @description this function is used to compare password
 * @param {String} password
 * @param {String} hashpassword
 * @author Kunal Rathod
 * @returns {Boolean}
 */
export function comparePassword(
  password: string,
  hashpassword: string
): boolean {
  return bcrypt.compareSync(password, hashpassword);
}

/**
 * @description this function creates a User in database
 * @param {User} User
 * @author Kunal Rathod
 * @returns {Promise<User>}
 */

export async function createUser(User: User): Promise<User> {
  return await UserModel.create(User);
}


/**
 * @description this function is used to hash password
 * @param {String} password
 * @author Kunal Rathod
 * @returns {String}
 */
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password);
}


/**
 * @description This function is used to generate authenticaton token
 * @param {User} User
 * @author Kunal Rathod
 * @returns {String}
 */
export function generateToken(User: User): string {
  return jsonwebtoken.sign(User, process.env.JWT_Token!);
}

