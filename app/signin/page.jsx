import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import styles from '@styles/signinpage.module.css'

export default function SignInPage() {
  return (
   <div className={styles.mainContainer}> 
    <Card className="mx-auto max-w-sm w-[500px] h-[460px]">
      <CardHeader>
        <CardTitle className="text-xl mt-2">Sign In</CardTitle>
        <CardDescription>Enter your information to sign in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="abc@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <div className="space-y-2">
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </div>
        <div className="space-y-2">
          <Button className="w-full flex gap-2" variant="outline">
           <FcGoogle className="w-5 h-5"/> 
           <p>Sign in with Google</p>
          </Button>
          <Button className="w-full flex gap-2" variant="outline">
           <FaGithub className="w-5 h-5"/> Sign in with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}