import { NextResponse } from "next/server"
import { Octokit } from "octokit"

export async function POST(req: Request) {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

    const formData = await req.formData()
    const pageId = formData.get("pageId")
    const title = formData.get("title")
    const body = formData.get("body")
    const { data: page }: any = await octokit.rest.repos.getContent({
      owner: "dilwoarh",
      repo: "mini-cms-spike",
      path: `/cms/data/${pageId}`,
    })

    const { data } = await octokit.rest.repos.createOrUpdateFileContents({
      owner: "dilwoarh",
      repo: "mini-cms-spike",
      path: `cms/data/${pageId}`,
      message: "update page " + pageId,
      sha: page.sha,
      content: Buffer.from(
        JSON.stringify(
          {
            title,
            body,
          },
          null,
          4,
        ),
      ).toString("base64"),
    })

    if (data) {
      return NextResponse.redirect(new URL("/cms/data/" + pageId, req.url))
    } else {
      return NextResponse.json(
        { message: "Error creating page", data },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error },
      { status: 500 },
    )
  }
}
