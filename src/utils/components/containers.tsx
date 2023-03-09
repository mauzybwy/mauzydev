/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box } from "@mui/material";
import { useMobileCheck } from "hooks/mobile";

/*****************************************************************************
 * Public Components
 *****************************************************************************/

export const PageContainer = ({ children, style } : { children: any, style?: any }) => {
  const isMobile = useMobileCheck();
  
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        ...style,
      }}
    >
      { children }
    </Box>
  );
}
