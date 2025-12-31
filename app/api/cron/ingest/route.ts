
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import Parser from "rss-parser";
import sources from "@/lib/rss-sources.json";
import { scoreArticle } from "@/lib/gemini";

const parser = new Parser();

export async function GET() {
    try {
        let processedCount = 0;

        // Shuffle sources to avoid always prioritizing the same ones if we timeout
        const shuffledSources = [...sources].sort(() => Math.random() - 0.5);

        // Process only first 5 sources per run to avoid timeout on Vercel (can be increased or handled via queues)
        const sourcesToProcess = shuffledSources.slice(0, 5);

        for (const source of sourcesToProcess) {
            try {
                const feed = await parser.parseURL(source.url);

                // Process only first 3 items from each feed
                for (const item of feed.items.slice(0, 3)) {
                    if (!item.link || !item.title) continue;

                    // Check if exists
                    const existing = await prisma.securityArticle.findUnique({
                        where: { url: item.link },
                    });

                    if (existing) continue;

                    // AI Scoring
                    const { score, summary_fr } = await scoreArticle(
                        item.title,
                        item.contentSnippet || item.content || ""
                    );

                    const finalScore = score * source.weight;

                    // Save to DB
                    await prisma.securityArticle.create({
                        data: {
                            title: item.title,
                            url: item.link,
                            summary: summary_fr,
                            source: source.source_name,
                            category: source.category,
                            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                            geminiScore: score,
                            finalScore: finalScore,
                            status: finalScore > 100 ? "Published" : "Hidden", // Simple threshold logic
                        },
                    });

                    processedCount++;
                }
            } catch (err) {
                console.error(`Error processing source ${source.source_name}:`, err);
                // Continue to next source
            }
        }

        return NextResponse.json({
            success: true,
            processed: processedCount,
            message: "Ingestion complete"
        });

    } catch (error) {
        console.error("Critical Ingestion Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
