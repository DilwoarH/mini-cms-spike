/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
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
      <p>
        <Link href="/" className="underline">
          Back to home
        </Link>
      </p>
      <h1 className="text-xl font-bold">Edit page</h1>
      <p className="mt-2">File content</p>
      <code>
        <pre>{JSON.stringify(content, null, 4)}</pre>
      </code>

      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

      <form
        action="/api/github/update"
        className="mt-10 max-w-xl"
        method="POST"
        encType="application/json"
      >
        <input type="hidden" name="pageId" value={pageId} />
        <label
          htmlFor="title"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="title here..."
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            defaultValue={content.title}
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="body"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Body
          </label>
          <div className="mt-2">
            <textarea
              id="body"
              name="body"
              rows={4}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              defaultValue={content.body}
            />
          </div>
        </div>
        <button className="mt-4 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
          Update content
        </button>
      </form>
    </div>
  )
}
