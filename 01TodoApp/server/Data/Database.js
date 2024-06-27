import mongoose, { modelNames } from "mongoose"

export const DatabaseConnection = () => {
  mongoose
    .connect(process.env.MONGOURL, { dbName: "TodoUSer" })
    .then(() => console.log("Database Connected Success Fully"))
    .catch((e) => console.log(`Error While Database Connection :${e}`))
}
