import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Newspaper, Rss, TrendingUp } from "lucide-react"
import prisma from "@/lib/db"

interface BlogCardsProps {
  limit?: number
}

export async function BlogCards({ limit }: BlogCardsProps) {
  // Fetch from DB instead of live RSS
  const blogPosts = await prisma.securityArticle.findMany({
    where: { status: "Published" },
    orderBy: { finalScore: 'desc' },
    take: limit || 10
  })

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <Newspaper className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Cyber Watch <span className="text-sm font-normal text-muted-foreground ml-2">(AI Curated)</span>
        </h2>
      </div>

      {blogPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              {/* Score Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className={`
                        flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-md
                        ${post.geminiScore >= 80 ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    post.geminiScore >= 50 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/30'}
                    `}>
                  <TrendingUp className="w-3 h-3" />
                  {post.geminiScore}
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-mono text-primary/80">{post.publishedAt.toLocaleDateString("fr-FR")}</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/20">{post.source}</div>
                </div>

                <CardTitle className="text-xl text-white group-hover:text-primary transition-colors line-clamp-2 pr-12">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                  {post.summary}
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-primary group-hover:text-accent transition-colors">
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    Lire l'article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10">
          <Rss className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">L'IA analyse les flux en ce moment même... Revenez dans quelques instants.</p>
        </div>
      )}
    </div>
  )
}

