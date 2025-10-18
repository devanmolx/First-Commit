export async function githubRepoExists(repo: String) {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    return res.ok;
}