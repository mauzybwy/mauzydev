/*****************************************************************************
 * Import
 *****************************************************************************/
import { Fragment, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useSmudgeBox } from "hooks/draw";
import { useWindowDimensions } from "hooks/window";
import { useMobileCheck } from "hooks/mobile";
import { PageContainer } from "components/containers";
import colors from "style/colors";

const TRANSLATE_START = 170;
const TRANSLATE_AMT = 2000;

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Home () {
  const isMobile = useMobileCheck();
  const [state, setState] = useState<"init"|"about"|"portfolio"|"connect">("init");
  const [translate, setTranslate] = useState(TRANSLATE_START);

  /* const canvasRef = useRef(null);
   * useSmudgeBox(canvasRef, 600, 400); */

  const { width, height } = useWindowDimensions();

  const _boxWidth = {
    init: 250,
    about: 610,
    portfolio: 1200,
    connect: 610,
  }[state];
  const boxWidth = (isMobile && state !== "init") || _boxWidth > width - 64 ? width - 64 : _boxWidth;

  const _boxHeight = {
    init: 170,
    about: 340,
    portfolio: 600,
    connect: 600,
  }[state];
  const boxHeight = (isMobile && state !== "init" ) || _boxHeight > height - 64 ? height - 200 : _boxHeight;

  const [body, setBody] = useState(<Box />);
  const _body = {
    init: <Init />,
    about: <About />,
    portfolio: <Portfolio />,
    connect: <Connect />,
  }[state];

  useEffect(() => {
    setTranslate(0);
  }, [])

  useEffect(() => {
    if (translate !== TRANSLATE_START) {
      setTranslate(TRANSLATE_AMT);
    }
    setTimeout(() => {
      setBody(_body)
    }, 250);
  }, [state])

  useEffect(() => {
    if (translate) {
      setTimeout(() => {
        setTranslate(0);
      }, 250)
    }
  }, [translate])

  const updateState = (tab) => {
    setState(tab)
    // !blw: other stuff here
  }
  
  return (
    <Fragment>
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
              {["portfolio", "about",  "connect"].map(tab => (
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
            id="container"
            width={boxWidth}
            height={boxHeight}
            style={{
              border: `2px solid ${colors.accent}`,
              backgroundColor: colors.dark,
              backgroundClip: "content-box",
              transition: "height 0.3s, width 0.6s",
              //transition: "all 1s",
              //transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1),",
              //transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
              //transition: "all 0.5 ease-in",
              overflow: "hidden",
            }}
          >
            <Container innerRef={null} style={{ transform: `translateY(${translate}px)`, transition: "transform 1s" }}>
              {body}
            </Container>
            {/* {blah.map(item => (
                <Element name={item.id} style={{ width: "100%", height: "100%" }}>
                <Container innerRef={item.ref}>
                {item.body}
                </Container>
                </Element>
                ))} */}
          </Box>
        </Box>
      </Box>
    </PageContainer>
    {/* <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: -1, opacity: 0.3 }}
        id="canvas"
        /> */}
    </Fragment>
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
  const tabs = [
    {
      id: "hi",
      body: "i'm BRANDON and i make software. i've worked through all bands of the computing spectrum, and am currently focused on WEB and MOBILE applications.",
    },
    {
      id: "tech",
      body: "iOS - android - React - embedded - Linux"
    },
    {
      id: "edu",
      body: "BS Computer Engineering - University of Maryland, 2015",
    },
    {
      id: "jobs",
      body: "Texas Instruments Inc., AT&T",
    }
  ]
  
  return (
    <Box display="flex" style={{ alignSelf: "start" }}>
      <Box display="flex" flexDirection="column" style={{ gap: "16px" }}>
        {tabs.map(tab => (
          <Typography style={{ alignSelf: "start", fontWeight: 400 }}>
            <span style={{ fontWeight: 800 }}>~ {tab.id} ~</span>
            <br />
            {tab.body}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      title: "murmur",
      body: "create and experience synchronized commentary for your favorite movies and shows",
    },
    {
      title: "alluder",
      body: "",
    },
    {
      title: "producto",
      body: "",
    },
    {
      title: "pitch",
      body: ""
    },
    {
      title: "scout",
      body: "",
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setSelectedProject("murmur")
    }, 750)
  }, [])
  
  return (
    <Box display="flex" width="100%" height="100%">
      <Typography style={{ alignSelf: "start" }}>
        {projects.map(item => (
          <Typography
            onClick={() => setSelectedProject(item.title)}
            className="interact"
            key={item.title}
            variant="h5"
            sx={{
              opacity: "1 !important",
              transition: "font-size 0.5s",
              fontsize: selectedProject === item.title ? "2rem" : "1.4rem",
              "&:hover": {
                fontSize: "2rem",
              }
            }}
          >
            {item.title}
          </Typography>
        ))}
        {selectedProject}
      </Typography>
    </Box>
  );
}

const Connect = () => {
  return (
    <Typography style={{ alignSelf: "start" }}>
      CONNECT
    </Typography>
  );
}

const Container = ({ children, innerRef, style } : { children, innerRef?, style? }) => {
  return (
    <Box
      ref={innerRef}
      p="16px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      className="hide-scrollbar"
      style={{
        overflow: "scroll",
        transition: "all 0.25s",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}
