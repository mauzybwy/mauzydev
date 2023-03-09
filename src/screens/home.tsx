/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useState } from "react";
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [state, setState] = useState<"init"|"about"|"portfolio"|"connect">("init");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 250)
  }, [state])

  const { width, height } = useWindowDimensions();
  
  const handleScroll = (e) => {
    const target = e.target as HTMLTextAreaElement;
    console.log('Current scroll position:', target.scrollTop);
  };

  const _boxWidth = {
    init: 250,
    about: 610,
    portfolio: 1200,
    connect: 610,
  }[state];
  const boxWidth = _boxWidth > width - 64 ? width - 64 : _boxWidth;

  const _boxHeight = {
    init: 170,
    about: 340,
    portfolio: 600,
    connect: 600,
  }[state];
  const boxHeight = _boxHeight > height - 64 ? height - 64 : _boxHeight;

  const body = {
    init: <Init />,
    about: <About />,
    portfolio: <Portfolio />,
    connect: <Connect />,
  }[state];

  const updateState = (tab) => {
    setState(tab)
    /* if (tab !== state) {
     *   setOpacity(0)
     *   setTimeout(() => {
     *     setState(tab)
     *   }, 200)
     * } */
  }
  
  return (
    <PageContainer
      //style={{ border: `10px solid ${colors.light}`, boxSizing: "border-box" }}
    >
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column" style={{ gap: "16px" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5" className="interact disable-select" onClick={() => updateState("init")}>
                brandon wetzel
              </Typography>
            </Box>
            <Box display="flex" style={{ gap: "16px" }}>
              {["about", "portfolio", "connect"].map(tab => (
                <Typography
                  key={tab}
                  className="interact disable-select"
                  onClick={() => updateState(tab)}
                  style={{ textDecoration: state === tab ? "underline" : undefined }}
                >
                  {tab}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            width={boxWidth}
            height={boxHeight}
            style={{
              border: `2px solid ${colors.accent}`,
              backgroundClip: "content-box",
              transition: "all 0.75s",
            }}
          >
            <Box
              p="16px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
              className="hide-scrollbar"
              style={{
                overflow: "scroll",
                opacity: opacity,
                transition: "all 0.25s",
                boxSizing: "border-box",
              }}
            >
              {body}
            </Box>
          </Box>
        </Box>
      </Box>
    </PageContainer>
);
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Init = () => {
  return (
    <Typography>
      hello there :)
    </Typography>
  );
}

const About = () => {
  return (
    <Typography style={{ alignSelf: "start" }}>
      Hi, i'm BRANDON and i write software. I have a BS in COMPUTER ENGINEERING from UNIVERSITY OF MARYLAND and
      spent 5 years working on embedded systems at TEXAS INSTRUMENTS.
      I have since moved on to making WEB and MOBILE applications.
    </Typography>
  );
}

const Portfolio = () => {
  return (
    <Typography style={{ alignSelf: "start", overflow: "scroll" }}>
      asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
      al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
      alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
      flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf
      <br />
      <br />
      asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
      al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
      alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
      flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf
      <br />
      <br />
      asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
      al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
      alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
      flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf
      <br />
      <br />
      asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
      al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
      alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
      flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf
      <br />
      <br />
      asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
      al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
      alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
      flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf
      <br />
      <br />
      asldfjla jdflkja lskdflkasjdflk alksdjf lkasdflj al kdfj lkajdf lkajdflk asjdf
      al skdfjlaksdfj lkasjdf lkajs dflkjasldkfjalskdfjalskdjflkasjd flkajs dlfkjaskdf
      alskdfj laksjd flkasj dflk jalksdfjlkajsdlkfjalksd jflkasjd
      flaks dflkajsd flkja sldkfj alksdfj lkasjd flkajsdf
    </Typography>
  );
}

const Connect = () => {
  return (
    <Typography style={{ alignSelf: "start" }}>
      hello there :)
    </Typography>
  );
}
