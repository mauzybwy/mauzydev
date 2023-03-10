/*****************************************************************************
 * Import
 *****************************************************************************/
import { Box } from "@mui/material";

/*****************************************************************************
 * Public Components
 *****************************************************************************/

export const PageContainer = ({ children, style, className } : { children: any, style?: any, className?: string }) => {
  
  return (
    <Box
      className={className}
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
