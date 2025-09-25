import { useEffect, useState } from 'react'

function Dark() {
  const [darkMode, setDarkMode] = useState<boolean>(getMode)

  function getMode() {
    if (localStorage.dark) {
      if (localStorage.dark === 'true') return true
      else return false
    }
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }

  useEffect(() => {
    console.log('==>dark:', darkMode)
    document.documentElement.classList.toggle(
      'dark',
      localStorage.dark === 'true' ||
        (!('dark' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  }, [darkMode])

  const changeMode = () => {
    setDarkMode(!darkMode)
    localStorage.dark = !darkMode
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      if (!('dark' in localStorage)) {
        setDarkMode(event.matches)
      }
    })

  return (
    <div className="m-8">
      <div className="flex justify-between">
        <p className="text-Dark-Grayish-Blue dark:text-Desaturated-Blue font-bold">
          Dark Mode
        </p>
        <label
          className="border bg-Toggle p-[3px] w-12 h-6 rounded-full cursor-pointer relative overflow-hidden"
          htmlFor="darkmode"
        >
          <input
            onChange={changeMode}
            checked={darkMode}
            className="peer sr-only"
            type="checkbox"
            id="darkmode"
          />
          <div className="peer-checked:bg-gradient-to-r from-Toggle-blue to-Toggle-green absolute top-0 left-0 w-full h-full"></div>
          <div className="w-[18px] h-[18px] bg-Light-Grayish-Blue rounded-full peer-checked:translate-x-[24px]"></div>
        </label>
      </div>
      <div>
        <button className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
          System
          <svg
            className="w-5 h-5 ms-2.5"
            aria-hidden="true"
            fill="none"
            version="1.1"
            id="Icons"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <g>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.2,9.6c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.5,6.1c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L8.2,9.6z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7,16c0-0.6-0.4-1-1-1H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h3C6.6,17,7,16.6,7,16z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.2,22.4l-2.1,2.1c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l2.1-2.1c0.4-0.4,0.4-1,0-1.4S8.6,22,8.2,22.4z"
              />
            </g>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M29.4,16.2c-0.4-0.2-0.9-0.1-1.2,0.3c-0.8,1-2,1.5-3.2,1.5c-2.3,0-4.3-1.9-4.3-4.3c0-1.6,0.9-3,2.3-3.8c0.4-0.2,0.6-0.7,0.5-1.1C23.4,8.4,23,8,22.5,8c-0.1,0-0.3,0-0.4,0c-1.9,0-3.7,0.7-5.1,1.8V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v5.1c-3.9,0.5-7,3.9-7,7.9s3.1,7.4,7,7.9V29c0,0.6,0.4,1,1,1s1-0.4,1-1v-6.8c1.4,1.2,3.2,1.8,5.1,1.8c4,0,7.3-2.9,7.9-6.8C30.1,16.8,29.8,16.3,29.4,16.2z M17,20c0,0.6-0.4,1-1,1s-1-0.4-1-1v-8c0-0.6,0.4-1,1-1s1,0.4,1,1V20z"
            />
          </svg>
        </button>
      </div>
      <br />
      <hr className="p-[0.5px] bg-black" />
    </div>
  )
}
export default Dark
