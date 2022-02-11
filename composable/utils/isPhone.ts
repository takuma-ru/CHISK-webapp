export default function getIsPhone () {
  const isPhone = !!(navigator.userAgent.match(/iPhone|Android.+Mobile/) || window.innerWidth <= 768)

  return {
    isPhone,
  }
}
