import mongoose from "mongoose"

export const DatabaseConnection = () => {
  mongoose
    .connect(process.env.MONGOURL, { dbName: "NottesManeger" })
    .then(() => console.log("Database connected Success full"))
    .catch((e) => console.log(`Error While Database connection:${e}`))
}
