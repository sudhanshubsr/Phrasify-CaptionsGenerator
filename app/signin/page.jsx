'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {signIn} from 'next-auth/react'
import styles from '@styles/signinpage.module.css'
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useUploadButtonContext} from "@/lib/appContext"
export default function SignInPage() {
  const {data: session, status} = useSession();
  const router = useRouter(); 

  const {newFileName} = useUploadButtonContext();
  
  if(status === 'authenticated'){
    router.push('/');
  }

  const handleSignInwithGithub = async () => {
    if(newFileName){
      await signIn('github', {
        callbackUrl: `/${newFileName}`
      })

      localStorage.removeItem('newFileName');
    }
     else{
      await signIn('github', {
        callbackUrl: '/'
      })
     }
  }
  const handleSignInwithGoogle = async () => {
    if(newFileName){
      await signIn('google', {
        callbackUrl: `/${newFileName}`
      })

      localStorage.removeItem('newFileName');
    }
     else{
      await signIn('google', {
        callbackUrl: '/'
      })
     }
  }

  return (
   <div className={styles.mainContainer}> 
    <Card className="mx-auto max-w-sm w-[500px]">
      <CardHeader>
        <CardTitle className="text-xl mt-2">Sign In</CardTitle>
        <CardDescription>Enter your information to sign in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
      {/*
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
        </div> */}
        <div className="space-y-2">
          <Button className="w-full flex gap-2" variant="outline" onClick={handleSignInwithGoogle}>
           <FcGoogle className="w-5 h-5"/> 
           <p>Sign in with Google</p>
          </Button>
          <Button 
          className="w-full flex gap-2" variant="outline"
          onClick={handleSignInwithGithub}
          >
          
           <FaGithub className="w-5 h-5"/> Sign in with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}