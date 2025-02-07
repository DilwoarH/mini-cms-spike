import { NextResponse } from "next/server"
import { Octokit } from "octokit"

export async function POST(req: Request) {
  try {
    const body = await req.formData()
    const pageName = body.get("page_name")

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const { data: page } = await octokit.rest.repos.createOrUpdateFileContents({
      owner: "dilwoarh",
      repo: "mini-cms-spike",
      path: "cms/data/" + pageName + ".json",
      message: "Create page " + pageName,
      content: Buffer.from(
        JSON.stringify(
          {
            title: pageName,
            body: "",
          },
          null,
          4,
        ),
      ).toString("base64"),
    })

    if (page) {
      return NextResponse.redirect(
        new URL("/cms/data/" + pageName + ".json", req.url),
      )
    } else {
      return NextResponse.json(
        { message: "Error creating page", page },
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
