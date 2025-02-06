import { Octokit } from "octokit"

export default async function Home() {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated()
  console.log("Hello, %s", login)

  const repo = await octokit.rest.repos.get({
    owner: "dilwoarh",
    repo: "mini-cms-spike",
  })

  console.log(repo.data.full_name)

  const files = await octokit.rest.repos.getContent({
    owner: "dilwoarh",
    repo: "mini-cms-spike",
    path: "/cms/data",
  })

  console.log(files)

  return (
    <div className="p-2 max-w-7xl mx-auto mt-5">
      <h1 className="text-xl font-bold">Mini CMS Spike</h1>
      <p className="mt-2">
        This is a spike of a mini CMS that allows you to create, read, update
        and delete pages.
      </p>

      <h2 className="mt-4 text-lg font-semibold">Pages</h2>
      <div className="mt-2">
        <label
          htmlFor="comment"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Add a new page
        </label>
        <div className="mt-2">
          <textarea
            id="comment"
            name="comment"
            rows={4}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            defaultValue={""}
          />
        </div>
        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add page
        </button>
      </div>
    </div>
  )
}
