export class ResponseError extends Error {
  public readonly response: Response
  public readonly status: number
  public readonly statusText: object | string

  constructor(response: Response) {
    super(response.statusText)

    this.response = response
    this.status = response.status
    this.statusText = response.statusText
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new ResponseError(response)
  }

  return parseJSON(response)
}
