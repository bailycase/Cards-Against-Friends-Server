import { MutationUpdateUserArgs } from '../../../__generated__/resolver-types'
import { ObjectID } from 'mongodb'
const updateUser = async ({ args }: MutationUpdateUserArgs, mongo: any) => {
    const { _id, name } = args
    const userId = new ObjectID(_id)
    const db = await mongo();
    const userCollection = db.collection("users")
    const { value: user } = await userCollection.findOneAndUpdate({ _id: userId }, { $set: { name } }, { returnOriginal: false })
    return user
}

export default updateUser