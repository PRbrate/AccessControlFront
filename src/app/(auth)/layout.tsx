import { useAuth } from "@/src/context/AuthContext"
import { Redirect } from "expo-router"

export default function RootLayout() {
    const {dataReturn} = useAuth()

    console.log(dataReturn)
    if(dataReturn != null || dataReturn != undefined) return <Redirect href={"/(auth)/signIn/page"}/>
}