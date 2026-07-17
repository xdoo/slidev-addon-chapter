export function verifyReleaseVersion(tag, version) {
  const match = /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/.exec(tag)
  if (!match) throw new Error(`release tag must use v<semver>, received ${JSON.stringify(tag)}`)
  const taggedVersion = tag.slice(1)
  if (taggedVersion !== version) {
    throw new Error(`release tag ${tag} does not match package.json version ${version}`)
  }
  return taggedVersion
}
