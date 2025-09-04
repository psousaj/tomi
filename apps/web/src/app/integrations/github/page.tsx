// app/repos/page.tsx
import { Suspense } from "react";
import { RepoList } from "@/components/RepoList";

export default function ReposPage() {
    return (
        <Suspense fallback={<p className="text-center mt-10">Carregando repositórios...</p>}>
            <RepoList />
        </Suspense>
    );
}
