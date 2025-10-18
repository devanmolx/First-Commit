import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn(data) {

            const { user, account, profile } = data;

            if (!profile || !account || account.provider !== "github") return false;

            const githubProfile = profile as GithubProfile;

            const userData = {
                name: user.name!,
                email: user.email!,
                profilePicture: user.image!,
                githubId: githubProfile.id.toString(),
                username: githubProfile.login,
                githubUrl: githubProfile.html_url,
            };

            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: userData.email },
                        { githubId: userData.githubId }
                    ]
                }
            });
            if (!existingUser) {
                await prisma.user.create({ data: userData });
            }
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const githubProfile = profile as GithubProfile;
                const dbUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: token.email! },
                            { githubId: githubProfile.id.toString() }
                        ]
                    }
                });

                if (dbUser) {
                    token.id = dbUser.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number;
            }
            return session;
        }
    }
}