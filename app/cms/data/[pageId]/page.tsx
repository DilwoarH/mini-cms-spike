/* eslint-disable @typescript-eslint/no-explicit-any */
import { Octokit } from "octokit"

export default async function Home({ params }: any) {
  const pageId = params.pageId

  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const { data: auth } = await octokit.rest.users.getAuthenticated()
  const { data: page }: any = await octokit.rest.repos.getContent({
    owner: "dilwoarh",
    repo: "mini-cms-spike",
    path: `/cms/data/${pageId}`,
  })

  const content = JSON.parse(atob(page.content))

  return (
    <div className="p-2 max-w-7xl mx-auto mt-5">
      <p>Logged in as {auth.name}</p>
      <h1 className="text-xl font-bold">Edit page</h1>
      <p className="mt-2">File content</p>
      <code>
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </code>
    </div>
  )
}
