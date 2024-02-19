import GitHubProvider from "next-auth/providers/github";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile Github: ", profile);

        let userRole = "Github User";
        if (profile?.email == "Muhyadin.Mohamed.003@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
