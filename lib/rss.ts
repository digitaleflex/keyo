import Parser from "rss-parser"

const parser = new Parser()

export interface BlogPost {
    title: string
    description: string
    url: string
    date: string
    source: string
}

export async function getLatestTechNews(): Promise<BlogPost[]> {
    const feeds = [
        { url: "https://www.zataz.com/feed/", source: "ZATAZ" },
        { url: "https://korben.info/feed", source: "Korben" }
    ]

    try {
        const feedPromises = feeds.map(async (feedInfo) => {
            try {
                const feed = await parser.parseURL(feedInfo.url)
                return feed.items.map((item) => ({
                    title: item.title || "Sans titre",
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
        // Flatten, sort by date (if possible, but date strings are tricky, so simplistic merge for now), and slice
        const flattened = allPosts.flat()

        // Simple shuffle or sort could be added, taking first 4 for now
        return flattened.slice(0, 4)
    } catch (error) {
        console.error("Global feed error:", error)
        return []
    }
}
