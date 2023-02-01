import React,{useState,useContext} from "react"


// Context 
 const ThemeContext = React.createContext()
 const ThemeUpdateContext = React.createContext()

// custom hook function 
export function useTheme(){
    return useContext(ThemeContext)
}
export function useThemeUpdate(){
    return useContext(ThemeUpdateContext)
}

// provider function
export function ThemeProvider({children}){
    const [darkTheme,setDarkTheme] = useState(false)

    function toggleTheme(){

        setDarkTheme(prevTheme => !prevTheme)
    }

    return(
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )


}


//  toggle function 
// export default function toggleTheme(){
//     setTheme(prevTheme => !prevTheme)
// }