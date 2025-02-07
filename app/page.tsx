import { Octokit } from "octokit"

export const dynamic = "force-dynamic"

export default async function Home() {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const { data: auth } = await octokit.rest.users.getAuthenticated()
  const { data: pages } = await octokit.rest.repos.getContent({
    owner: "dilwoarh",
    repo: "mini-cms-spike",
    path: "/cms/data",
  })

  return (
    <div className="p-2 max-w-7xl mx-auto mt-5">
      <h1 className="text-xl font-bold">
        Hi {auth.name} 👋. Welcome to Mini CMS.
      </h1>
      <p className="mt-2">
        This is a spike of a mini CMS that allows you to create, read, update
        and delete pages.
      </p>

      <h2 className="mt-4 text-lg font-semibold">Pages</h2>

      <ul className="list-disc list-inside mt-2">
        {(pages as { name: string; path: string }[]).map((page) => (
          <li key={page.name}>
            <a href={page.path} className="underline">
              {page.name}
            </a>
          </li>
        ))}
      </ul>

      <form
        className="mt-10 max-w-xl"
        action="/api/github/create"
        method="POST"
        encType="application/json"
      >
        <label
          htmlFor="page_name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Page name
        </label>
        <div className="mt-2">
          <input
            id="page_name"
            name="page_name"
            type="text"
            placeholder="Page name here..."
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add page
        </button>
      </form>
    </div>
  )
}
