import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    // debug: true,
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ]
    
}