import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Newspaper, Rss } from "lucide-react"
import { getLatestTechNews } from "@/lib/rss"

export async function BlogCards() {
  const blogPosts = await getLatestTechNews()

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <Newspaper className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Actualités Tech & Sécurité
        </h2>
      </div>

      {blogPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-mono text-primary/80">{post.date}</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/20">{post.source}</div>
                </div>

                <CardTitle className="text-xl text-white group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: post.description.slice(0, 150) + "..." }} />
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
          <p className="text-muted-foreground">Impossible de charger les flux RSS pour le moment.</p>
        </div>
      )}
    </div>
  )
}
