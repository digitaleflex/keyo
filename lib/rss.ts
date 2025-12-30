import Parser from "rss-parser"

const parser = new Parser()

export interface BlogPost {
    title: string
    description: string
    url: string
    date: string
    source: string
}

export interface SecurityAlert {
    title: string
    link: string
    pubDate: string
}

export async function getLatestTechNews(): Promise<BlogPost[]> {
    const feeds = [
        { url: "https://www.numerama.com/cyberguerre/feed/", source: "Cyberguerre" },
        { url: "https://www.zataz.com/feed/", source: "ZATAZ" },
        { url: "https://www.lemagit.fr/rss/ContentSyndication.xml", source: "LeMagIT" },
        { url: "https://www.lesnumeriques.com/rss.xml", source: "Les Numériques" }
    ]

    try {
        const feedPromises = feeds.map(async (feedInfo) => {
            try {
                const feed = await parser.parseURL(feedInfo.url)
                return feed.items.map((item) => ({
                    title: item.title || "Sans titre",
                    // Strip HTML tags for cleaner description if needed, or keep as is for innerHTML
                    description: item.contentSnippet || item.content || "",
                    url: item.link || "#",
                    date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short', year: 'numeric' }) : "",
                    source: feedInfo.source
                }))
            } catch (error) {
                console.error(`Error fetching feed ${feedInfo.source}:`, error)
                return []
            }
        })

        const allPosts = await Promise.all(feedPromises)
        const flattened = allPosts.flat()

        // Sort by date descending
        flattened.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        return flattened.slice(0, 6) // Increased to 6 for a better grid
    } catch (error) {
        console.error("Global feed error:", error)
        return []
    }
}

export async function getSecurityAlerts(): Promise<SecurityAlert[]> {
    try {
        const feed = await parser.parseURL("https://www.cert.ssi.gouv.fr/feed/")
        return feed.items.map(item => ({
            title: item.title || "Alerte de sécurité",
            link: item.link || "https://www.cert.ssi.gouv.fr/",
            pubDate: item.pubDate || new Date().toISOString()
        })).slice(0, 5)
    } catch (error) {
        console.error("Error fetching CERT-FR feed:", error)
        return []
    }
}
