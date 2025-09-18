import { useEffect, useState } from 'react'

function Dark() {
  const [darkMode, setDarkMode] = useState(false)
  const handleClick = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

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
            onClick={handleClick}
            className="peer sr-only"
            type="checkbox"
            name=""
            id="darkmode"
          />
          <div className="peer-checked:bg-gradient-to-r from-Toggle-blue to-Toggle-green absolute top-0 left-0 w-full h-full"></div>
          <div className="w-[18px] h-[18px] bg-Light-Grayish-Blue rounded-full peer-checked:translate-x-[24px]"></div>
        </label>
      </div>
      <br />
      <hr className="p-[0.5px] bg-black" />
    </div>
  )
}
export default Dark
