export const getDomain = (url: string) => {
  try {
    // Add https:// protocol if not present
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
    const domain = new URL(urlWithProtocol).hostname
    // Remove 'www.' prefix if exists
    return domain.replace(/^www\./, '')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Return original input if URL parsing fails
    return url
  }
}
