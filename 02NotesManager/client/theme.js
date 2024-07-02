import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  storageType: "localStorage",
}

const theme = extendTheme({ config })

export default theme
