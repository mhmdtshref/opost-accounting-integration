// Context Imports
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

// Auth Imports

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'

const Providers = async props => {
  // Props
  const { children, direction } = props

  // Vars
  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()
  const systemMode = await getSystemMode()

  return (
    <ClerkProvider>
      <SignedIn>
        <VerticalNavProvider>
          <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
            <ThemeProvider direction={direction} systemMode={systemMode}>
              {children}
            </ThemeProvider>
          </SettingsProvider>
        </VerticalNavProvider>
      </SignedIn>
    </ClerkProvider>
  )
}

export default Providers
