
import { connect } from "mongoose"
const url: string = process.env.Url!

export const dbconfig = async () => {
    try {
        return await connect(url).then((res: any) => {
            console.log("database is active")
        }).catch((Err) => { console.error() })
    } catch (error) {
        return error
    }
}