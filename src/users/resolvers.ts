import bcrypt from 'bcrypt';
import { MutationUpdateUserArgs } from '../../__generated__/resolver-types';
import getDb from '../utils/getDb';
import updateUser from './requests/updateUser';

interface UserOperationArgs {
  email: string;
  password: string;
}

const getCollection = async () => {
  const db = await getDb();
  return db.collection('users');
};
const registerUser = async ({ email, password }: UserOperationArgs) => {
  const collection = await getCollection();
  const salt = bcrypt.hashSync(password, 10);
  const doesUserExist = !!(await collection.findOne({ email }));
  if (doesUserExist) {
    return new Error('There is already an account with that email registered');
  }
  const { ops } = await collection.insertOne({
    email,
    salt,
  });
  return {
    user: { ...ops[0] },
  };
};
const loginUser = async ({ email, password }: UserOperationArgs) => {
  const collection = await getCollection();
  const user = await collection.findOne({ email });
  if (!user) {
    return new Error("We can't find an account with that email");
  }
  const isAuthed = bcrypt.compareSync(password, user.salt);
  if (!isAuthed) {
    return new Error("That isn't the correct password");
  }
  console.log(user);
  if (isAuthed) {
    return { user };
  }
};
const getCurrentGame = async ({ name }: any) => {
  const collection = await getCollection();
  const User = await collection.findOne({
    name,
  });
  return User;
};
const resolvers = {
  Query: {
    // user: (_, args) => getUser(args),
    getCurrentGame: (_: void, args: any) => getCurrentGame(args),
  },
  Mutation: {
    loginUser: (_: void, args: UserOperationArgs) => loginUser(args),
    registerUser: (_: void, args: UserOperationArgs) => registerUser(args),
    updateUser: (_: void, args: MutationUpdateUserArgs, { mongo }: any) => updateUser({ ...args }, mongo),
  },
};

export default resolvers;
