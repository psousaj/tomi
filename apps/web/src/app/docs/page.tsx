
import fs from 'node:fs/promises';
import path from 'node:path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; // Importa o novo plugin

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Doc = {
  filename: string;
  content: string;
};

async function getDocs(): Promise<Doc[]> {
  const docsDir = path.join(process.cwd(), '..', '..', 'docs');
  try {
    const files = await fs.readdir(docsDir);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    const docs: Doc[] = [];
    for (const file of mdFiles) {
      const filePath = path.join(docsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      docs.push({ filename: file, content });
    }
    return docs;
  } catch (error) {
    console.error("Could not read docs directory:", error);
    return [];
  }
}

async function getRootReadme(): Promise<string> {
  const readmePath = path.join(process.cwd(), '..', '..', 'README.MD');
  const content = await fs.readFile(readmePath, 'utf-8');
  return content;
}

export default async function DocsPage() {
  const rootReadme = await getRootReadme();
  const otherDocs = await getDocs();

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] w-full">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>README.MD</CardTitle>
            <CardDescription>
              Documentação principal do projeto Tomi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <article className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {rootReadme}
              </ReactMarkdown>
            </article>
          </CardContent>
        </Card>

        {otherDocs.map((doc) => (
          <Card key={doc.filename} className="mt-8">
            <CardHeader>
              <CardTitle>{doc.filename}</CardTitle>
            </CardHeader>
            <CardContent>
              <article className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {doc.content}
                </ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        ))}
      </main>
    </ScrollArea>
  );
}
