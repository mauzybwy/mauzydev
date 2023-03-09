/*****************************************************************************
 * Import
 *****************************************************************************/
import { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useWindowDimensions } from "hooks/window";
import { useMobileCheck } from "hooks/mobile";
import { PageContainer } from "components/containers";
import colors from "style/colors";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Home () {
  const isMobile = useMobileCheck();
  const boxRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { width, height } = useWindowDimensions();
  
  const handleScroll = (e) => {
    const target = e.target as HTMLTextAreaElement;
    console.log('Current scroll position:', target.scrollTop);
    setScrollPosition(target.scrollTop);
  };

  /* 
   * 
   * let boxWidth = 400 + (scrollPosition > 340 ? 340 : scrollPosition);
   * let boxHeight = 170 + (
   *   scrollPosition > 680 ? (
   *     170 + (680 - 360)/2
   *   ) : scrollPosition > 360 ? (
   *     170 + (scrollPosition - 360) / 2
   *   ) : (
   *     scrollPosition / 2
   * )); */

  let boxWidth = (170 + scrollPosition) > width - 64 ? width - 64 : 170 + scrollPosition;
  let boxHeight = 170 + (
    scrollPosition > 680 ? (
      170 + (680 - 360)/2
    ) : scrollPosition > 360 ? (
      170 + (scrollPosition - 360) / 2
    ) : (
      scrollPosition / 2
  ));

  const handleClickName = () => {
    boxRef.current.scroll({ top: 0, behavior: "smooth" });
  }

  const handleClickAbout = () => {
    //aboutRef.current.scrollIntoView({ behavior: "smooth" });
    boxRef.current.scroll({ top: 340, behavior: "smooth" });
  }

  const handleClickPortfolio = () => {
    boxRef.current.scroll({ top: 1006, behavior: "smooth" });
  }
  
  return (
    <PageContainer
      //style={{ border: `10px solid ${colors.light}`, boxSizing: "border-box" }}
    >
      <Box display="flex" flexDirection="column">
        <Typography className="interact disable-select" onClick={handleClickName}>
          brandon wetzel
        </Typography>
        <Box
          //p="16px"
          width={boxWidth}
          height={boxHeight}
          style={{
            border: `2px solid ${colors.accent}`,
            //backgroundColor: colors.mid,
            backgroundClip: "content-box"
          }}
        >
          <Box
            ref={boxRef}
            onScroll={handleScroll}
            className="hide-scrollbar"
            style={{ width:"100%", height:"100%", overflow:"hidden", scrollSnapType: "y mandatory" }}
          >
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
              <Typography className="disable-select">hello there :)</Typography>
            </Box>
            <Box
              className="hide-scrollbar"
              ref={aboutRef}
              height="100%"
              width="100%"
              p="32px"
              boxSizing="border-box"
              style={{ overflow: "scroll" }}
            >
              <Typography>
                Hi, i'm BRANDON and i write software. I spent 5 years working on embedded systems at TEXAS INSTRUMENTS,
                and have since moved on to making WEB and MOBILE applications.
              </Typography>
            </Box>
            <Box
              className="hide-scrollbar"
              ref={portfolioRef}
              height="100%"
              width="100%"
              p="32px"
              boxSizing="border-box"
              style={{ overflow: "scroll" }}
            >
              <Typography>
                asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
                al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
                alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
                flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf

                asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
                al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
                alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
                flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf

                asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
                al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
                alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
                flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf

                asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
                al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
                alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
                flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf

                asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
                al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
                alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
                flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf

                asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
                al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
                alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
                flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf
              </Typography>
            </Box>
            <Box height="1000px" />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography className="interact disable-select" onClick={handleClickAbout}>
            about
          </Typography>
          <Typography className="interact disable-select" onClick={handleClickPortfolio}>
            portfolio
          </Typography>
        </Box>
      </Box>
    </PageContainer>
);
}
