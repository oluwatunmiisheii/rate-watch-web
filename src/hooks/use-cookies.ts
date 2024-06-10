import Cookies from 'js-cookie'

const cookieTypes = ['rw-cookie-consent'] as const
type CookieType = (typeof cookieTypes)[number]

export const useCookies = () => {
  const setCookie = (name: CookieType, value: string, expires?: number) => {
    Cookies.set(name, value, {
      ...(expires && { expires }),
    })
  }

  const getCookie = (name: CookieType) => {
    return Cookies.get(name) ?? undefined
  }

  return [getCookie, setCookie] as const
}
