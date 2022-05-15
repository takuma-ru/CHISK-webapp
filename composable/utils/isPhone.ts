/**
  端末サイズ・種類取得
**/
export default function getIsPhone () {
  const isPhone = !!(navigator.userAgent.match(/iPhone|Android.+Mobile/) || window.innerWidth <= 768)
  document.documentElement.style.setProperty('--is-phone', isPhone ? 'true' : 'false')

  return {
    isPhone,
  }
}
