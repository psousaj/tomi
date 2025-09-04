// components/RepoList.tsx
import { ExternalLink, GitFork, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GithubUserRepos } from "@/types";
import { getGitHubUserRepos } from "@/lib/api";
import { cookies } from "next/headers";
import { AppUser } from "@/types";
import { ScrollArea } from "./ui/scroll-area";

export async function RepoList() {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("fake_jwt")?.value;
    const user: AppUser = JSON.parse(userCookie!);
    const repos: GithubUserRepos[] = await getGitHubUserRepos(user.login);

    return (
        <div className="max-w-3xl mx-auto space-y-4 p-4">
            <h1 className="text-2xl font-bold">Meus Repositórios</h1>
            <ScrollArea className="h-[650px] max-h-[65%] flex flex-col py-2">
                {repos.map((repo) => (
                    <Card key={repo.full_name} className="hover:shadow-lg transition mb-6">
                        <CardContent className="flex items-start justify-between p-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Book className="w-5 h-5 text-blue-500" />
                                    <span className="font-semibold">{repo.name}</span>
                                </div>
                                <p className="text-sm text-gray-500">{repo.full_name}</p>
                                <p className="text-sm mt-1 text-muted-foreground">
                                    {repo.description || "Sem descrição"}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                                        Owner: {repo.owner.login}
                                    </span>
                                    {repo.fork && (
                                        <span className="flex items-center gap-1 text-xs text-orange-600">
                                            <GitFork className="w-4 h-4" /> Fork
                                        </span>
                                    )}
                                </div>
                            </div>
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </ScrollArea>
        </div>
    );
}
