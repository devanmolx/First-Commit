export async function githubRepoExists(repo: string) {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    return res.ok;
}